"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBuilding, FaHome, FaChartLine, FaDownload, FaCalculator, FaInfoCircle } from "react-icons/fa";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

// Dados simulados do CUB (baseados em valores reais aproximados)
const dadosCUB = {
  residencial: {
    r1: { valor: 1850.45, descricao: "Casa popular (1 pavimento)" },
    r8: { valor: 2156.78, descricao: "Residência unifamiliar padrão" },
    r16: { valor: 2489.32, descricao: "Residência multifamiliar" }
  },
  comercial: {
    cs8: { valor: 2234.67, descricao: "Salas/Conjuntos comerciais" },
    cs16: { valor: 2567.89, descricao: "Lojas e sobrelojas" },
    galpao: { valor: 1678.23, descricao: "Galpões industriais" }
  }
};

export default function PreosCUBSindusconPage() {
  const [tipoSelecionado, setTipoSelecionado] = useState<'residencial' | 'comercial'>('residencial');
  const [metragem, setMetragem] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularCusto = (valorCUB: number) => {
    if (!metragem || parseFloat(metragem) <= 0) return null;
    return valorCUB * parseFloat(metragem);
  };

  return (
    <PageLayout 
      title="💰 Preços CUB Sinduscon"
      subtitle="Custos Unitários Básicos atualizados para sua obra em Porto Velho-RO"
    >
      {/* Card de Informações */}
      <PageCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaInfoCircle className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold cp-text-gradient">
              O que é o CUB?
            </h2>
            <p className="text-gray-600">
              Custo Unitário Básico - Referência oficial para construção civil
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800">📋 Definição:</h3>
            <p className="text-gray-600 leading-relaxed">
              O CUB é calculado mensalmente pelos Sinduscons e representa o custo 
              por metro quadrado de construção, incluindo materiais e mão de obra.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800">⚖️ Base Legal:</h3>
            <p className="text-gray-600 leading-relaxed">
              Estabelecido pela Lei 4.591/64 e NBR 12.721, é usado como referência 
              para financiamentos, contratos e avaliações imobiliárias.
            </p>
          </div>
        </div>
      </PageCard>

      {/* Seletor de Tipo */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6 text-center">
          Selecione o Tipo de Construção
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setTipoSelecionado('residencial')}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              tipoSelecionado === 'residencial'
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <FaHome className={`text-3xl mb-3 mx-auto ${
              tipoSelecionado === 'residencial' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h3 className="font-bold text-lg mb-2">Residencial</h3>
            <p className="text-gray-600 text-sm">
              Casas, apartamentos e residências
            </p>
          </button>

          <button
            onClick={() => setTipoSelecionado('comercial')}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              tipoSelecionado === 'comercial'
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <FaBuilding className={`text-3xl mb-3 mx-auto ${
              tipoSelecionado === 'comercial' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h3 className="font-bold text-lg mb-2">Comercial</h3>
            <p className="text-gray-600 text-sm">
              Lojas, escritórios e galpões
            </p>
          </button>
        </div>
      </PageCard>

      {/* Cards de Tipos com Calculadora Direta */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6 text-center">
          Valores CUB - {tipoSelecionado === 'residencial' ? 'Residencial' : 'Comercial'}
        </h2>
        <div className="flex flex-col gap-6">
          {Object.entries(dadosCUB[tipoSelecionado]).map(([tipo, dados]) => {
            const [metragemLocal, setMetragemLocal] = useState('');
            const custo = metragemLocal && parseFloat(metragemLocal) > 0 ? dados.valor * parseFloat(metragemLocal) : null;
            const materiais = custo ? custo * 0.55 : 0;
            const maoDeObra = custo ? custo * 0.4 : 0;
            return (
              <div key={tipo} className="rounded-2xl border-2 border-gray-200 p-6 bg-white shadow-sm w-full max-w-xl mx-auto">
                <div className="flex flex-col gap-2 mb-2">
                  <span className="font-bold text-blue-600 text-lg">{tipo.toUpperCase()}</span>
                  <span className="font-semibold text-gray-800">{dados.descricao}</span>
                  <span className="text-green-700 font-bold text-xl">R$ {dados.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/m²</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-medium text-gray-700">Metragem (m²):</label>
                  <input
                    type="number"
                    value={metragemLocal}
                    onChange={e => setMetragemLocal(e.target.value)}
                    placeholder="Ex: 120"
                    className="w-full p-3 border-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {metragemLocal && parseFloat(metragemLocal) > 0 ? (
                    <div className="mt-2 bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-bold text-green-600 text-lg mb-1">Total: R$ {custo?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                      <div>Materiais: <span className="font-semibold">R$ {materiais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> (55%)</div>
                      <div>Mão de obra: <span className="font-semibold">R$ {maoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> (40%)</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 italic text-xs">Digite a metragem para ver a estimativa</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            <strong>📅 Referência:</strong> Maio 2025 | 
            <strong> 📍 Região:</strong> Porto Velho-RO | 
            <strong> 🏛️ Fonte:</strong> Sinduscon-RO
          </p>
        </div>
      </PageCard>

      {/* Links para Subpáginas */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6 text-center">
          Explore Mais Detalhes
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/precos-cub/residencial"
            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <FaHome className="text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-2">CUB Residencial</h3>
            <p className="text-gray-600 text-sm">
              Valores detalhados para construções residenciais
            </p>
          </Link>

          <Link 
            href="/precos-cub/comercial"
            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <FaBuilding className="text-3xl text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-2">CUB Comercial</h3>
            <p className="text-gray-600 text-sm">
              Valores para estabelecimentos comerciais
            </p>
          </Link>

          <Link 
            href="/precos-cub/detalhados"
            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <FaChartLine className="text-3xl text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-2">Análise Detalhada</h3>
            <p className="text-gray-600 text-sm">
              Histórico e comparativos de preços
            </p>
          </Link>
        </div>
      </PageCard>
    </PageLayout>
  );
}