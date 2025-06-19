"use client";
import React, { useState, useEffect } from "react";

interface Profissional {
  id: string;
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  servicosSelecionados: string[];
}

export default function TesteBusca() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      const response = await fetch('/api/profissionais');
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Profissionais carregados:', data);
        setProfissionais(data);
      }
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    }
  };

  const profissionaisFiltrados = profissionais.filter((prof) => {
    if (!servicoSelecionado) return false;
    
    console.log('🔍 Testando profissional:', prof.nome);
    console.log('  - Serviço buscado:', servicoSelecionado);
    console.log('  - Serviços do profissional:', prof.servicosSelecionados);
    console.log('  - Inclui?', prof.servicosSelecionados?.includes(servicoSelecionado));
    
    return prof.servicosSelecionados?.includes(servicoSelecionado) || false;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Teste de Busca</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Dados Carregados</h2>
          <div className="text-sm text-gray-600">
            <div>Total de profissionais: {profissionais.length}</div>
            {profissionais.map(prof => (
              <div key={prof.id} className="ml-4 mt-2">
                • {prof.nome} ({prof.profissao}) - Serviços: {JSON.stringify(prof.servicosSelecionados)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Busca</h2>
          <select
            className="w-full border-2 border-gray-200 rounded p-3"
            value={servicoSelecionado}
            onChange={e => setServicoSelecionado(e.target.value)}
          >
            <option value="">Selecione um serviço...</option>
            <option value="Pintura">Pintura</option>
            <option value="Alvenaria">Alvenaria</option>
            <option value="Reboco">Reboco</option>
            <option value="Forro de Gesso">Forro de Gesso</option>
          </select>
        </div>

        {servicoSelecionado && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Resultados para: {servicoSelecionado}</h2>
            <div className="text-sm text-gray-600 mb-4">
              Profissionais encontrados: {profissionaisFiltrados.length}
            </div>
            
            {profissionaisFiltrados.length === 0 ? (
              <div className="text-red-600">❌ Nenhum profissional encontrado</div>
            ) : (
              <div className="space-y-4">
                {profissionaisFiltrados.map(prof => (
                  <div key={prof.id} className="border p-4 rounded">
                    <h3 className="font-bold">{prof.nome}</h3>
                    <p>Profissão: {prof.profissao}</p>
                    <p>Bairro: {prof.bairro}</p>
                    <p>Telefone: {prof.telefone}</p>
                    <p>Serviços: {JSON.stringify(prof.servicosSelecionados)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 