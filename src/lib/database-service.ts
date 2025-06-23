import { ConversationState, UserSession, RegistrationData } from '@/types/whatsapp';
import { createClient } from '@supabase/supabase-js';

export class DatabaseService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yugcnpbadwmnqmixlsdc.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getSession(phoneNumber: string): Promise<ConversationState | null> {
    try {
      const { data, error } = await this.supabase
        .from('whatsapp_conversations')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('❌ Error fetching conversation:', error);
        return null;
      }

      if (data && data.length > 0) {
        const session = data[0];
        return {
          phoneNumber: session.phone_number,
          currentStep: session.current_step,
          userData: session.user_data || {},
          startedAt: new Date(session.created_at),
          lastActivity: new Date(session.updated_at),
          isComplete: session.is_complete || false
        };
      }

      return null;

    } catch (error) {
      console.error('❌ Database error in getSession:', error);
      return null;
    }
  }

  async saveSession(conversation: ConversationState): Promise<void> {
    try {
      const sessionData = {
        phone_number: conversation.phoneNumber,
        current_step: conversation.currentStep,
        user_data: conversation.userData,
        is_complete: conversation.isComplete,
        is_active: !conversation.isComplete,
        updated_at: new Date().toISOString()
      };

      // Try to update existing conversation first
      const { data: existingData, error: fetchError } = await this.supabase
        .from('whatsapp_conversations')
        .select('id')
        .eq('phone_number', conversation.phoneNumber)
        .eq('is_active', true)
        .limit(1);

      if (fetchError) {
        console.error('❌ Error checking existing conversation:', fetchError);
      }

      if (existingData && existingData.length > 0) {
        // Update existing conversation
        const { error: updateError } = await this.supabase
          .from('whatsapp_conversations')
          .update(sessionData)
          .eq('id', existingData[0].id);

        if (updateError) {
          console.error('❌ Error updating conversation:', updateError);
          throw updateError;
        }
      } else {
        // Insert new conversation
        const { error: insertError } = await this.supabase
          .from('whatsapp_conversations')
          .insert([{
            ...sessionData,
            created_at: conversation.startedAt.toISOString()
          }]);

        if (insertError) {
          console.error('❌ Error inserting conversation:', insertError);
          throw insertError;
        }
      }

      console.log('✅ Conversation saved successfully for:', conversation.phoneNumber);

    } catch (error) {
      console.error('❌ Database error in saveSession:', error);
      throw error;
    }
  }

  async saveRegistration(data: RegistrationData): Promise<void> {
    try {
      const registrationPayload = {
        nome: data.nome,
        whatsapp_phone: data.whatsapp,
        profissao: data.profissao,
        bairro: data.bairro,
        anos_experiencia: data.anos_experiencia,
        foto_perfil: data.foto_perfil,
        servicos: data.servicos,
        locomocao: data.locomocao,
        fotos_portfolio: data.galeria_fotos,
        origem: 'whatsapp-bot'
      };

      const { error } = await this.supabase
        .from('profissionais_pendentes')
        .insert([registrationPayload]);

      if (error) {
        console.error('❌ Error saving registration:', error);
        throw error;
      }

      console.log('✅ Registration saved successfully for:', data.nome);

    } catch (error) {
       console.error('❌ Database error in saveRegistration:', error);
       throw error;
    }
  }

  async saveJobListing(job: { title: string; price?: string; location?: string; url: string; }): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('olx_jobs')
        // Use 'upsert' with 'onConflict' to avoid duplicates based on the URL
        .upsert(
          {
            title: job.title,
            price: job.price,
            location: job.location,
            url: job.url,
          },
          {
            onConflict: 'url',
            ignoreDuplicates: true
          }
        );

      if (error) {
        // Don't throw an error on duplicate conflicts, as it's expected
        if (error.code === '23505') { // Postgres unique violation
          console.log(`📎 Job listing already exists: ${job.url}`);
        } else {
          console.error('❌ Error saving job listing:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('❌ Database error in saveJobListing:', error);
      throw error;
    }
  }

  async getJobListings(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('olx_jobs')
        .select('*')
        .order('scraped_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('❌ Error fetching job listings:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('❌ Database error in getJobListings:', error);
      throw error;
    }
  }

  async getActiveConversations(): Promise<ConversationState[]> {
    try {
      const { data, error } = await this.supabase
        .from('whatsapp_conversations')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data.map(session => ({
        phoneNumber: session.phone_number,
        currentStep: session.current_step,
        userData: session.user_data || {},
        startedAt: new Date(session.created_at),
        lastActivity: new Date(session.updated_at),
        isComplete: session.is_complete || false
      }));

    } catch (error) {
      console.error('❌ Error fetching active conversations:', error);
      return [];
    }
  }

  async completeConversation(phoneNumber: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('whatsapp_conversations')
        .update({
          is_complete: true,
          is_active: false,
          completed_at: new Date().toISOString()
        })
        .eq('phone_number', phoneNumber)
        .eq('is_active', true);

      if (error) {
        throw error;
      }

      console.log('✅ Conversation completed for:', phoneNumber);

    } catch (error) {
      console.error('❌ Error completing conversation:', error);
      throw error;
    }
  }

  async deleteConversation(phoneNumber: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('whatsapp_conversations')
        .delete()
        .eq('phone_number', phoneNumber);

      if (error) {
        throw error;
      }

      console.log('✅ Conversation deleted for:', phoneNumber);

    } catch (error) {
      console.error('❌ Error deleting conversation:', error);
      throw error;
    }
  }

  async getConversationStats(): Promise<{
    total: number;
    active: number;
    completed: number;
    today: number;
  }> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [totalResult, activeResult, completedResult, todayResult] = await Promise.all([
        this.supabase
          .from('whatsapp_conversations')
          .select('id', { count: 'exact', head: true }),
        
        this.supabase
          .from('whatsapp_conversations')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true),
        
        this.supabase
          .from('whatsapp_conversations')
          .select('id', { count: 'exact', head: true })
          .eq('is_complete', true),
        
        this.supabase
          .from('whatsapp_conversations')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', today.toISOString())
      ]);

      return {
        total: totalResult.count || 0,
        active: activeResult.count || 0,
        completed: completedResult.count || 0,
        today: todayResult.count || 0
      };

    } catch (error) {
      console.error('❌ Error fetching conversation stats:', error);
      return { total: 0, active: 0, completed: 0, today: 0 };
    }
  }

  // Method to clean up old conversations (run periodically)
  async cleanupOldConversations(daysOld: number = 30): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { error } = await this.supabase
        .from('whatsapp_conversations')
        .delete()
        .lt('updated_at', cutoffDate.toISOString())
        .eq('is_complete', true);

      if (error) {
        throw error;
      }

      console.log(`✅ Cleaned up conversations older than ${daysOld} days`);

    } catch (error) {
      console.error('❌ Error cleaning up old conversations:', error);
    }
  }
} 