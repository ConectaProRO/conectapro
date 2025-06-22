"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function CUBComercialPage() {
  const [tipoEdificio, setTipoEdificio] = useState("CSL-8");
  const [area, setArea] = useState(1000);
  const [unidades, setUnidades] = useState(20);

  // Valores CUB Comercial (R$/m²)
  const valoresCUB = {
    "CSL-8": 1892.45,   // Comercial Salas e Lojas - 8 pavimentos
    "CSL-16": 2156.78,  // Comercial Salas e Lojas - 16 pavimentos
    "CAL-8": 2034.12,   // Comercial Andares Livres - 8 pavimentos
    "CAL-16": 2034.12   // Comercial Andares Livres - 16 pavimentos
  };

  // Descrições dos tipos
  const descricoes = {
    "CSL-8": "Edifício comercial com salas e lojas de 8 pavimentos",
    "CSL-16": "Edifício comercial com salas e lojas de 16 pavimentos", 
    "CAL-8": "Edifício comercial com andares livres de 8 pavimentos",
    "CAL-16": "Edifício comercial com andares livres de 16 pavimentos"
  };

  // Percentuais por serviço (comercial)
  const servicos = [
    { nome: "Estrutura", emoji: "🏗️", percentual: 25 },
    { nome: "Alvenaria", emoji: "🧱", percentual: 12 },
    { nome: "Revestimentos", emoji: "🎨", percentual: 15 },
    { nome: "Elétrica", emoji: "⚡", percentual: 18 },
    { nome: "Hidráulica", emoji: "🚿", percentual: 8 },
    { nome: "Esquadrias", emoji: "🚪", percentual: 10 },
    { nome: "Cobertura", emoji: "🏢", percentual: 12 }
  ];

  const cubAtual = valoresCUB[tipoEdificio as keyof typeof valoresCUB];
  const custoTotal = cubAtual * area;
  const custoPorUnidade = custoTotal / unidades;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="CUB Comercial - Sinduscon RO" bgColor="bg-blue-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link href="/precos-cub" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar ao Menu CUB
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">🏢 Calculadora CUB Comercial</h1>
          <p className="text-gray-600">Calcule o custo de edifícios comerciais baseado no CUB oficial do Sinduscon-RO</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-blue-700 mb-6">⚙️ Configurações</h3>
              
              {/* Tipo de Edifício */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Edifício</label>
                <select 
                  value={tipoEdificio} 
                  onChange={(e) => setTipoEdificio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CSL-8">CSL-8 - Salas/Lojas 8 pav.</option>
                  <option value="CSL-16">CSL-16 - Salas/Lojas 16 pav.</option>
                  <option value="CAL-8">CAL-8 - Andares Livres 8 pav.</option>
                  <option value="CAL-16">CAL-16 - Andares Livres 16 pav.</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {descricoes[tipoEdificio as keyof typeof descricoes]}
                </p>
              </div>

              {/* Área Total */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Área Total (m²)</label>
                <input 
                  type="number" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  min="100"
                  step="50"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Número de Unidades */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Unidades</label>
                <input 
                  type="number" 
                  value={unidades} 
                  onChange={(e) => setUnidades(Number(e.target.value))}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Informações do Tipo Selecionado */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">Sobre {tipoEdificio}</h4>
                <p className="text-sm text-blue-700">
                  {tipoEdificio.startsWith('CSL') ? 
                    'Edifício com divisões internas para salas comerciais e lojas no térreo.' :
                    'Edifício com plantas livres, sem divisões internas pré-definidas.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2">
            {/* Cards Resumo */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-gray-600 mb-1">CUB {tipoEdificio}</div>
                <div className="text-xl font-bold text-blue-600">{formatarMoeda(cubAtual)}</div>
                <div className="text-xs text-gray-500">por m²</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-600 mb-1">Custo Total</div>
                <div className="text-xl font-bold text-green-600">{formatarMoeda(custoTotal)}</div>
                <div className="text-xs text-gray-500">{area.toLocaleString()}m²</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">🏪</div>
                <div className="text-sm text-gray-600 mb-1">Por Unidade</div>
                <div className="text-xl font-bold text-purple-600">{formatarMoeda(custoPorUnidade)}</div>
                <div className="text-xs text-gray-500">{unidades} unidades</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl mb-2">📏</div>
                <div className="text-sm text-gray-600 mb-1">Área/Unidade</div>
                <div className="text-xl font-bold text-orange-600">{(area/unidades).toFixed(1)}m²</div>
                <div className="text-xs text-gray-500">média</div>
              </div>
            </div>

            {/* Comparativo de Tipos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">📈 Comparativo de Tipos</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(valoresCUB).map(([tipo, valor]) => (
                  <div key={tipo} className={`p-4 rounded-lg border-2 ${
                    tipo === tipoEdificio ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-800">{tipo}</h4>
                        <p className="text-sm text-gray-600">{descricoes[tipo as keyof typeof descricoes]}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{formatarMoeda(valor)}</div>
                        <div className="text-xs text-gray-500">por m²</div>
                      </div>
                    </div>
                    {tipo === tipoEdificio && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">✓ Selecionado</div>
                    )}
                  </div>
                ))}
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
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Total ({area.toLocaleString()}m²)</th>
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
                          <td className="py-4 px-4 text-right font-bold text-blue-600">
                            {formatarMoeda(valorTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td className="py-4 px-4 font-bold text-gray-800">TOTAL GERAL</td>
                      <td className="py-4 px-4 text-center font-bold">100%</td>
                      <td className="py-4 px-4 text-right font-bold text-gray-800">{formatarMoeda(cubAtual)}</td>
                      <td className="py-4 px-4 text-right font-bold text-blue-600">{formatarMoeda(custoTotal)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Diferenças CSL vs CAL */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Diferenças entre Tipos</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-blue-700 mb-3">🏪 CSL - Salas e Lojas</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Divisões internas pré-definidas</li>
                    <li>• Salas comerciais nos andares superiores</li>
                    <li>• Lojas no pavimento térreo</li>
                    <li>• Maior número de instalações</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-purple-700 mb-3">🏢 CAL - Andares Livres</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Plantas livres sem divisões</li>
                    <li>• Flexibilidade de layout</li>
                    <li>• Menor densidade de instalações</li>
                    <li>• Ideal para escritórios corporativos</li>
                  </ul>
                </div>
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
                    <li>• Não inclui: elevadores, ar-condicionado, projetos, lucro do incorporador</li>
                    <li>• Percentuais são estimativas baseadas em composições típicas para edifícios comerciais</li>
                    <li>• Para empreendimentos comerciais, consulte sempre um profissional especializado</li>
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