"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Cadastro {
  id: string;
  timestamp: string;
  status: string;
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  nivelServicos: Record<string, string>;
  meiosTransporte: string[];
  numeroFotos: number;
}

export default function AdminPage() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const SENHA_ADMIN = 'conectapro2024'; // Mude para uma senha segura

  const handleLogin = () => {
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
      carregarCadastros();
    } else {
      alert('Senha incorreta!');
    }
  };

  const carregarCadastros = async () => {
    setCarregando(true);
    try {
      const response = await fetch('/api/admin/cadastros', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCadastros(data);
      } else {
        console.error('Erro na response:', response.status);
        // Para desenvolvimento, vamos simular alguns dados
        setCadastros([]);
      }
    } catch (error) {
      console.error('Erro ao carregar cadastros:', error);
      setCadastros([]);
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getServicosAtivos = (nivelServicos: Record<string, string>) => {
    return Object.entries(nivelServicos)
      .filter(([, nivel]) => nivel !== 'Não faço')
      .map(([servico, nivel]) => `${servico} (${nivel})`)
      .join(', ');
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard - Cadastros</h1>
          <div className="flex gap-4">
            <button
              onClick={carregarCadastros}
              disabled={carregando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {carregando ? 'Carregando...' : 'Atualizar'}
            </button>
            <Link href="/" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Voltar ao Site
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Resumo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Total de Cadastros</h3>
              <p className="text-2xl font-bold text-blue-600">{cadastros.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Pendentes</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {cadastros.filter(c => c.status === 'pendente').length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">Aprovados</h3>
              <p className="text-2xl font-bold text-green-600">
                {cadastros.filter(c => c.status === 'aprovado').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Cadastros Recebidos</h2>
          </div>
          
          {cadastros.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum cadastro recebido ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profissão/Bairro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviços
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cadastros.map((cadastro) => (
                    <tr key={cadastro.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatarData(cadastro.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cadastro.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`https://wa.me/55${cadastro.telefone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:text-green-800 underline"
                        >
                          {cadastro.telefone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{cadastro.profissao}</div>
                        <div className="text-xs text-gray-400">{cadastro.bairro}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {getServicosAtivos(cadastro.nivelServicos)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          cadastro.status === 'pendente' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {cadastro.status === 'pendente' ? 'Pendente' : 'Aprovado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 