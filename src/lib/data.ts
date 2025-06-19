// Sistema de dados compartilhado em memória
// Em produção, isso deveria ser um banco de dados como Supabase, MongoDB, etc.

export interface Cadastro {
  id: string;
  timestamp: string;
  status: 'pendente' | 'aprovado';
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  nivelServicos: Record<string, string>;
  transportes: string[];
  totalFotos: number;
}

let cadastrosData: Cadastro[] = [];

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

export function obterEstatisticas() {
  const total = cadastrosData.length;
  const pendentes = cadastrosData.filter(c => c.status === 'pendente').length;
  const aprovados = cadastrosData.filter(c => c.status === 'aprovado').length;
  
  return { total, pendentes, aprovados };
} 