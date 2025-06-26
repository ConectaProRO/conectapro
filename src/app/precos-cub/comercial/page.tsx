"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBuilding, FaCalculator, FaArrowLeft, FaInfoCircle, FaStore, FaWarehouse } from "react-icons/fa";
import PageLayout, { PageCard, PageButton } from "../../../components/PageLayout";

// Dados detalhados do CUB Comercial
const dadosCUBComercial = {
  cs8: { 
    valor: 2234.67, 
    descricao: "Salas/Conjuntos comerciais",
    detalhes: "Escritórios, consultórios, salas comerciais padrão",
    area_minima: 46.16,
    area_maxima: 108.10,
    caracteristicas: ["Acabamento médio", "Banheiros", "Divisórias"]
  },
  cs16: { 
    valor: 2567.89, 
    descricao: "Lojas e sobrelojas",
    detalhes: "Estabelecimentos comerciais com vitrine",
    area_minima: 149.01,
    area_maxima: 300.00,
    caracteristicas: ["Vitrine", "Acabamento superior", "Instalações completas"]
  },
  galpao: { 
    valor: 1678.23, 
    descricao: "Galpões industriais",
    detalhes: "Construções industriais e de armazenamento",
    area_minima: 500.00,
    area_maxima: 2000.00,
    caracteristicas: ["Estrutura metálica", "Pé direito alto", "Portões grandes"]
  }
};

export default function CUBComercialPage() {
  const [metragem, setMetragem] = useState<string>('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('');

  const calcularCusto = (valorCUB: number) => {
    if (!metragem || parseFloat(metragem) <= 0) return null;
    return valorCUB * parseFloat(metragem);
  };

  const getIcon = (tipo: string) => {
    switch(tipo) {
      case 'cs8': return <FaBuilding className="text-3xl text-blue-600 mb-4" />;
      case 'cs16': return <FaStore className="text-3xl text-green-600 mb-4" />;
      case 'galpao': return <FaWarehouse className="text-3xl text-purple-600 mb-4" />;
      default: return <FaBuilding className="text-3xl text-gray-600 mb-4" />;
    }
  };

  return (
    <PageLayout 
      title="🏢 CUB Comercial"
      subtitle="Custos unitários básicos para construção comercial em Porto Velho-RO"
    >
      {/* Botão Voltar */}
      <div className="mb-6">
        <Link 
          href="/precos-cub"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaArrowLeft />
          Voltar para Preços CUB
        </Link>
      </div>

      {/* Informações Gerais */}
      <PageCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FaInfoCircle className="text-green-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold cp-text-gradient">
              CUB Comercial - Detalhado
            </h2>
            <p className="text-gray-600">
              Valores específicos para construções comerciais e industriais
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-3 text-green-800">🏢 Sobre o CUB Comercial:</h3>
          <p className="text-green-700 leading-relaxed">
            O CUB Comercial abrange diferentes tipos de construções não residenciais, 
            incluindo escritórios, lojas e galpões industriais. Cada categoria tem 
            características específicas de acabamento e instalações.
          </p>
        </div>
      </PageCard>

      {/* Cards de Tipos */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6 text-center">
          Tipos de Construção Comercial
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(dadosCUBComercial).map(([tipo, dados]) => (
            <div key={tipo} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition-all">
              {getIcon(tipo)}
              <h3 className="font-bold text-lg mb-2">{dados.descricao}</h3>
              <p className="text-sm text-gray-600 mb-4">{dados.detalhes}</p>
              <div className="text-2xl font-bold text-green-600 mb-2">
                R$ {dados.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/m²
              </div>
              <div className="text-xs text-gray-500">
                Área: {dados.area_minima}m² a {dados.area_maxima}m²
              </div>
            </div>
          ))}
        </div>
      </PageCard>

      {/* Tabela Detalhada */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6">
          Tabela Completa - CUB Comercial
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="cp-bg-figma-light">
                <th className="border border-gray-300 p-4 text-left font-semibold">Tipo</th>
                <th className="border border-gray-300 p-4 text-left font-semibold">Descrição</th>
                <th className="border border-gray-300 p-4 text-left font-semibold">Características</th>
                <th className="border border-gray-300 p-4 text-center font-semibold">Área (m²)</th>
                <th className="border border-gray-300 p-4 text-right font-semibold">Valor/m²</th>
                <th className="border border-gray-300 p-4 text-center font-semibold">Selecionar</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dadosCUBComercial).map(([tipo, dados]) => (
                <tr key={tipo} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-4 font-bold text-blue-600">
                    {tipo.toUpperCase()}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div>
                      <div className="font-semibold">{dados.descricao}</div>
                      <div className="text-sm text-gray-600 mt-1">{dados.detalhes}</div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="text-sm text-gray-600">
                      {dados.caracteristicas.map((carac, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="text-green-500">•</span>
                          {carac}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <div className="text-sm">
                      <div>{dados.area_minima}m² a</div>
                      <div>{dados.area_maxima}m²</div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4 text-right font-bold text-lg text-green-600">
                    R$ {dados.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <button
                      onClick={() => setTipoSelecionado(tipo)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        tipoSelecionado === tipo
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                      }`}
                    >
                      {tipoSelecionado === tipo ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            <strong>📅 Referência:</strong> Maio 2025 | 
            <strong> 📍 Região:</strong> Porto Velho-RO | 
            <strong> 🏛️ Fonte:</strong> Sinduscon-RO
          </p>
        </div>
      </PageCard>

      {/* Calculadora */}
      {tipoSelecionado && (
        <PageCard>
          <h2 className="text-2xl font-bold cp-text-gradient mb-6 flex items-center gap-3">
            <FaCalculator />
            Calculadora - {dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].descricao}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Área da construção (m²):
              </label>
              <input
                type="number"
                value={metragem}
                onChange={(e) => setMetragem(e.target.value)}
                placeholder="Ex: 200"
                className="w-full p-4 border-2 cp-border-figma rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Área recomendada: {dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].area_minima}m² a {dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].area_maxima}m²
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Estimativa de Custo Total:
              </h3>
              {metragem && parseFloat(metragem) > 0 ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    R$ {calcularCusto(dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].valor)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-green-700">
                    {metragem}m² × R$ {dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/m²
                  </div>
                  {/* Estimativas de materiais e mão de obra */}
                  {(() => {
                    const custo = calcularCusto(dadosCUBComercial[tipoSelecionado as keyof typeof dadosCUBComercial].valor);
                    const materiais = custo ? custo * 0.55 : 0;
                    const maoDeObra = custo ? custo * 0.4 : 0;
                    return (
                      <div className="mt-2 text-xs text-gray-700">
                        <div>Materiais: <span className="font-semibold">R$ {materiais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> (55%)</div>
                        <div>Mão de obra: <span className="font-semibold">R$ {maoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> (40%)</div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Digite a área para ver a estimativa
                </p>
              )}
            </div>
          </div>
        </PageCard>
      )}

      {/* Links Relacionados */}
      <PageCard>
        <h2 className="text-2xl font-bold cp-text-gradient mb-6 text-center">
          Explore Outros Tipos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            href="/precos-cub/residencial"
            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <FaBuilding className="text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-2">CUB Residencial</h3>
            <p className="text-gray-600 text-sm">
              Valores para construções residenciais
            </p>
          </Link>

          <Link 
            href="/precos-cub/detalhados"
            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <FaInfoCircle className="text-3xl text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
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