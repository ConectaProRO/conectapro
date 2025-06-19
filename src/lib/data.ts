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
  fotoPerfil?: string; // Foto de perfil em base64
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

// Arrays globais para armazenar dados em memória
let cadastrosData: Cadastro[] = [];
let avaliacoesData: Avaliacao[] = [];

// Flag para controlar se já foi inicializado
let inicializado = false;

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
      cadastrosData = [...cadastros]; // Substituir ao invés de adicionar
      console.log(`✅ ${cadastros.length} cadastros carregados do backup`);
    } else {
      console.log('📁 Arquivo de cadastros não existe, iniciando vazio');
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
      avaliacoesData = [...avaliacoes]; // Substituir ao invés de adicionar
      console.log(`✅ ${avaliacoes.length} avaliações carregadas do backup`);
    } else {
      console.log('📁 Arquivo de avaliações não existe, iniciando vazio');
    }
  } catch (error) {
    console.error('❌ Erro ao carregar backup de avaliações:', error);
  }
}

// Função para garantir inicialização
function garantirInicializacao() {
  if (!inicializado) {
    carregarCadastros();
    carregarAvaliacoes();
    inicializado = true;
    console.log('🔧 Sistema de dados inicializado');
  }
}

// Função para exportar todos os dados
export function exportarDados() {
  garantirInicializacao();
  
  const dadosCompletos = {
    exportDate: new Date().toISOString(),
    cadastros: cadastrosData,
    avaliacoes: avaliacoesData,
    estatisticas: obterEstatisticas()
  };
  
  const exportFile = path.join(DATA_DIR, `backup_completo_${Date.now()}.json`);
  
  try {
    fs.writeFileSync(exportFile, JSON.stringify(dadosCompletos, null, 2));
    console.log('✅ Backup completo criado:', exportFile);
  } catch (error) {
    console.error('❌ Erro ao criar backup completo:', error);
  }
  
  return {
    arquivo: exportFile,
    dados: dadosCompletos
  };
}

export function adicionarCadastro(cadastro: Partial<Cadastro> & { 
  nome: string; 
  telefone: string; 
  profissao: string; 
  bairro: string; 
}): Cadastro {
  garantirInicializacao();
  
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
    // Salvar as imagens
    fotoPerfil: cadastro.fotoPerfil,
    fotos: cadastro.fotos || [],
    // Manter compatibilidade
    nivelServicos: cadastro.nivelServicos,
    meiosTransporte: cadastro.meiosTransporte
  };
  
  cadastrosData.push(novoCadastro);
  salvarCadastros(); // Backup automático
  
  console.log(`✅ Novo cadastro adicionado: ${novoCadastro.nome} (ID: ${novoCadastro.id})`);
  return novoCadastro;
}

export function obterCadastros(): Cadastro[] {
  garantirInicializacao();
  return cadastrosData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterProfissionaisAprovados(): Cadastro[] {
  garantirInicializacao();
  return cadastrosData.filter(c => c.status === 'aprovado');
}

export function obterProfissionalPorId(id: string): Cadastro | undefined {
  garantirInicializacao();
  return cadastrosData.find(c => c.id === id);
}

export function aprovarProfissional(id: string): boolean {
  garantirInicializacao();
  
  const profissional = cadastrosData.find(c => c.id === id);
  if (profissional) {
    profissional.status = 'aprovado';
    salvarCadastros(); // Backup automático
    console.log(`✅ Profissional aprovado: ${profissional.nome} (ID: ${id})`);
    return true;
  }
  console.log(`❌ Profissional não encontrado para aprovação: ID ${id}`);
  return false;
}

export function adicionarAvaliacao(avaliacao: Omit<Avaliacao, 'id' | 'timestamp' | 'status'>): Avaliacao {
  garantirInicializacao();
  
  const novaAvaliacao: Avaliacao = {
    ...avaliacao,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pendente'
  };
  
  avaliacoesData.push(novaAvaliacao);
  salvarAvaliacoes(); // Backup automático
  
  console.log(`✅ Nova avaliação adicionada para profissional ID: ${novaAvaliacao.profissionalId}`);
  return novaAvaliacao;
}

export function obterAvaliacoes(): Avaliacao[] {
  garantirInicializacao();
  return avaliacoesData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterAvaliacoesAprovadas(profissionalId?: string): Avaliacao[] {
  garantirInicializacao();
  
  let avaliacoes = avaliacoesData.filter(a => a.status === 'aprovada');
  if (profissionalId) {
    avaliacoes = avaliacoes.filter(a => a.profissionalId === profissionalId);
  }
  return avaliacoes;
}

export function aprovarAvaliacao(id: string): boolean {
  garantirInicializacao();
  
  const avaliacao = avaliacoesData.find(a => a.id === id);
  if (avaliacao) {
    avaliacao.status = 'aprovada';
    salvarAvaliacoes(); // Backup automático
    console.log(`✅ Avaliação aprovada: ID ${id}`);
    return true;
  }
  console.log(`❌ Avaliação não encontrada para aprovação: ID ${id}`);
  return false;
}

export function rejeitarAvaliacao(id: string, resposta?: string): boolean {
  garantirInicializacao();
  
  const avaliacao = avaliacoesData.find(a => a.id === id);
  if (avaliacao) {
    avaliacao.status = 'rejeitada';
    if (resposta) {
      avaliacao.resposta = resposta;
    }
    salvarAvaliacoes(); // Backup automático
    console.log(`✅ Avaliação rejeitada: ID ${id}`);
    return true;
  }
  console.log(`❌ Avaliação não encontrada para rejeição: ID ${id}`);
  return false;
}

export function calcularMediaAvaliacoes(profissionalId: string): { media: number, total: number } {
  garantirInicializacao();
  
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
  garantirInicializacao();
  
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