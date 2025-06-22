"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function CUBResidencialPage() {
  const [tipoValor, setTipoValor] = useState("desonerado");
  const [padrao, setPadrao] = useState("normal");
  const [area, setArea] = useState(100);

  // Valores CUB (R$/m²)
  const valores = {
    desonerado: {
      popular: 1567.80,
      normal: 1847.25,
      alto: 2234.60
    },
    onerado: {
      popular: 1623.45,
      normal: 1912.30,
      alto: 2315.85
    }
  };

  // Percentuais por serviço
  const servicos = [
    { nome: "Alvenaria", emoji: "🧱", percentual: 15 },
    { nome: "Pintura", emoji: "🎨", percentual: 8 },
    { nome: "Elétrica", emoji: "⚡", percentual: 12 },
    { nome: "Hidráulica", emoji: "🚿", percentual: 10 },
    { nome: "Cobertura", emoji: "🏠", percentual: 18 },
    { nome: "Piso", emoji: "🔲", percentual: 14 }
  ];

  const cubAtual = valores[tipoValor as keyof typeof valores][padrao as keyof typeof valores.desonerado];
  const custoTotal = cubAtual * area;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="CUB Residencial - Sinduscon RO" bgColor="bg-green-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link href="/precos-cub" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            ← Voltar ao Menu CUB
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">🏠 Calculadora CUB Residencial</h1>
          <p className="text-gray-600">Calcule o custo de construção baseado no CUB oficial do Sinduscon-RO</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-green-700 mb-6">⚙️ Configurações</h3>
              
              {/* Tipo de Valor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Valor</label>
                <select 
                  value={tipoValor} 
                  onChange={(e) => setTipoValor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="desonerado">Desonerado</option>
                  <option value="onerado">Onerado</option>
                </select>
              </div>

              {/* Padrão Construtivo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Padrão Construtivo</label>
                <select 
                  value={padrao} 
                  onChange={(e) => setPadrao(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="popular">Popular</option>
                  <option value="normal">Normal</option>
                  <option value="alto">Alto Padrão</option>
                </select>
              </div>

              {/* Área */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Área (m²)</label>
                <input 
                  type="number" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2">
            {/* Cards Resumo */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-gray-600 mb-1">CUB Global</div>
                <div className="text-2xl font-bold text-green-600">{formatarMoeda(cubAtual)}</div>
                <div className="text-xs text-gray-500">por m²</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-600 mb-1">Custo Total</div>
                <div className="text-2xl font-bold text-blue-600">{formatarMoeda(custoTotal)}</div>
                <div className="text-xs text-gray-500">{area}m²</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">📈</div>
                <div className="text-sm text-gray-600 mb-1">Variação</div>
                <div className="text-2xl font-bold text-green-500">+2,3%</div>
                <div className="text-xs text-gray-500">vs mês anterior</div>
              </div>
            </div>

            {/* Tabela Detalhada */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Detalhamento por Serviço</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Serviço</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">%</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Valor/m²</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Total ({area}m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.map((servico, index) => {
                      const valorM2 = (cubAtual * servico.percentual) / 100;
                      const valorTotal = valorM2 * area;
                      
                      return (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{servico.emoji}</span>
                              <span className="font-medium">{servico.nome}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                              {servico.percentual}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right font-medium text-gray-800">
                            {formatarMoeda(valorM2)}
                          </td>
                          <td className="py-4 px-4 text-right font-bold text-green-600">
                            {formatarMoeda(valorTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td className="py-4 px-4 font-bold text-gray-800">TOTAL GERAL</td>
                      <td className="py-4 px-4 text-center font-bold">77%*</td>
                      <td className="py-4 px-4 text-right font-bold text-gray-800">{formatarMoeda(cubAtual)}</td>
                      <td className="py-4 px-4 text-right font-bold text-green-600">{formatarMoeda(custoTotal)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                * Os 23% restantes incluem estrutura, fundação e outros serviços não detalhados individualmente.
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3 text-xl">⚠️</div>
                <div>
                  <h4 className="text-lg font-bold text-yellow-800 mb-2">Importante</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Valores baseados no CUB oficial do Sinduscon-RO (Maio 2025)</li>
                    <li>• Não inclui: fundações especiais, elevadores, projetos, lucro do construtor</li>
                    <li>• Percentuais são estimativas baseadas em composições típicas</li>
                    <li>• Para orçamentos precisos, consulte um profissional qualificado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 