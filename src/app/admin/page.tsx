"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Cadastro {
  id: string;
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  status: string;
  timestamp: string;
}

interface Avaliacao {
  id: string;
  clienteNome: string;
  nota: number;
  comentario: string;
  servico: string;
  status: string;
  timestamp: string;
}

interface Estatisticas {
  total: number;
  pendentes: number;
  aprovados: number;
  rejeitados: number;
  visiveis: number;
  ocultos: number;
  totalAvaliacoes: number;
  avaliacoesPendentes: number;
  avaliacoesAprovadas: number;
  avaliacoesRejeitadas: number;
}

export default function AdminPage() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [aba, setAba] = useState<'cadastros' | 'avaliacoes'>('cadastros');

  useEffect(() => {
    fetch('/api/admin/cadastros').then(r => r.json()).then(setCadastros);
    fetch('/api/admin/avaliacoes').then(r => r.json()).then(setAvaliacoes);
    fetch('/api/estatisticas').then(r => r.json()).then(setEstatisticas).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ Admin ConectaPro</h1>
          <p className="text-lg text-gray-600 mb-4">Painel administrativo para gestão de cadastros e avaliações.</p>
        </div>

        {/* Estatísticas */}
        {estatisticas && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl font-bold text-blue-700">{estatisticas.total}</div>
              <div className="text-xs text-gray-500">Cadastros</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes}</div>
              <div className="text-xs text-gray-500">Pendentes</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl font-bold text-green-700">{estatisticas.aprovados}</div>
              <div className="text-xs text-gray-500">Aprovados</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl font-bold text-red-600">{estatisticas.rejeitados}</div>
              <div className="text-xs text-gray-500">Rejeitados</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow text-center">
              <div className="text-2xl font-bold text-purple-700">{estatisticas.totalAvaliacoes}</div>
              <div className="text-xs text-gray-500">Avaliações</div>
            </div>
          </div>
        )}

        {/* Abas */}
        <div className="flex gap-4 mb-6 justify-center">
          <button onClick={() => setAba('cadastros')} className={`px-4 py-2 rounded-lg font-semibold ${aba==='cadastros' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Cadastros</button>
          <button onClick={() => setAba('avaliacoes')} className={`px-4 py-2 rounded-lg font-semibold ${aba==='avaliacoes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Avaliações</button>
        </div>

        {/* Listagem de Cadastros */}
        {aba === 'cadastros' && (
          <div className="overflow-x-auto bg-white rounded-xl shadow p-4 mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Nome</th>
                  <th className="p-2">Profissão</th>
                  <th className="p-2">Bairro</th>
                  <th className="p-2">Telefone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {cadastros.map(c => (
                  <tr key={c.id} className="border-b">
                    <td className="p-2 font-semibold">{c.nome}</td>
                    <td className="p-2">{c.profissao}</td>
                    <td className="p-2">{c.bairro}</td>
                    <td className="p-2">{c.telefone}</td>
                    <td className="p-2">{c.status}</td>
                    <td className="p-2">{new Date(c.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Listagem de Avaliações */}
        {aba === 'avaliacoes' && (
          <div className="overflow-x-auto bg-white rounded-xl shadow p-4 mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Nota</th>
                  <th className="p-2">Comentário</th>
                  <th className="p-2">Serviço</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {avaliacoes.map(a => (
                  <tr key={a.id} className="border-b">
                    <td className="p-2 font-semibold">{a.clienteNome}</td>
                    <td className="p-2">{a.nota}</td>
                    <td className="p-2">{a.comentario}</td>
                    <td className="p-2">{a.servico}</td>
                    <td className="p-2">{a.status}</td>
                    <td className="p-2">{new Date(a.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 