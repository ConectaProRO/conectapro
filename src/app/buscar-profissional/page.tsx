"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const servicos = [
  "Forma e Concretagem",
  "Contra-Piso",
  "Porcelanato e Cerâmica",
  "Pintura",
  "Forro de Gesso",
  "Metalúrgica e Solda",
  "Reboco",
  "Alvenaria",
];

// Array vazio - profissionais serão adicionados conforme novos cadastros
const profissionais: Array<{
  nome: string;
  bairro: string;
  fotos: string[];
  servicos: Record<string, string>;
}> = [];

export default function BuscarProfissional() {
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");

  const profissionaisFiltrados = profissionais.filter((prof) =>
    servicoSelecionado && prof.servicos[servicoSelecionado as keyof typeof prof.servicos]
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-gray-100 p-4">
      <div className="w-full max-w-2xl flex items-center mb-4">
        <Link href="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-lg px-4 py-2 rounded-xl bg-white shadow border border-gray-100 transition-all">
          <FaArrowLeft /> Voltar
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Buscar Profissional</h1>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Qual serviço você precisa?</label>
          <select
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={servicoSelecionado}
            onChange={e => setServicoSelecionado(e.target.value)}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico} value={servico}>{servico}</option>
            ))}
          </select>
        </div>
        {servicoSelecionado && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Profissionais encontrados:</h2>
            {profissionaisFiltrados.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Ainda não há profissionais cadastrados para este serviço.</p>
                <p className="text-sm text-blue-600">Seja o primeiro a se cadastrar e ganhe mais visibilidade!</p>
                <Link href="/cadastro-profissional" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Cadastrar como Profissional
                </Link>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profissionaisFiltrados.map((prof, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-3 min-h-[90px] hover:shadow-lg transition-all cursor-pointer"
                >
                  {/* Foto principal */}
                  <div className="flex-shrink-0">
                    {prof.fotos.length > 0 ? (
                      <img src={prof.fotos[0]} alt="Foto serviço" className="w-16 h-16 object-cover rounded-lg border" />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg text-gray-400 text-xs">Sem foto</div>
                    )}
                  </div>
                  {/* Info principal */}
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <span className="font-bold text-base text-gray-800 truncate">{prof.nome}</span>
                    <span className="text-xs text-gray-600 truncate">Bairro: {prof.bairro}</span>
                    <span className="text-xs text-gray-600 truncate">Nível: <b>{prof.servicos[servicoSelecionado as keyof typeof prof.servicos]}</b></span>
                  </div>
                  {/* Miniaturas extras */}
                  {prof.fotos.length > 1 && (
                    <div className="flex flex-col gap-1 ml-2">
                      {prof.fotos.slice(1, 3).map((foto, i) => (
                        <img key={i} src={foto} alt="Foto extra" className="w-7 h-7 object-cover rounded border" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 