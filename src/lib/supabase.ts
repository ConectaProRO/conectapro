import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
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

// Funções para gerenciar profissionais
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