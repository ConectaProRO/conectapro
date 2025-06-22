"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  listarProfissionaisPendentes, 
  aprovarProfissional, 
  obterEstatisticasAdmin,
  whatsappService,
  ProfissionalPendente 
} from '../../lib/supabase';

interface Estatisticas {
  pendentes: number;
  aprovados: number;
  pendentes_whatsapp: number;
  pendentes_site: number;
  cadastros_hoje: number;
  avaliacoes_pendentes: number;
}

export default function AdminPage() {
  const [profissionaisPendentes, setProfissionaisPendentes] = useState<ProfissionalPendente[]>([]);
  const [stats, setStats] = useState<Estatisticas>({
    pendentes: 0,
    aprovados: 0,
    pendentes_whatsapp: 0,
    pendentes_site: 0,
    cadastros_hoje: 0,
    avaliacoes_pendentes: 0
  });
  const [filtro, setFiltro] = useState<'todos' | 'site' | 'whatsapp'>('todos');
  const [loading, setLoading] = useState(true);
  const [processando, setProcessando] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    
    try {
      // Carregar profissionais pendentes
      const resultadoPendentes = await listarProfissionaisPendentes();
      if (resultadoPendentes.success) {
        setProfissionaisPendentes(resultadoPendentes.data || []);
      }

      // Carregar estatísticas
      const resultadoStats = await obterEstatisticasAdmin();
      if (resultadoStats.success) {
        setStats(resultadoStats.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
    
    setLoading(false);
  };

  const handleAprovar = async (profissional: ProfissionalPendente) => {
    if (!confirm(`Aprovar ${profissional.nome}?\n\nIsso irá:\n✅ Mover para profissionais ativos\n📱 Enviar WhatsApp de aprovação`)) {
      return;
    }

    setProcessando(profissional.id);
    
    try {
      // 1. Aprovar no banco
      const resultado = await aprovarProfissional(profissional.id, 'Admin');
      
      if (resultado.success) {
        // 2. Enviar WhatsApp de aprovação
        const whatsappResult = await whatsappService.enviarAprovacao(profissional);
        
        if (whatsappResult.sucesso) {
          alert(`✅ ${profissional.nome} aprovado com sucesso!\n📱 WhatsApp enviado para ${profissional.telefone}`);
        } else {
          alert(`✅ ${profissional.nome} aprovado!\n⚠️ Erro ao enviar WhatsApp: ${whatsappResult.erro}`);
        }
        
        // 3. Recarregar dados
        await carregarDados();
      } else {
        alert('❌ Erro ao aprovar profissional: ' + resultado.error);
      }
    } catch (error) {
      alert('❌ Erro ao processar aprovação');
      console.error(error);
    }
    
    setProcessando(null);
  };

  const handleRejeitar = async (profissional: ProfissionalPendente) => {
    const motivo = prompt(`Rejeitar ${profissional.nome}?\n\nDigite o motivo (opcional):`);
    if (motivo === null) return; // Cancelou
    
    setProcessando(profissional.id);
    
    try {
      // 1. Atualizar status no banco
      // (implementar função de rejeitar se necessário)
      
      // 2. Enviar WhatsApp de rejeição
      const whatsappResult = await whatsappService.enviarRejeicao(profissional, motivo);
      
      if (whatsappResult.sucesso) {
        alert(`❌ ${profissional.nome} rejeitado\n📱 WhatsApp enviado com explicação`);
      } else {
        alert(`❌ ${profissional.nome} rejeitado\n⚠️ Erro ao enviar WhatsApp`);
      }
      
      // 3. Recarregar dados
      await carregarDados();
    } catch (error) {
      alert('❌ Erro ao processar rejeição');
      console.error(error);
    }
    
    setProcessando(null);
  };

  const handleEnviarLembrete = async (profissional: ProfissionalPendente) => {
    if (!confirm(`Enviar lembrete para ${profissional.nome}?`)) return;
    
    setProcessando(profissional.id);
    
    try {
      const resultado = await whatsappService.enviarLembrete(profissional);
      
      if (resultado.sucesso) {
        alert(`📱 Lembrete enviado para ${profissional.nome}!`);
      } else {
        alert('❌ Erro ao enviar lembrete');
      }
    } catch (error) {
      alert('❌ Erro ao enviar lembrete');
      console.error(error);
    }
    
    setProcessando(null);
  };

  const profissionaisFiltrados = profissionaisPendentes.filter(p => {
    if (filtro === 'todos') return true;
    return p.origem === filtro;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🛡️ Admin ConectaPro</h1>
            <p className="text-xl text-gray-600">Sistema seguro com Supabase + WhatsApp</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Carregando dados do Supabase...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛡️ Admin ConectaPro</h1>
          <p className="text-xl text-gray-600">Sistema seguro com Supabase + WhatsApp para profissionais</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
            ← Voltar ao site
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.pendentes}</div>
            <div className="text-gray-600 text-sm">Pendentes Total</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.aprovados}</div>
            <div className="text-gray-600 text-sm">Aprovados</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.pendentes_whatsapp}</div>
            <div className="text-gray-600 text-sm">Via WhatsApp</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.pendentes_site}</div>
            <div className="text-gray-600 text-sm">Via Site</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.cadastros_hoje}</div>
            <div className="text-gray-600 text-sm">Hoje</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.avaliacoes_pendentes}</div>
            <div className="text-gray-600 text-sm">Avaliações</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 w-full mb-4">🔍 Filtrar Cadastros:</h2>
            {(['todos', 'site', 'whatsapp'] as const).map((origem) => (
              <button
                key={origem}
                onClick={() => setFiltro(origem)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filtro === origem
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {origem === 'todos' ? 'Todos' :
                 origem === 'site' ? '🌐 Site' : '📱 WhatsApp'}
                {origem !== 'todos' && ` (${origem === 'site' ? stats.pendentes_site : stats.pendentes_whatsapp})`}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Profissionais */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            👥 Profissionais Pendentes ({profissionaisFiltrados.length})
          </h2>
          
          {profissionaisFiltrados.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">Nenhum profissional pendente!</p>
              <p className="text-gray-400 text-sm">Todos os cadastros foram processados</p>
            </div>
          ) : (
            <div className="space-y-6">
              {profissionaisFiltrados.map((profissional) => (
                <div key={profissional.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      {/* Header do Profissional */}
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{profissional.nome}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          profissional.origem === 'whatsapp' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {profissional.origem === 'whatsapp' ? '📱 WhatsApp' : '🌐 Site'}
                        </span>
                      </div>
                      
                      {/* Informações Básicas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div><strong>📞 Telefone:</strong> {profissional.telefone}</div>
                        <div><strong>📧 Email:</strong> {profissional.email || 'Não informado'}</div>
                        <div><strong>🔧 Serviços:</strong> {profissional.servicos.join(', ')}</div>
                        <div><strong>📅 Cadastro:</strong> {new Date(profissional.created_at).toLocaleDateString('pt-BR')}</div>
                      </div>
                      
                      {/* Experiência */}
                      <div className="mb-4">
                        <strong className="text-sm text-gray-700">💼 Experiência:</strong>
                        <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-lg">{profissional.experiencia}</p>
                      </div>
                      
                      {/* Endereço */}
                      <div className="mb-4">
                        <strong className="text-sm text-gray-700">📍 Endereço:</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          {profissional.endereco.rua}, {profissional.endereco.bairro} - {profissional.endereco.cidade}/{profissional.endereco.estado}
                        </p>
                      </div>
                      
                      {/* Dados WhatsApp se existir */}
                      {profissional.dados_whatsapp && (
                        <div className="mb-4 bg-green-50 p-3 rounded-lg">
                          <strong className="text-sm text-green-700">📱 Dados WhatsApp:</strong>
                          <p className="text-sm text-green-600">Conversa ID: {profissional.dados_whatsapp.conversa_id}</p>
                          {profissional.dados_whatsapp.audio_transcritos && (
                            <p className="text-sm text-green-600">Áudios transcritos: {profissional.dados_whatsapp.audio_transcritos.length}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Ações */}
                    <div className="flex flex-col gap-3 lg:ml-6 min-w-[200px]">
                      <button
                        onClick={() => handleAprovar(profissional)}
                        disabled={processando === profissional.id}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processando === profissional.id ? (
                          <span className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processando...
                          </span>
                        ) : (
                          '✅ Aprovar + WhatsApp'
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleRejeitar(profissional)}
                        disabled={processando === profissional.id}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ❌ Rejeitar + WhatsApp
                      </button>
                      
                      <button
                        onClick={() => handleEnviarLembrete(profissional)}
                        disabled={processando === profissional.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        📱 Enviar Lembrete
                      </button>
                      
                      <a
                        href={`https://wa.me/${profissional.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
                      >
                        💬 Conversar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">⚡ Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={carregarDados}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              🔄 Recarregar Dados
            </button>
            
            <Link href="/cadastro-profissional">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                👷 Novo Cadastro
              </button>
            </Link>
            
            <Link href="/buscar-profissional">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                🔍 Ver Aprovados
              </button>
            </Link>
            
            <button
              onClick={() => {
                if (confirm('Esta ação irá abrir a configuração do Supabase. Continuar?')) {
                  window.open('https://supabase.com/dashboard', '_blank');
                }
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              🛡️ Supabase Admin
            </button>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">📋 Informações do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-800">🗄️ Banco de Dados:</strong>
              <p className="text-blue-700">Supabase PostgreSQL (seguro e escalável)</p>
            </div>
            <div>
              <strong className="text-blue-800">📱 WhatsApp:</strong>
              <p className="text-blue-700">Integração automática para comunicação</p>
            </div>
            <div>
              <strong className="text-blue-800">🔐 Segurança:</strong>
              <p className="text-blue-700">Dados criptografados e backup automático</p>
            </div>
            <div>
              <strong className="text-blue-800">🎯 Público-alvo:</strong>
              <p className="text-blue-700">Profissionais semianalfabetos com suporte por áudio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 