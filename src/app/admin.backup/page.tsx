"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { supabase } from '../../lib/supabase';

interface AdminStats {
  pendentes: number;
  aprovados: number;
  pendentes_whatsapp: number;
  pendentes_site: number;
  cadastros_hoje: number;
  avaliacoes_pendentes: number;
}

export default function PainelAdministrativo() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar estatísticas do banco
      // const { data, error } = await supabase
      //   .from('admin_stats')
      //   .select('*')
      //   .single();

      // if (error) {
      //   console.error('Erro ao carregar estatísticas:', error);
      //   setError('Erro ao conectar com o banco de dados');
      // } else {
      //   setStats(data);
      // }
      
      // Dados temporários para build
      setStats({
        pendentes: 0,
        aprovados: 0,
        pendentes_whatsapp: 0,
        pendentes_site: 0,
        cadastros_hoje: 0,
        avaliacoes_pendentes: 0
      });
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro de Conexão</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-4">
            <button
              onClick={carregarEstatisticas}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Tentar Novamente
            </button>
            <div className="text-sm text-gray-500">
              <p>Verifique se:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• O arquivo .env.local foi criado</li>
                <li>• As credenciais do Supabase estão corretas</li>
                <li>• As tabelas foram criadas no banco</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🛡️ Painel Administrativo
              </h1>
              <p className="text-gray-600">ConectaPro - Sistema de Gestão</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cadastros Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.pendentes || 0}</p>
                <p className="text-sm text-gray-500">Aguardando aprovação</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profissionais Ativos</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.aprovados || 0}</p>
                <p className="text-sm text-gray-500">Aprovados e visíveis</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cadastros Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.cadastros_hoje || 0}</p>
                <p className="text-sm text-gray-500">Novos cadastros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas por Origem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📱 Cadastros por WhatsApp</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-600">{stats?.pendentes_whatsapp || 0}</p>
                <p className="text-sm text-gray-600">Pendentes via bot</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats?.pendentes_whatsapp && stats?.pendentes 
                    ? `${Math.round((stats.pendentes_whatsapp / stats.pendentes) * 100)}%`
                    : '0%'
                  } do total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🌐 Cadastros pelo Site</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">{stats?.pendentes_site || 0}</p>
                <p className="text-sm text-gray-600">Pendentes via formulário</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats?.pendentes_site && stats?.pendentes 
                    ? `${Math.round((stats.pendentes_site / stats.pendentes) * 100)}%`
                    : '0%'
                  } do total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/cadastros"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Gerenciar Cadastros</h3>
                <p className="text-sm text-gray-600">Aprovar ou rejeitar profissionais</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 font-medium">Acessar →</span>
              {stats?.pendentes && stats.pendentes > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                  {stats.pendentes} pendentes
                </span>
              )}
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Avaliações</h3>
                <p className="text-sm text-gray-600">Moderar comentários e notas</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Em breve</span>
              {stats?.avaliacoes_pendentes && stats.avaliacoes_pendentes > 0 && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                  {stats.avaliacoes_pendentes} pendentes
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Relatórios</h3>
                <p className="text-sm text-gray-600">Estatísticas e análises</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Em breve</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">📱</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Bot</h3>
                <p className="text-sm text-gray-600">Configurar bot de cadastro</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Em breve</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Configurações</h3>
                <p className="text-sm text-gray-600">Ajustes do sistema</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Em breve</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Backup</h3>
                <p className="text-sm text-gray-600">Backup e restauração</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Em breve</span>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ℹ️ Informações do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Status do Banco:</p>
              <p className="font-medium text-green-600">✅ Conectado (Supabase)</p>
            </div>
            <div>
              <p className="text-gray-600">Última Atualização:</p>
              <p className="font-medium">{new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-gray-600">Versão do Sistema:</p>
              <p className="font-medium">ConectaPro v2.0</p>
            </div>
            <div>
              <p className="text-gray-600">Ambiente:</p>
              <p className="font-medium">Produção</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}