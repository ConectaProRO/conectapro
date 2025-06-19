// Sistema de dados compartilhado em memória
// Em produção, isso deveria ser um banco de dados como Supabase, MongoDB, etc.

export interface Cadastro {
  id: string;
  timestamp: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  nivelServicos: Record<string, string>;
  transportes: string[];
  totalFotos: number;
  fotos?: string[]; // URLs das fotos do portfólio
  descricao?: string; // Descrição do profissional
  experiencia?: string; // Anos de experiência
  preco?: string; // Faixa de preço
}

export interface Avaliacao {
  id: string;
  profissionalId: string;
  clienteNome: string;
  clienteTelefone: string;
  nota: number; // 1 a 5
  comentario: string;
  servico: string;
  timestamp: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  resposta?: string; // Resposta da empresa
}

const cadastrosData: Cadastro[] = [];
const avaliacoesData: Avaliacao[] = [];

export function adicionarCadastro(cadastro: Omit<Cadastro, 'id' | 'timestamp' | 'status'>): Cadastro {
  const novoCadastro: Cadastro = {
    ...cadastro,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pendente'
  };
  
  cadastrosData.push(novoCadastro);
  return novoCadastro;
}

export function obterCadastros(): Cadastro[] {
  // Ordenar por data mais recente primeiro
  return cadastrosData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterProfissionaisAprovados(): Cadastro[] {
  return cadastrosData.filter(c => c.status === 'aprovado');
}

export function obterProfissionalPorId(id: string): Cadastro | undefined {
  return cadastrosData.find(c => c.id === id);
}

export function aprovarProfissional(id: string): boolean {
  const profissional = cadastrosData.find(c => c.id === id);
  if (profissional) {
    profissional.status = 'aprovado';
    return true;
  }
  return false;
}

export function adicionarAvaliacao(avaliacao: Omit<Avaliacao, 'id' | 'timestamp' | 'status'>): Avaliacao {
  const novaAvaliacao: Avaliacao = {
    ...avaliacao,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pendente'
  };
  
  avaliacoesData.push(novaAvaliacao);
  return novaAvaliacao;
}

export function obterAvaliacoes(): Avaliacao[] {
  return avaliacoesData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterAvaliacoesAprovadas(profissionalId?: string): Avaliacao[] {
  let avaliacoes = avaliacoesData.filter(a => a.status === 'aprovada');
  if (profissionalId) {
    avaliacoes = avaliacoes.filter(a => a.profissionalId === profissionalId);
  }
  return avaliacoes;
}

export function aprovarAvaliacao(id: string): boolean {
  const avaliacao = avaliacoesData.find(a => a.id === id);
  if (avaliacao) {
    avaliacao.status = 'aprovada';
    return true;
  }
  return false;
}

export function rejeitarAvaliacao(id: string, resposta?: string): boolean {
  const avaliacao = avaliacoesData.find(a => a.id === id);
  if (avaliacao) {
    avaliacao.status = 'rejeitada';
    if (resposta) {
      avaliacao.resposta = resposta;
    }
    return true;
  }
  return false;
}

export function calcularMediaAvaliacoes(profissionalId: string): { media: number, total: number } {
  const avaliacoes = obterAvaliacoesAprovadas(profissionalId);
  if (avaliacoes.length === 0) {
    return { media: 0, total: 0 };
  }
  
  const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  return {
    media: soma / avaliacoes.length,
    total: avaliacoes.length
  };
}

export function obterEstatisticas() {
  const total = cadastrosData.length;
  const pendentes = cadastrosData.filter(c => c.status === 'pendente').length;
  const aprovados = cadastrosData.filter(c => c.status === 'aprovado').length;
  
  const totalAvaliacoes = avaliacoesData.length;
  const avaliacoesPendentes = avaliacoesData.filter(a => a.status === 'pendente').length;
  const avaliacoesAprovadas = avaliacoesData.filter(a => a.status === 'aprovada').length;
  
  return { 
    total, 
    pendentes, 
    aprovados,
    totalAvaliacoes,
    avaliacoesPendentes,
    avaliacoesAprovadas
  };
} 