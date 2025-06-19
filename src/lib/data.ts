import fs from 'fs';
import path from 'path';

// Sistema de dados compartilhado com backup automático
// Caminhos para arquivos de backup
const DATA_DIR = path.join(process.cwd(), 'data');
const CADASTROS_FILE = path.join(DATA_DIR, 'cadastros.json');
const AVALIACOES_FILE = path.join(DATA_DIR, 'avaliacoes.json');

// Garantir que o diretório existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Cadastro {
  id: string;
  timestamp: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  servicosSelecionados: string[]; // Novo sistema
  transportes: string[];
  totalFotos: number;
  fotos?: string[];
  descricao?: string;
  experiencia?: string;
  preco?: string;
  temFotoPerfil?: boolean;
  numeroFotosGaleria?: number;
  // Compatibilidade com dados antigos
  nivelServicos?: Record<string, string>;
  meiosTransporte?: string[];
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

// Funções de backup
function salvarCadastros() {
  try {
    fs.writeFileSync(CADASTROS_FILE, JSON.stringify(cadastrosData, null, 2));
    console.log('✅ Backup de cadastros salvo:', CADASTROS_FILE);
  } catch (error) {
    console.error('❌ Erro ao salvar backup de cadastros:', error);
  }
}

function salvarAvaliacoes() {
  try {
    fs.writeFileSync(AVALIACOES_FILE, JSON.stringify(avaliacoesData, null, 2));
    console.log('✅ Backup de avaliações salvo:', AVALIACOES_FILE);
  } catch (error) {
    console.error('❌ Erro ao salvar backup de avaliações:', error);
  }
}

function carregarCadastros() {
  try {
    if (fs.existsSync(CADASTROS_FILE)) {
      const data = fs.readFileSync(CADASTROS_FILE, 'utf-8');
      const cadastros = JSON.parse(data);
      cadastrosData.push(...cadastros);
      console.log(`✅ ${cadastros.length} cadastros carregados do backup`);
    }
  } catch (error) {
    console.error('❌ Erro ao carregar backup de cadastros:', error);
  }
}

function carregarAvaliacoes() {
  try {
    if (fs.existsSync(AVALIACOES_FILE)) {
      const data = fs.readFileSync(AVALIACOES_FILE, 'utf-8');
      const avaliacoes = JSON.parse(data);
      avaliacoesData.push(...avaliacoes);
      console.log(`✅ ${avaliacoes.length} avaliações carregadas do backup`);
    }
  } catch (error) {
    console.error('❌ Erro ao carregar backup de avaliações:', error);
  }
}

// Função para exportar todos os dados
export function exportarDados() {
  const dadosCompletos = {
    exportDate: new Date().toISOString(),
    cadastros: cadastrosData,
    avaliacoes: avaliacoesData,
    estatisticas: obterEstatisticas()
  };
  
  const exportFile = path.join(DATA_DIR, `backup_completo_${Date.now()}.json`);
  fs.writeFileSync(exportFile, JSON.stringify(dadosCompletos, null, 2));
  
  return {
    arquivo: exportFile,
    dados: dadosCompletos
  };
}

const cadastrosData: Cadastro[] = [];
const avaliacoesData: Avaliacao[] = [];

// Carregar dados na inicialização
carregarCadastros();
carregarAvaliacoes();

export function adicionarCadastro(cadastro: Partial<Cadastro> & { 
  nome: string; 
  telefone: string; 
  profissao: string; 
  bairro: string; 
}): Cadastro {
  // Compatibilidade com formato antigo e novo
  const novoCadastro: Cadastro = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pendente',
    nome: cadastro.nome,
    telefone: cadastro.telefone,
    profissao: cadastro.profissao,
    bairro: cadastro.bairro,
    servicosSelecionados: cadastro.servicosSelecionados || [],
    transportes: cadastro.meiosTransporte || cadastro.transportes || [],
    totalFotos: cadastro.numeroFotosGaleria || 0,
    experiencia: cadastro.experiencia,
    temFotoPerfil: cadastro.temFotoPerfil,
    numeroFotosGaleria: cadastro.numeroFotosGaleria,
    // Manter compatibilidade
    nivelServicos: cadastro.nivelServicos,
    meiosTransporte: cadastro.meiosTransporte
  };
  
  cadastrosData.push(novoCadastro);
  salvarCadastros(); // Backup automático
  return novoCadastro;
}

export function obterCadastros(): Cadastro[] {
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
    salvarCadastros(); // Backup automático
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
  salvarAvaliacoes(); // Backup automático
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
    salvarAvaliacoes(); // Backup automático
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
    salvarAvaliacoes(); // Backup automático
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