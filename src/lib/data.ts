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
  console.log('📁 Diretório de dados criado:', DATA_DIR);
}

export interface Cadastro {
  id: string;
  timestamp: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  visivelNoSite?: boolean; // Controla se aparece no site independente do status
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

// Cache em memória com timestamp para verificar se precisa recarregar
const cadastrosCache: { data: Cadastro[], lastModified: number } = { data: [], lastModified: 0 };
const avaliacoesCache: { data: Avaliacao[], lastModified: number } = { data: [], lastModified: 0 };

// Função para verificar se arquivo foi modificado
function arquivoModificado(arquivo: string, lastModified: number): boolean {
  try {
    if (!fs.existsSync(arquivo)) return false;
    const stats = fs.statSync(arquivo);
    return stats.mtimeMs > lastModified;
  } catch {
    return false;
  }
}

// Funções de backup com verificação de integridade
function salvarCadastros(forcarBackup = false) {
  try {
    // Backup adicional com timestamp
    if (forcarBackup || cadastrosCache.data.length > 0) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(DATA_DIR, `backup_cadastros_${timestamp}.json`);
      
      // Salvar arquivo principal
      fs.writeFileSync(CADASTROS_FILE, JSON.stringify(cadastrosCache.data, null, 2));
      
      // Salvar backup adicional se temos dados importantes
      if (cadastrosCache.data.length > 0) {
        fs.writeFileSync(backupFile, JSON.stringify(cadastrosCache.data, null, 2));
        console.log(`📦 Backup extra criado: ${backupFile}`);
        
        // Manter apenas os 5 backups mais recentes
        limparBackupsAntigos('backup_cadastros_');
      }
      
      console.log(`✅ ${cadastrosCache.data.length} cadastros salvos em:`, CADASTROS_FILE);
      
      // Atualizar timestamp do cache
      const stats = fs.statSync(CADASTROS_FILE);
      cadastrosCache.lastModified = stats.mtimeMs;
    }
  } catch (error) {
    console.error('❌ Erro ao salvar cadastros:', error);
  }
}

function salvarAvaliacoes(forcarBackup = false) {
  try {
    if (forcarBackup || avaliacoesCache.data.length > 0) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(DATA_DIR, `backup_avaliacoes_${timestamp}.json`);
      
      fs.writeFileSync(AVALIACOES_FILE, JSON.stringify(avaliacoesCache.data, null, 2));
      
      if (avaliacoesCache.data.length > 0) {
        fs.writeFileSync(backupFile, JSON.stringify(avaliacoesCache.data, null, 2));
        console.log(`📦 Backup de avaliações criado: ${backupFile}`);
        limparBackupsAntigos('backup_avaliacoes_');
      }
      
      console.log(`✅ ${avaliacoesCache.data.length} avaliações salvas em:`, AVALIACOES_FILE);
      
      const stats = fs.statSync(AVALIACOES_FILE);
      avaliacoesCache.lastModified = stats.mtimeMs;
    }
  } catch (error) {
    console.error('❌ Erro ao salvar avaliações:', error);
  }
}

// Função para limpar backups antigos
function limparBackupsAntigos(prefixo: string) {
  try {
    const arquivos = fs.readdirSync(DATA_DIR)
      .filter(arquivo => arquivo.startsWith(prefixo) && arquivo.endsWith('.json'))
      .map(arquivo => ({
        nome: arquivo,
        caminho: path.join(DATA_DIR, arquivo),
        modificado: fs.statSync(path.join(DATA_DIR, arquivo)).mtimeMs
      }))
      .sort((a, b) => b.modificado - a.modificado);
    
    // Manter apenas os 5 mais recentes
    const paraRemover = arquivos.slice(5);
    paraRemover.forEach(arquivo => {
      fs.unlinkSync(arquivo.caminho);
      console.log(`🗑️ Backup antigo removido: ${arquivo.nome}`);
    });
  } catch (error) {
    console.error('❌ Erro ao limpar backups antigos:', error);
  }
}

function carregarCadastros(forcarRecarregamento = false): Cadastro[] {
  try {
    // Verificar se precisa recarregar
    if (!forcarRecarregamento && 
        cadastrosCache.data.length > 0 && 
        !arquivoModificado(CADASTROS_FILE, cadastrosCache.lastModified)) {
      console.log(`📋 Usando cache de cadastros (${cadastrosCache.data.length} itens)`);
      return cadastrosCache.data;
    }
    
    if (fs.existsSync(CADASTROS_FILE)) {
      const data = fs.readFileSync(CADASTROS_FILE, 'utf-8');
      const cadastros = JSON.parse(data);
      
      // Validar se é um array válido
      if (Array.isArray(cadastros)) {
        cadastrosCache.data = cadastros;
        const stats = fs.statSync(CADASTROS_FILE);
        cadastrosCache.lastModified = stats.mtimeMs;
        console.log(`✅ ${cadastros.length} cadastros carregados do arquivo`);
        return cadastros;
      } else {
        console.warn('⚠️ Arquivo de cadastros contém dados inválidos, iniciando vazio');
        cadastrosCache.data = [];
        return [];
      }
    } else {
      console.log('📁 Arquivo de cadastros não existe, iniciando vazio');
      cadastrosCache.data = [];
      // Criar arquivo vazio
      fs.writeFileSync(CADASTROS_FILE, JSON.stringify([], null, 2));
      return [];
    }
  } catch (error) {
    console.error('❌ Erro ao carregar cadastros:', error);
    
    // Tentar carregar do backup mais recente
    try {
      const backups = fs.readdirSync(DATA_DIR)
        .filter(arquivo => arquivo.startsWith('backup_cadastros_') && arquivo.endsWith('.json'))
        .sort()
        .reverse();
      
      if (backups.length > 0) {
        const backupRecente = path.join(DATA_DIR, backups[0]);
        const data = fs.readFileSync(backupRecente, 'utf-8');
        const cadastros = JSON.parse(data);
        console.log(`🔄 Dados recuperados do backup: ${backups[0]} (${cadastros.length} itens)`);
        cadastrosCache.data = cadastros;
        return cadastros;
      }
    } catch (backupError) {
      console.error('❌ Erro ao carregar backup:', backupError);
    }
    
    cadastrosCache.data = [];
    return [];
  }
}

function carregarAvaliacoes(forcarRecarregamento = false): Avaliacao[] {
  try {
    if (!forcarRecarregamento && 
        avaliacoesCache.data.length > 0 && 
        !arquivoModificado(AVALIACOES_FILE, avaliacoesCache.lastModified)) {
      console.log(`📋 Usando cache de avaliações (${avaliacoesCache.data.length} itens)`);
      return avaliacoesCache.data;
    }
    
    if (fs.existsSync(AVALIACOES_FILE)) {
      const data = fs.readFileSync(AVALIACOES_FILE, 'utf-8');
      const avaliacoes = JSON.parse(data);
      
      if (Array.isArray(avaliacoes)) {
        avaliacoesCache.data = avaliacoes;
        const stats = fs.statSync(AVALIACOES_FILE);
        avaliacoesCache.lastModified = stats.mtimeMs;
        console.log(`✅ ${avaliacoes.length} avaliações carregadas do arquivo`);
        return avaliacoes;
      } else {
        console.warn('⚠️ Arquivo de avaliações contém dados inválidos');
        avaliacoesCache.data = [];
        return [];
      }
    } else {
      console.log('📁 Arquivo de avaliações não existe, iniciando vazio');
      avaliacoesCache.data = [];
      fs.writeFileSync(AVALIACOES_FILE, JSON.stringify([], null, 2));
      return [];
    }
  } catch (error) {
    console.error('❌ Erro ao carregar avaliações:', error);
    
    // Tentar carregar do backup
    try {
      const backups = fs.readdirSync(DATA_DIR)
        .filter(arquivo => arquivo.startsWith('backup_avaliacoes_') && arquivo.endsWith('.json'))
        .sort()
        .reverse();
      
      if (backups.length > 0) {
        const backupRecente = path.join(DATA_DIR, backups[0]);
        const data = fs.readFileSync(backupRecente, 'utf-8');
        const avaliacoes = JSON.parse(data);
        console.log(`🔄 Avaliações recuperadas do backup: ${backups[0]}`);
        avaliacoesCache.data = avaliacoes;
        return avaliacoes;
      }
    } catch (backupError) {
      console.error('❌ Erro ao carregar backup de avaliações:', backupError);
    }
    
    avaliacoesCache.data = [];
    return [];
  }
}

// Função para garantir inicialização
function garantirInicializacao() {
  carregarCadastros();
  carregarAvaliacoes();
  console.log('🔧 Sistema de dados inicializado');
}

// Função para exportar todos os dados
export function exportarDados() {
  garantirInicializacao();
  
  const dadosCompletos = {
    exportDate: new Date().toISOString(),
    cadastros: cadastrosCache.data,
    avaliacoes: avaliacoesCache.data,
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
  
  cadastrosCache.data.push(novoCadastro);
  salvarCadastros(); // Backup automático
  
  console.log(`✅ Novo cadastro adicionado: ${novoCadastro.nome} (ID: ${novoCadastro.id})`);
  return novoCadastro;
}

export function obterCadastros(): Cadastro[] {
  garantirInicializacao();
  return cadastrosCache.data.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterProfissionaisAprovados(): Cadastro[] {
  garantirInicializacao();
  return cadastrosCache.data.filter(c => 
    c.status === 'aprovado' && c.visivelNoSite !== false
  );
}

export function obterProfissionalPorId(id: string): Cadastro | undefined {
  garantirInicializacao();
  return cadastrosCache.data.find(c => c.id === id);
}

export function aprovarProfissional(id: string): boolean {
  garantirInicializacao();
  
  const profissional = cadastrosCache.data.find(c => c.id === id);
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
  
  avaliacoesCache.data.push(novaAvaliacao);
  salvarAvaliacoes(); // Backup automático
  
  console.log(`✅ Nova avaliação adicionada para profissional ID: ${novaAvaliacao.profissionalId}`);
  return novaAvaliacao;
}

export function obterAvaliacoes(): Avaliacao[] {
  garantirInicializacao();
  return avaliacoesCache.data.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function obterAvaliacoesAprovadas(profissionalId?: string): Avaliacao[] {
  garantirInicializacao();
  
  let avaliacoes = avaliacoesCache.data.filter(a => a.status === 'aprovada');
  if (profissionalId) {
    avaliacoes = avaliacoes.filter(a => a.profissionalId === profissionalId);
  }
  return avaliacoes;
}

export function aprovarAvaliacao(id: string): boolean {
  garantirInicializacao();
  
  const avaliacao = avaliacoesCache.data.find(a => a.id === id);
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
  
  const avaliacao = avaliacoesCache.data.find(a => a.id === id);
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

// Funções para gestão de profissionais
export function desaprovarProfissional(id: string): boolean {
  garantirInicializacao();
  
  const profissional = cadastrosCache.data.find(c => c.id === id);
  if (profissional) {
    profissional.status = 'rejeitado';
    salvarCadastros(true); // Forçar backup
    console.log(`⚠️ Profissional desaprovado: ${profissional.nome} (ID: ${id})`);
    return true;
  }
  console.log(`❌ Profissional não encontrado para desaprovação: ID ${id}`);
  return false;
}

export function excluirProfissional(id: string): boolean {
  garantirInicializacao();
  
  const index = cadastrosCache.data.findIndex(c => c.id === id);
  if (index !== -1) {
    const profissional = cadastrosCache.data[index];
    cadastrosCache.data.splice(index, 1);
    salvarCadastros(true); // Forçar backup
    console.log(`🗑️ Profissional excluído: ${profissional.nome} (ID: ${id})`);
    return true;
  }
  console.log(`❌ Profissional não encontrado para exclusão: ID ${id}`);
  return false;
}

export function excluirTodosProfissionais(): number {
  garantirInicializacao();
  
  const totalAntes = cadastrosCache.data.length;
  cadastrosCache.data = [];
  salvarCadastros(true); // Forçar backup
  console.log(`🗑️ Todos os ${totalAntes} profissionais foram excluídos`);
  return totalAntes;
}

export function tornarVisivel(id: string): boolean {
  garantirInicializacao();
  
  const profissional = cadastrosCache.data.find(c => c.id === id);
  if (profissional) {
    profissional.visivelNoSite = true;
    salvarCadastros(true); // Forçar backup
    console.log(`👁️ Profissional tornado visível: ${profissional.nome} (ID: ${id})`);
    return true;
  }
  console.log(`❌ Profissional não encontrado para tornar visível: ID ${id}`);
  return false;
}

export function tornarInvisivel(id: string): boolean {
  garantirInicializacao();
  
  const profissional = cadastrosCache.data.find(c => c.id === id);
  if (profissional) {
    profissional.visivelNoSite = false;
    salvarCadastros(true); // Forçar backup
    console.log(`🙈 Profissional tornado invisível: ${profissional.nome} (ID: ${id})`);
    return true;
  }
  console.log(`❌ Profissional não encontrado para tornar invisível: ID ${id}`);
  return false;
}

// Funções para gestão de avaliações
export function excluirAvaliacao(id: string): boolean {
  garantirInicializacao();
  
  const index = avaliacoesCache.data.findIndex(a => a.id === id);
  if (index !== -1) {
    avaliacoesCache.data.splice(index, 1);
    salvarAvaliacoes(true); // Forçar backup
    console.log(`🗑️ Avaliação excluída: ID ${id}`);
    return true;
  }
  console.log(`❌ Avaliação não encontrada para exclusão: ID ${id}`);
  return false;
}

// Função para forçar recarregamento dos dados
export function recarregarDados(): { cadastros: number, avaliacoes: number } {
  console.log('🔄 Forçando recarregamento de dados...');
  
  const cadastros = carregarCadastros(true);
  const avaliacoes = carregarAvaliacoes(true);
  
  console.log(`✅ Dados recarregados: ${cadastros.length} cadastros, ${avaliacoes.length} avaliações`);
  
  return {
    cadastros: cadastros.length,
    avaliacoes: avaliacoes.length
  };
}

export function obterEstatisticas() {
  garantirInicializacao();
  
  const total = cadastrosCache.data.length;
  const pendentes = cadastrosCache.data.filter(c => c.status === 'pendente').length;
  const aprovados = cadastrosCache.data.filter(c => c.status === 'aprovado').length;
  const rejeitados = cadastrosCache.data.filter(c => c.status === 'rejeitado').length;
  const visiveis = cadastrosCache.data.filter(c => c.visivelNoSite !== false).length;
  const ocultos = cadastrosCache.data.filter(c => c.visivelNoSite === false).length;
  
  const totalAvaliacoes = avaliacoesCache.data.length;
  const avaliacoesPendentes = avaliacoesCache.data.filter(a => a.status === 'pendente').length;
  const avaliacoesAprovadas = avaliacoesCache.data.filter(a => a.status === 'aprovada').length;
  const avaliacoesRejeitadas = avaliacoesCache.data.filter(a => a.status === 'rejeitada').length;
  
  return { 
    total, 
    pendentes, 
    aprovados,
    rejeitados,
    visiveis,
    ocultos,
    totalAvaliacoes,
    avaliacoesPendentes,
    avaliacoesAprovadas,
    avaliacoesRejeitadas
  };
} 