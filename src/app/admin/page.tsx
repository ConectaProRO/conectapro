"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaStar, FaCheck, FaTimes, FaEye, FaTrash, FaThumbsDown } from 'react-icons/fa';

interface Cadastro {
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

interface Avaliacao {
  id: string;
  profissionalId: string;
  clienteNome: string;
  clienteTelefone: string;
  nota: number;
  comentario: string;
  servico: string;
  timestamp: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  resposta?: string;
}

interface Estatisticas {
  total: number;
  pendentes: number;
  aprovados: number;
  totalAvaliacoes: number;
  avaliacoesPendentes: number;
  avaliacoesAprovadas: number;
}

export default function AdminPage() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    total: 0, pendentes: 0, aprovados: 0,
    totalAvaliacoes: 0, avaliacoesPendentes: 0, avaliacoesAprovadas: 0
  });
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState<'cadastros' | 'avaliacoes'>('cadastros');
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<Avaliacao | null>(null);

  const SENHA_ADMIN = 'conectapro2024';

  const handleLogin = () => {
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
      carregarDados();
    } else {
      alert('Senha incorreta!');
    }
  };

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [cadastrosRes, avaliacoesRes] = await Promise.all([
        fetch('/api/admin/cadastros'),
        fetch('/api/admin/avaliacoes')
      ]);

      if (cadastrosRes.ok) {
        const cadastrosData = await cadastrosRes.json();
        setCadastros(cadastrosData);
      }

      if (avaliacoesRes.ok) {
        const avaliacoesData = await avaliacoesRes.json();
        setAvaliacoes(avaliacoesData);
      }

      // Calcular estatísticas localmente por enquanto
      calcularEstatisticas();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const calcularEstatisticas = useCallback(() => {
    setEstatisticas({
      total: cadastros.length,
      pendentes: cadastros.filter(c => c.status === 'pendente').length,
      aprovados: cadastros.filter(c => c.status === 'aprovado').length,
      totalAvaliacoes: avaliacoes.length,
      avaliacoesPendentes: avaliacoes.filter(a => a.status === 'pendente').length,
      avaliacoesAprovadas: avaliacoes.filter(a => a.status === 'aprovada').length,
    });
  }, [cadastros, avaliacoes]);

  useEffect(() => {
    calcularEstatisticas();
  }, [calcularEstatisticas]);

  const aprovarProfissional = async (id: string) => {
    try {
      const response = await fetch('/api/admin/aprovar-profissional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setCadastros(prev => prev.map(c => 
          c.id === id ? { ...c, status: 'aprovado' as const } : c
        ));
        alert('Profissional aprovado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao aprovar profissional:', error);
      alert('Erro ao aprovar profissional.');
    }
  };

  const desaprovarProfissional = async (id: string) => {
    if (!confirm('Tem certeza que deseja desaprovar este profissional?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/desaprovar-profissional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setCadastros(prev => prev.map(c => 
          c.id === id ? { ...c, status: 'rejeitado' as const } : c
        ));
        alert('Profissional desaprovado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao desaprovar profissional:', error);
      alert('Erro ao desaprovar profissional.');
    }
  };

  const excluirProfissional = async (id: string) => {
    if (!confirm('ATENÇÃO: Tem certeza que deseja EXCLUIR permanentemente este profissional? Esta ação não pode ser desfeita!')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/excluir-profissional?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCadastros(prev => prev.filter(c => c.id !== id));
        alert('Profissional excluído permanentemente!');
      }
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      alert('Erro ao excluir profissional.');
    }
  };

  const aprovarAvaliacao = async (id: string) => {
    try {
      const response = await fetch('/api/admin/aprovar-avaliacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setAvaliacoes(prev => prev.map(a => 
          a.id === id ? { ...a, status: 'aprovada' as const } : a
        ));
        alert('Avaliação aprovada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao aprovar avaliação:', error);
      alert('Erro ao aprovar avaliação.');
    }
  };

  const rejeitarAvaliacao = async (id: string, resposta?: string) => {
    try {
      const response = await fetch('/api/admin/rejeitar-avaliacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resposta })
      });

      if (response.ok) {
        setAvaliacoes(prev => prev.map(a => 
          a.id === id ? { ...a, status: 'rejeitada' as const, resposta } : a
        ));
        alert('Avaliação rejeitada.');
        setAvaliacaoSelecionada(null);
      }
    } catch (error) {
      console.error('Erro ao rejeitar avaliação:', error);
      alert('Erro ao rejeitar avaliação.');
    }
  };

  const excluirAvaliacao = async (id: string) => {
    if (!confirm('ATENÇÃO: Tem certeza que deseja EXCLUIR permanentemente esta avaliação? Esta ação não pode ser desfeita!')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/excluir-avaliacao?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAvaliacoes(prev => prev.filter(a => a.id !== id));
        alert('Avaliação excluída permanentemente!');
      }
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      alert('Erro ao excluir avaliação.');
    }
  };

  const excluirTodosProfissionais = async () => {
    try {
      // Excluir todos os profissionais um por um
      const promessas = cadastros.map(cadastro => 
        fetch(`/api/admin/excluir-profissional?id=${cadastro.id}`, {
          method: 'DELETE'
        })
      );

      await Promise.all(promessas);
      
      // Limpar o estado local
      setCadastros([]);
      alert(`✅ Todos os ${cadastros.length} profissionais foram excluídos permanentemente!`);
      
      // Recarregar dados para confirmar
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir todos os profissionais:', error);
      alert('Erro ao excluir profissionais. Alguns podem não ter sido excluídos.');
    }
  };

  const formatarData = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getServicosAtivos = (cadastro: Cadastro) => {
    // Novo sistema: usar servicosSelecionados
    if (cadastro.servicosSelecionados && cadastro.servicosSelecionados.length > 0) {
      return cadastro.servicosSelecionados.join(', ');
    }
    
    // Sistema antigo: usar nivelServicos para compatibilidade
    if (cadastro.nivelServicos) {
      return Object.entries(cadastro.nivelServicos)
        .filter(([, nivel]) => nivel !== 'Não faço')
        .map(([servico, nivel]) => `${servico} (${nivel})`)
        .join(', ');
    }
    
    return 'Nenhum serviço selecionado';
  };

  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={i < nota ? "text-yellow-400" : "text-gray-300"} 
        size={14}
      />
    ));
  };

  const obterNomeProfissional = (profissionalId: string) => {
    const profissional = cadastros.find(c => c.id === profissionalId);
    return profissional?.nome || 'Profissional não encontrado';
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin - ConectaPro</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Senha de administrador"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={carregarDados}
              disabled={carregando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {carregando ? 'Carregando...' : 'Atualizar'}
            </button>
            <button
              onClick={() => {
                if (confirm('⚠️ ATENÇÃO: Deseja excluir TODOS os cadastros de profissionais? Esta ação é IRREVERSÍVEL!')) {
                  if (confirm('🚨 CONFIRMAÇÃO FINAL: Tem certeza absoluta? Todos os dados serão perdidos permanentemente!')) {
                    excluirTodosProfissionais();
                  }
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaTrash size={14} />
              Limpar Todos
            </button>
            <Link href="/" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Voltar ao Site
            </Link>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Resumo Geral</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 text-sm">Total Cadastros</h3>
              <p className="text-2xl font-bold text-blue-600">{estatisticas.total}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800 text-sm">Pendentes</h3>
              <p className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 text-sm">Aprovados</h3>
              <p className="text-2xl font-bold text-green-600">{estatisticas.aprovados}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 text-sm">Total Avaliações</h3>
              <p className="text-2xl font-bold text-purple-600">{estatisticas.totalAvaliacoes}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-bold text-orange-800 text-sm">Aval. Pendentes</h3>
              <p className="text-2xl font-bold text-orange-600">{estatisticas.avaliacoesPendentes}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-bold text-teal-800 text-sm">Aval. Aprovadas</h3>
              <p className="text-2xl font-bold text-teal-600">{estatisticas.avaliacoesAprovadas}</p>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setAbaSelecionada('cadastros')}
                className={`px-6 py-4 font-semibold ${
                  abaSelecionada === 'cadastros' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cadastros de Profissionais
              </button>
              <button
                onClick={() => setAbaSelecionada('avaliacoes')}
                className={`px-6 py-4 font-semibold ${
                  abaSelecionada === 'avaliacoes' 
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Avaliações
                {estatisticas.avaliacoesPendentes > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {estatisticas.avaliacoesPendentes}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Conteúdo das Abas */}
          {abaSelecionada === 'cadastros' ? (
            <div>
              {cadastros.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nenhum cadastro recebido ainda.
                </div>
              ) : (
                <>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 m-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">⚠️</span>
                      <p className="text-sm text-yellow-800">
                        <strong>Dica:</strong> Role horizontalmente para ver a coluna &quot;🗑️ AÇÕES&quot; onde estão os botões de exclusão.
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profissão/Bairro</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviços</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detalhes</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">🗑️ AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cadastros.map((cadastro) => (
                        <tr key={cadastro.id} className="hover:bg-gray-50">
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {formatarData(cadastro.timestamp)}
                          </td>
                          <td className="px-3 py-4">
                            <div className="font-medium text-gray-900">{cadastro.nome}</div>
                          </td>
                          <td className="px-3 py-4">
                            <a 
                              href={`https://wa.me/55${cadastro.telefone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 underline text-sm"
                            >
                              {cadastro.telefone}
                            </a>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            <div>{cadastro.profissao}</div>
                            <div className="text-xs text-gray-400">{cadastro.bairro}</div>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                            <div className="truncate">{getServicosAtivos(cadastro)}</div>
                          </td>
                          <td className="px-3 py-4 text-xs text-gray-500">
                            <div className="space-y-1">
                              {cadastro.experiencia && (
                                <div>📈 {cadastro.experiencia} anos</div>
                              )}
                              {(cadastro.meiosTransporte || cadastro.transportes)?.length > 0 && (
                                <div>🚗 {(cadastro.meiosTransporte || cadastro.transportes || []).join(', ')}</div>
                              )}
                              <div>📸 {cadastro.temFotoPerfil ? '✅' : '❌'} Perfil | {cadastro.numeroFotosGaleria || 0} fotos</div>
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              cadastro.status === 'pendente' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : cadastro.status === 'aprovado'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {cadastro.status === 'pendente' ? 'Pendente' : 
                               cadastro.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'}
                            </span>
                          </td>
                          <td className="px-3 py-4 w-32">
                            <div className="flex flex-col gap-2">
                              {cadastro.status === 'pendente' && (
                                <button
                                  onClick={() => aprovarProfissional(cadastro.id)}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                                >
                                  <FaCheck size={12} />
                                  Aprovar
                                </button>
                              )}
                              
                              {cadastro.status === 'aprovado' && (
                                <button
                                  onClick={() => desaprovarProfissional(cadastro.id)}
                                  className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors flex items-center gap-1"
                                >
                                  <FaThumbsDown size={12} />
                                  Desaprovar
                                </button>
                              )}
                              
                              <button
                                onClick={() => excluirProfissional(cadastro.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors flex items-center gap-1 font-semibold"
                                title="Excluir permanentemente este profissional"
                              >
                                <FaTrash size={12} />
                                🗑️ EXCLUIR
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              {avaliacoes.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nenhuma avaliação recebida ainda.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profissional</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {avaliacoes.map((avaliacao) => (
                        <tr key={avaliacao.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatarData(avaliacao.timestamp)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{avaliacao.clienteNome}</div>
                            <div className="text-xs text-gray-500">{avaliacao.clienteTelefone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {obterNomeProfissional(avaliacao.profissionalId)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {avaliacao.servico}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              {renderEstrelas(avaliacao.nota)}
                              <span className="text-sm text-gray-500 ml-1">{avaliacao.nota}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              avaliacao.status === 'pendente' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : avaliacao.status === 'aprovada'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {avaliacao.status === 'pendente' ? 'Pendente' : 
                               avaliacao.status === 'aprovada' ? 'Aprovada' : 'Rejeitada'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setAvaliacaoSelecionada(avaliacao)}
                                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1"
                                >
                                  <FaEye size={10} />
                                  Ver
                                </button>
                                {avaliacao.status === 'pendente' && (
                                  <>
                                    <button
                                      onClick={() => aprovarAvaliacao(avaliacao.id)}
                                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors flex items-center gap-1"
                                    >
                                      <FaCheck size={10} />
                                      Aprovar
                                    </button>
                                    <button
                                      onClick={() => rejeitarAvaliacao(avaliacao.id)}
                                      className="bg-orange-600 text-white px-2 py-1 rounded text-xs hover:bg-orange-700 transition-colors flex items-center gap-1"
                                    >
                                      <FaTimes size={10} />
                                      Rejeitar
                                    </button>
                                  </>
                                )}
                              </div>
                              <button
                                onClick={() => excluirAvaliacao(avaliacao.id)}
                                className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors flex items-center gap-1"
                              >
                                <FaTrash size={10} />
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes da Avaliação */}
      {avaliacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Detalhes da Avaliação</h3>
                <button 
                  onClick={() => setAvaliacaoSelecionada(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-sm text-gray-600">Cliente:</span>
                <p className="font-semibold">{avaliacaoSelecionada.clienteNome}</p>
                <p className="text-sm text-gray-500">{avaliacaoSelecionada.clienteTelefone}</p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Profissional:</span>
                <p className="font-semibold">{obterNomeProfissional(avaliacaoSelecionada.profissionalId)}</p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Serviço:</span>
                <p className="font-semibold">{avaliacaoSelecionada.servico}</p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Avaliação:</span>
                <div className="flex items-center gap-2">
                  {renderEstrelas(avaliacaoSelecionada.nota)}
                  <span className="font-semibold">{avaliacaoSelecionada.nota}/5</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Comentário:</span>
                <p className="bg-gray-50 p-3 rounded-lg">{avaliacaoSelecionada.comentario}</p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Data:</span>
                <p className="font-semibold">{formatarData(avaliacaoSelecionada.timestamp)}</p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {avaliacaoSelecionada.status === 'pendente' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => rejeitarAvaliacao(avaliacaoSelecionada.id)}
                      className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Rejeitar
                    </button>
                    <button
                      onClick={() => aprovarAvaliacao(avaliacaoSelecionada.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Aprovar
                    </button>
                  </div>
                )}
                
                <button
                  onClick={() => {
                    excluirAvaliacao(avaliacaoSelecionada.id);
                    setAvaliacaoSelecionada(null);
                  }}
                  className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaTrash size={14} />
                  Excluir Permanentemente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 