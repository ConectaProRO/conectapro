"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageLayout, { PageCard, PageButton } from '../../components/PageLayout';

interface Profissional {
  id: string;
  nome: string;
  profissao: string;
  whatsapp: string;
  email: string;
  experiencia: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  dataSubmissao: string;
  observacoes?: string;
}

interface Estatisticas {
  totalProfissionais: number;
  pendentes: number;
  aprovados: number;
  rejeitados: number;
  novosCadastros: number;
}

export default function AdminPage() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [stats, setStats] = useState<Estatisticas>({
    totalProfissionais: 0,
    pendentes: 0,
    aprovados: 0,
    rejeitados: 0,
    novosCadastros: 0
  });
  const [filtro, setFiltro] = useState<'todos' | 'pendentes' | 'aprovados' | 'rejeitados'>('todos');
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('conectapro-profissionais');
    if (dadosSalvos) {
      const profissionaisSalvos = JSON.parse(dadosSalvos);
      setProfissionais(profissionaisSalvos);
      calcularEstatisticas(profissionaisSalvos);
    } else {
      // Dados de exemplo para demonstração
      const dadosExemplo: Profissional[] = [
        {
          id: '1',
          nome: 'João Silva',
          profissao: 'Pedreiro',
          whatsapp: '69999888777',
          email: 'joao@email.com',
          experiencia: '5 anos',
          status: 'pendente',
          dataSubmissao: '2025-01-22',
          observacoes: 'Profissional experiente em alvenaria'
        },
        {
          id: '2',
          nome: 'Maria Santos',
          profissao: 'Pintora',
          whatsapp: '69888777666',
          email: 'maria@email.com',
          experiencia: '3 anos',
          status: 'aprovado',
          dataSubmissao: '2025-01-21'
        },
        {
          id: '3',
          nome: 'Carlos Oliveira',
          profissao: 'Eletricista',
          whatsapp: '69777666555',
          email: 'carlos@email.com',
          experiencia: '8 anos',
          status: 'pendente',
          dataSubmissao: '2025-01-22'
        }
      ];
      setProfissionais(dadosExemplo);
      localStorage.setItem('conectapro-profissionais', JSON.stringify(dadosExemplo));
      calcularEstatisticas(dadosExemplo);
    }
    setLoading(false);
  }, []);

  const calcularEstatisticas = (dados: Profissional[]) => {
    const stats = {
      totalProfissionais: dados.length,
      pendentes: dados.filter(p => p.status === 'pendente').length,
      aprovados: dados.filter(p => p.status === 'aprovado').length,
      rejeitados: dados.filter(p => p.status === 'rejeitado').length,
      novosCadastros: dados.filter(p => {
        const hoje = new Date();
        const dataSubmissao = new Date(p.dataSubmissao);
        const diffTime = Math.abs(hoje.getTime() - dataSubmissao.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }).length
    };
    setStats(stats);
  };

  const atualizarStatus = (id: string, novoStatus: 'aprovado' | 'rejeitado') => {
    const profissionaisAtualizados = profissionais.map(p => 
      p.id === id ? { ...p, status: novoStatus } : p
    );
    setProfissionais(profissionaisAtualizados);
    localStorage.setItem('conectapro-profissionais', JSON.stringify(profissionaisAtualizados));
    calcularEstatisticas(profissionaisAtualizados);
    
    // Simular notificação WhatsApp
    const profissional = profissionais.find(p => p.id === id);
    if (profissional) {
      alert(`📱 WhatsApp enviado para ${profissional.nome}: Cadastro ${novoStatus}!`);
    }
  };

  const profissionaisFiltrados = profissionais.filter(p => {
    if (filtro === 'todos') return true;
    return p.status === filtro;
  });

  if (loading) {
    return (
      <PageLayout title="⚙️ Painel Administrativo" subtitle="Gerenciamento de profissionais">
        <PageCard>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Carregando dados...</p>
          </div>
        </PageCard>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="⚙️ Painel Administrativo" subtitle="Gerenciamento de profissionais">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PageCard className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalProfissionais}</div>
          <div className="text-gray-600">Total de Profissionais</div>
        </PageCard>
        
        <PageCard className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{stats.pendentes}</div>
          <div className="text-gray-600">Aguardando Aprovação</div>
        </PageCard>
        
        <PageCard className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.aprovados}</div>
          <div className="text-gray-600">Aprovados</div>
        </PageCard>
        
        <PageCard className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{stats.novosCadastros}</div>
          <div className="text-gray-600">Novos (7 dias)</div>
        </PageCard>
      </div>

      {/* Filtros */}
      <PageCard>
        <div className="flex flex-wrap gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 w-full mb-4">Filtrar por Status:</h2>
          {(['todos', 'pendentes', 'aprovados', 'rejeitados'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFiltro(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filtro === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'todos' && ` (${stats[status as keyof Omit<Estatisticas, 'totalProfissionais' | 'novosCadastros'>]})`}
            </button>
          ))}
        </div>
      </PageCard>

      {/* Lista de Profissionais */}
      <PageCard>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Lista de Profissionais ({profissionaisFiltrados.length})
        </h2>
        
        {profissionaisFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum profissional encontrado para este filtro.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {profissionaisFiltrados.map((profissional) => (
              <div key={profissional.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{profissional.nome}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        profissional.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                        profissional.status === 'rejeitado' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {profissional.status.charAt(0).toUpperCase() + profissional.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div><strong>Profissão:</strong> {profissional.profissao}</div>
                      <div><strong>WhatsApp:</strong> {profissional.whatsapp}</div>
                      <div><strong>Email:</strong> {profissional.email}</div>
                      <div><strong>Experiência:</strong> {profissional.experiencia}</div>
                      <div><strong>Data:</strong> {new Date(profissional.dataSubmissao).toLocaleDateString('pt-BR')}</div>
                    </div>
                    
                    {profissional.observacoes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <strong className="text-sm text-gray-700">Observações:</strong>
                        <p className="text-sm text-gray-600 mt-1">{profissional.observacoes}</p>
                      </div>
                    )}
                  </div>
                  
                  {profissional.status === 'pendente' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => atualizarStatus(profissional.id, 'aprovado')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                      >
                        ✅ Aprovar
                      </button>
                      <button
                        onClick={() => atualizarStatus(profissional.id, 'rejeitado')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                      >
                        ❌ Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </PageCard>

      {/* Ações Rápidas */}
      <PageCard>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/cadastro-profissional">
            <PageButton variant="primary" className="w-full justify-center">
              👷 Novo Cadastro
            </PageButton>
          </Link>
          
          <button
            onClick={() => {
              const dados = localStorage.getItem('conectapro-profissionais');
              if (dados) {
                const blob = new Blob([dados], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'profissionais-conectapro.json';
                a.click();
              }
            }}
            className="cp-button-secondary w-full justify-center"
          >
            📊 Exportar Dados
          </button>
          
          <button
            onClick={() => {
              if (confirm('Tem certeza que deseja limpar todos os dados?')) {
                localStorage.removeItem('conectapro-profissionais');
                setProfissionais([]);
                setStats({
                  totalProfissionais: 0,
                  pendentes: 0,
                  aprovados: 0,
                  rejeitados: 0,
                  novosCadastros: 0
                });
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full"
          >
            🗑️ Limpar Dados
          </button>
        </div>
      </PageCard>
    </PageLayout>
  );
} 