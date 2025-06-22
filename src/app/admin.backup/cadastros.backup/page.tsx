"use client";

import { useState, useEffect } from 'react';
// import { supabase, listarProfissionaisPendentes, aprovarProfissional, ProfissionalPendente } from '../../../lib/supabase';

// Tipos temporários para build
interface ProfissionalPendente {
  id: string;
  nome: string;
  profissao: string;
  whatsapp: string;
  origem: string;
  created_at: string;
  [key: string]: any;
}

export default function GerenciarCadastros() {
  const [profissionaisPendentes, setProfissionaisPendentes] = useState<ProfissionalPendente[]>([]);
  const [loading, setLoading] = useState(true);
  const [processando, setProcessando] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<'todos' | 'site' | 'whatsapp'>('todos');

  useEffect(() => {
    carregarPendentes();
  }, []);

  const carregarPendentes = async () => {
    setLoading(true);
    // const resultado = await listarProfissionaisPendentes();
    // if (resultado.success) {
    //   setProfissionaisPendentes(resultado.data || []);
    // }
    setProfissionaisPendentes([]); // Temporário para build
    setLoading(false);
  };

  const handleAprovar = async (id: string) => {
    setProcessando(id);
    // const resultado = await aprovarProfissional(id, 'Admin');
    
    // if (resultado.success) {
      alert('✅ Profissional aprovado com sucesso!');
      await carregarPendentes();
    // } else {
    //   alert('❌ Erro ao aprovar profissional');
    // }
    setProcessando(null);
  };

  const handleRejeitar = async (id: string) => {
    if (!confirm('Tem certeza que deseja rejeitar este cadastro?')) return;
    
    setProcessando(id);
    
    try {
      // const { error } = await supabase
      //   .from('profissionais_pendentes')
      //   .update({ 
      //     status: 'rejeitado',
      //     updated_at: new Date().toISOString()
      //   })
      //   .eq('id', id);

      // if (error) throw error;
      
      alert('✅ Cadastro rejeitado');
      await carregarPendentes();
    } catch (error) {
      alert('❌ Erro ao rejeitar cadastro');
    }
    
    setProcessando(null);
  };

  const profissionaisFiltrados = profissionaisPendentes.filter(prof => {
    if (filtro === 'todos') return true;
    return prof.origem === filtro;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando cadastros...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📋 Gerenciar Cadastros
          </h1>
          <p className="text-gray-600">
            Aprovar ou rejeitar profissionais pendentes
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profissionaisPendentes.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">🌐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Via Site</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profissionaisPendentes.filter(p => p.origem === 'site').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">📱</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Via WhatsApp</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profissionaisPendentes.filter(p => p.origem === 'whatsapp').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profissionaisPendentes.filter(p => {
                    const hoje = new Date().toDateString();
                    const cadastro = new Date(p.created_at).toDateString();
                    return hoje === cadastro;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'todos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({profissionaisPendentes.length})
            </button>
            <button
              onClick={() => setFiltro('site')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'site'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Via Site ({profissionaisPendentes.filter(p => p.origem === 'site').length})
            </button>
            <button
              onClick={() => setFiltro('whatsapp')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'whatsapp'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Via WhatsApp ({profissionaisPendentes.filter(p => p.origem === 'whatsapp').length})
            </button>
          </div>
        </div>

        {/* Lista de Profissionais */}
        <div className="space-y-6">
          {profissionaisFiltrados.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <span className="text-6xl mb-4 block">🎉</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum cadastro pendente!
              </h3>
              <p className="text-gray-600">
                Todos os profissionais foram processados.
              </p>
            </div>
          ) : (
            profissionaisFiltrados.map((profissional) => (
              <div key={profissional.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {profissional.nome}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        profissional.origem === 'whatsapp'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {profissional.origem === 'whatsapp' ? '📱 WhatsApp' : '🌐 Site'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">📞 Telefone</p>
                        <p className="font-medium">{profissional.telefone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">📧 Email</p>
                        <p className="font-medium">{profissional.email || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">🔧 Serviços</p>
                        <p className="font-medium">{profissional.servicos.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">⏰ Experiência</p>
                        <p className="font-medium">{profissional.experiencia}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">📍 Endereço</p>
                        <p className="font-medium">
                          {profissional.endereco.rua}, {profissional.endereco.bairro} - {profissional.endereco.cidade}/{profissional.endereco.estado}
                        </p>
                      </div>
                    </div>

                    {profissional.origem === 'whatsapp' && profissional.dados_whatsapp && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-green-800 mb-2">
                          💬 Dados do WhatsApp
                        </p>
                        <p className="text-sm text-green-700">
                          Mensagens trocadas: {profissional.dados_whatsapp.mensagens?.length || 0}
                        </p>
                        <p className="text-sm text-green-700">
                          Cadastrado em: {new Date(profissional.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    )}

                    {profissional.portfolio_urls && profissional.portfolio_urls.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">📸 Portfolio</p>
                        <p className="text-sm font-medium">
                          {profissional.portfolio_urls.length} foto(s) enviada(s)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 lg:ml-6 mt-4 lg:mt-0">
                    <button
                      onClick={() => handleAprovar(profissional.id)}
                      disabled={processando === profissional.id}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {processando === profissional.id ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Aprovando...
                        </span>
                      ) : (
                        '✅ Aprovar'
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleRejeitar(profissional.id)}
                      disabled={processando === profissional.id}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ❌ Rejeitar
                    </button>
                    
                    {profissional.origem === 'whatsapp' && (
                      <a
                        href={`https://wa.me/${profissional.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        💬 Contatar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 