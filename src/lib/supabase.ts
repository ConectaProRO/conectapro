import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados (baseado no schema original)
export interface ProfissionalPendente {
  id: string
  nome: string
  telefone: string
  email?: string
  servicos: string[]
  experiencia: string
  portfolio_urls?: string[]
  endereco: {
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
  status: 'pendente' | 'aprovado' | 'rejeitado'
  origem: 'site' | 'whatsapp'
  dados_whatsapp?: {
    conversa_id: string
    mensagens: any[]
    audio_transcritos?: string[]
  }
  created_at: string
  updated_at: string
  aprovado_por?: string
  aprovado_em?: string
  observacoes?: string
}

export interface ProfissionalAprovado {
  id: string
  nome: string
  telefone: string
  email?: string
  servicos: string[]
  experiencia: string
  portfolio_urls?: string[]
  endereco: {
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
  avaliacao_media: number
  total_avaliacoes: number
  ativo: boolean
  visivel: boolean
  created_at: string
  updated_at: string
}

export interface Avaliacao {
  id: string
  profissional_id: string
  cliente_nome: string
  cliente_telefone: string
  nota: number
  comentario?: string
  servico_realizado: string
  data_servico: string
  status: 'pendente' | 'aprovada' | 'rejeitada'
  created_at: string
}

// Funções para gerenciar profissionais (baseado no sistema original)
export async function salvarProfissionalPendente(dados: Omit<ProfissionalPendente, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('profissionais_pendentes')
      .insert([{
        ...dados,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao salvar profissional:', error)
    return { success: false, error }
  }
}

export async function aprovarProfissional(id: string, aprovadoPor: string) {
  try {
    // 1. Buscar dados do profissional pendente
    const { data: pendente, error: errorBusca } = await supabase
      .from('profissionais_pendentes')
      .select('*')
      .eq('id', id)
      .single()
    
    if (errorBusca) throw errorBusca

    // 2. Inserir na tabela de aprovados
    const { data: aprovado, error: errorAprovacao } = await supabase
      .from('profissionais_aprovados')
      .insert([{
        nome: pendente.nome,
        telefone: pendente.telefone,
        email: pendente.email,
        servicos: pendente.servicos,
        experiencia: pendente.experiencia,
        portfolio_urls: pendente.portfolio_urls,
        endereco: pendente.endereco,
        avaliacao_media: 5.0,
        total_avaliacoes: 0,
        ativo: true,
        visivel: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (errorAprovacao) throw errorAprovacao

    // 3. Atualizar status do pendente
    const { error: errorUpdate } = await supabase
      .from('profissionais_pendentes')
      .update({
        status: 'aprovado',
        aprovado_por: aprovadoPor,
        aprovado_em: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (errorUpdate) throw errorUpdate

    return { success: true, data: aprovado }
  } catch (error) {
    console.error('Erro ao aprovar profissional:', error)
    return { success: false, error }
  }
}

export async function listarProfissionaisPendentes() {
  try {
    const { data, error } = await supabase
      .from('profissionais_pendentes')
      .select('*')
      .eq('status', 'pendente')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao listar pendentes:', error)
    return { success: false, error }
  }
}

export async function listarProfissionaisAprovados() {
  try {
    const { data, error } = await supabase
      .from('profissionais_aprovados')
      .select('*')
      .eq('ativo', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao listar aprovados:', error)
    return { success: false, error }
  }
}

export async function obterEstatisticasAdmin() {
  try {
    const { data, error } = await supabase
      .from('admin_stats')
      .select('*')
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error)
    return { success: false, error }
  }
}

// Funções para WhatsApp
export const whatsappService = {
  // Enviar mensagem de aprovação
  async enviarAprovacao(profissional: ProfissionalPendente) {
    const telefone = profissional.telefone.replace(/\D/g, '')
    const mensagem = `🎉 *PARABÉNS ${profissional.nome.toUpperCase()}!*

Seu cadastro foi *APROVADO* na ConectaPro! 

✅ Agora você está visível para clientes
✅ Seu perfil está ativo na plataforma
✅ Você pode começar a receber contatos

🔗 *Acesse a plataforma:*
https://conectapro-3cxg03nfk-conecta-pro.vercel.app

💡 *DICAS IMPORTANTES:*
• Responda rapidamente aos clientes
• Seja educado e profissional
• Cumpra os prazos combinados
• Peça avaliações após o serviço

📱 *Precisa de ajuda?*
Mande um áudio explicando sua dúvida!

*ConectaPro - Conectando Profissionais em Porto Velho* 🏗️`

    return await this.enviarMensagem(telefone, mensagem, 'aprovacao', profissional.id)
  },

  // Enviar mensagem de rejeição
  async enviarRejeicao(profissional: ProfissionalPendente, motivo?: string) {
    const telefone = profissional.telefone.replace(/\D/g, '')
    const mensagem = `❌ *${profissional.nome.toUpperCase()}, seu cadastro precisa de ajustes*

Infelizmente seu cadastro na ConectaPro não foi aprovado.

${motivo ? `📝 *Motivo:* ${motivo}` : '📝 *Motivos comuns:*\n• Informações incompletas\n• Dados incorretos\n• Serviços não especificados'}

🔄 *O QUE FAZER AGORA:*
• Corrija as informações
• Complete todos os campos
• Cadastre-se novamente

📱 *Precisa de ajuda?*
Mande um áudio e te ajudamos!

*ConectaPro - Estamos aqui para te ajudar* 🤝`

    return await this.enviarMensagem(telefone, mensagem, 'rejeicao', profissional.id)
  },

  // Enviar lembrete
  async enviarLembrete(profissional: ProfissionalPendente) {
    const telefone = profissional.telefone.replace(/\D/g, '')
    const mensagem = `👋 *Oi ${profissional.nome}!*

Seu cadastro na ConectaPro está *PENDENTE* há alguns dias.

⏰ *Status: Aguardando aprovação*

🚀 *Em breve você estará visível para clientes!*
https://conectapro-3cxg03nfk-conecta-pro.vercel.app

📱 *Dúvidas?* Mande um áudio!

*ConectaPro - Sua oportunidade te espera* 💪`

    return await this.enviarMensagem(telefone, mensagem, 'lembrete', profissional.id)
  },

  // Função base para enviar mensagem
  async enviarMensagem(telefone: string, mensagem: string, tipo: string, profissional_id: string) {
    try {
      // Aqui você integraria com a API do WhatsApp (Evolution API, Baileys, etc.)
      // Por enquanto, vamos simular o envio
      
      // Simular envio (substituir pela integração real)
      console.log(`📱 WhatsApp enviado para ${telefone}:`, mensagem)
      
      // Simular resposta de sucesso
      return {
        sucesso: true,
        mensagem_id: `msg_${Date.now()}`,
        telefone,
        mensagem_enviada: mensagem
      }
    } catch (error) {
      console.error('Erro ao enviar WhatsApp:', error)
      return {
        sucesso: false,
        erro: error
      }
    }
  }
}

// Funções para Avaliações
export async function listarAvaliacoesPendentes() {
  try {
    const { data, error } = await supabase
      .from('avaliacoes')
      .select(`
        *,
        profissionais_aprovados (nome, telefone)
      `)
      .eq('status', 'pendente')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao listar avaliações:', error)
    return { success: false, error }
  }
} 