import { RegistrationData, ConnectaProRegistration } from '@/types/whatsapp';
import { createClient } from '@supabase/supabase-js';

export class ConnectaProService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yugcnpbadwmnqmixlsdc.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async submitRegistration(userData: RegistrationData): Promise<void> {
    try {
      console.log('📤 Submitting registration to ConnectaPro:', userData);

      // Prepare registration data for ConnectaPro format
      const registration: ConnectaProRegistration = {
        nome: userData.nome || '',
        telefone: userData.telefone || '',
        email: userData.email || `${userData.telefone}@whatsapp.conectapro.com`,
        experiencia: userData.experiencia || '',
        servicos: userData.servicos || [],
        descricao: this.generateDescription(userData),
        cidade: userData.cidade || 'Porto Velho',
        origem: 'whatsapp-audio',
        fotoPerfil: userData.fotoPerfil,
        fotosPortfolio: userData.fotosPortfolio || []
      };

      // Submit to profissionais_pendentes table
      const { data, error } = await this.supabase
        .from('profissionais_pendentes')
        .insert([
          {
            nome: registration.nome,
            telefone: registration.telefone,
            email: registration.email,
            experiencia: registration.experiencia,
            servicos: registration.servicos,
            descricao: registration.descricao,
            cidade: registration.cidade,
            estado: 'RO',
            origem: registration.origem,
            foto_perfil: registration.fotoPerfil,
            fotos_portfolio: registration.fotosPortfolio,
            data_cadastro: new Date().toISOString(),
            status: 'pendente'
          }
        ]);

      if (error) {
        console.error('❌ Supabase error:', error);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      }

      console.log('✅ Registration submitted successfully:', data);

      // Optional: Send notification to admin
      await this.notifyAdmin(registration);

    } catch (error) {
      console.error('❌ Failed to submit registration:', error);
      throw error;
    }
  }

  private generateDescription(userData: RegistrationData): string {
    const parts = [];
    
    if (userData.tipoTrabalho) {
      parts.push(`Profissional ${userData.tipoTrabalho}`);
    }
    
    if (userData.experiencia) {
      parts.push(`com ${userData.experiencia} de experiência`);
    }
    
    if (userData.cidade) {
      parts.push(`em ${userData.cidade}`);
    }

    parts.push('Cadastrado via WhatsApp com assistente de voz');
    
    const portfolioCount = userData.fotosPortfolio?.length || 0;
    if (portfolioCount > 0) {
      parts.push(`${portfolioCount} fotos de trabalhos realizados`);
    }

    return parts.join('. ') + '.';
  }

  private async notifyAdmin(registration: ConnectaProRegistration): Promise<void> {
    try {
      // Send notification to admin about new registration
      // This could be email, WhatsApp, or internal notification system
      
      console.log('📧 Admin notification sent for new registration:', registration.nome);
      
      // TODO: Implement actual admin notification
      // - Email notification
      // - WhatsApp notification to admin
      // - Push notification to admin dashboard
      
    } catch (error) {
      console.error('❌ Failed to notify admin:', error);
      // Don't throw error here as registration was successful
    }
  }

  async getRegistrationStatus(phoneNumber: string): Promise<string> {
    try {
      const { data, error } = await this.supabase
        .from('profissionais_pendentes')
        .select('status, data_cadastro')
        .eq('telefone', phoneNumber)
        .order('data_cadastro', { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        return data[0].status || 'pendente';
      }

      return 'not_found';

    } catch (error) {
      console.error('❌ Failed to get registration status:', error);
      return 'error';
    }
  }

  async updateRegistrationStatus(phoneNumber: string, status: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('profissionais_pendentes')
        .update({ status })
        .eq('telefone', phoneNumber);

      if (error) {
        throw error;
      }

      console.log(`✅ Registration status updated to ${status} for ${phoneNumber}`);

    } catch (error) {
      console.error('❌ Failed to update registration status:', error);
      throw error;
    }
  }

  // Method to migrate approved professional to main table
  async approveProfessional(phoneNumber: string): Promise<void> {
    try {
      // Get pending registration
      const { data: pendingData, error: fetchError } = await this.supabase
        .from('profissionais_pendentes')
        .select('*')
        .eq('telefone', phoneNumber)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Insert into approved professionals table
      const { error: insertError } = await this.supabase
        .from('profissionais_aprovados')
        .insert([
          {
            nome: pendingData.nome,
            telefone: pendingData.telefone,
            email: pendingData.email,
            experiencia: pendingData.experiencia,
            servicos: pendingData.servicos,
            descricao: pendingData.descricao,
            cidade: pendingData.cidade,
            estado: pendingData.estado,
            foto_perfil: pendingData.foto_perfil,
            fotos_portfolio: pendingData.fotos_portfolio,
            ativo: true,
            visivel: true,
            avaliacao_media: 5.0,
            data_aprovacao: new Date().toISOString()
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      // Update status in pending table
      await this.updateRegistrationStatus(phoneNumber, 'aprovado');

      console.log(`✅ Professional approved: ${phoneNumber}`);

    } catch (error) {
      console.error('❌ Failed to approve professional:', error);
      throw error;
    }
  }
} 