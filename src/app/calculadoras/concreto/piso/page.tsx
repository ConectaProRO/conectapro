"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../../components/CalculadoraHeader";

// Dados SINAPI baseados na imagem fornecida - AF_08/2022 (05/2025)
const dadosSINAPI = {
  pisoConcreto: {
    codigo: "AF_08/2022",
    descricao: "EXECUÇÃO DE PASSEIO (CALÇADA) OU PISO DE CONCRETO COM CONCRETO MOLDADO IN LOCO, FEITO EM OBRA, ACABAMENTO CONVENCIONAL, ESPESSURA 6 CM, ARMADO",
    unidade: "m²",
    tipo: "Passeios de Concreto",
    valorNaoDesonerado: 103.54,
    valorDesonerado: 101.85,
    composicao: [
      {
        codigo: "88262",
        descricao: "CARPINTEIRO DE FORMAS COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H",
        coeficiente: 0.0976,
        valorUnitario: 29.80,
        valorDesonerado: 27.41,
        valorNaoDesonerado: 2.90,
        valorDesoneradoTotal: 2.67
      },
      {
        codigo: "94964",
        descricao: "CONCRETO FCK = 20MPA, TRAÇO 1:2:3 - PREPARO MECÂNICO COM BETONEIRA 400 L",
        tipo: "Produção de Concreto",
        unidade: "m³",
        coeficiente: 0.0739,
        valorUnitario: 692.77,
        valorDesonerado: 684.50,
        valorNaoDesonerado: 51.19,
        valorDesoneradoTotal: 50.58
      },
      {
        codigo: "88309",
        descricao: "PEDREIRO COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H",
        coeficiente: 0.1483,
        valorUnitario: 30.21,
        valorDesonerado: 27.80,
        valorNaoDesonerado: 4.48,
        valorDesoneradoTotal: 4.12
      },
      {
        codigo: "88316",
        descricao: "SERVENTE COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H",
        coeficiente: 0.2459,
        valorUnitario: 25.95,
        valorDesonerado: 23.98,
        valorNaoDesonerado: 6.38,
        valorDesoneradoTotal: 5.89
      },
      {
        codigo: "0005068",
        descricao: "PREGO DE AÇO POLIDO COM CABEÇA 17 X 21 (2 X 11)",
        tipo: "Material",
        unidade: "KG",
        coeficiente: 0.024,
        valorUnitario: 18.64,
        valorDesonerado: 18.64,
        valorNaoDesonerado: 0.44,
        valorDesoneradoTotal: 0.44
      },
      {
        codigo: "0004517",
        descricao: "SARRAFO 2,5 X 7,5 CM EM PINUS - BRUTA",
        tipo: "Material",
        unidade: "M",
        coeficiente: 0.45,
        valorUnitario: 2.38,
        valorDesonerado: 2.38,
        valorNaoDesonerado: 1.07,
        valorDesoneradoTotal: 1.07
      },
      {
        codigo: "0007156",
        descricao: "TELA DE AÇO SOLDADA NERVURADA, CA-60, Q-196, DIÂMETRO DO FIO = 5,0 MM",
        tipo: "Material",
        unidade: "m²",
        coeficiente: 1.0816,
        valorUnitario: 34.29,
        valorDesonerado: 34.29,
        valorNaoDesonerado: 37.08,
        valorDesoneradoTotal: 37.08
      }
    ]
  }
};

export default function PisoCalculadora() {
  const [dimensoes, setDimensoes] = useState({
    largura: '',
    comprimento: '',
    quantidade: 1,
    tipoDesonerado: 'naoDesonerado'
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const largura = parseFloat(dimensoes.largura) || 0;
    const comprimento = parseFloat(dimensoes.comprimento) || 0;
    const quantidade = parseInt(dimensoes.quantidade.toString()) || 1;

    if (largura <= 0 || comprimento <= 0) {
      alert('Por favor, preencha todas as dimensões com valores válidos.');
      return;
    }

    // Cálculo da área total
    const areaPorPiso = largura * comprimento;
    const areaTotal = areaPorPiso * quantidade;

    // Valor por m² baseado no tipo (desonerado ou não)
    const valorUnitario = dimensoes.tipoDesonerado === 'desonerado' 
      ? dadosSINAPI.pisoConcreto.valorDesonerado 
      : dadosSINAPI.pisoConcreto.valorNaoDesonerado;

    const valorTotal = areaTotal * valorUnitario;

    // Calcular composição detalhada
    const composicaoDetalhada = dadosSINAPI.pisoConcreto.composicao.map(item => {
      const valorItem = dimensoes.tipoDesonerado === 'desonerado' 
        ? item.valorDesoneradoTotal 
        : item.valorNaoDesonerado;
      
      return {
        ...item,
        quantidadeTotal: item.coeficiente * areaTotal,
        valorTotalItem: valorItem * areaTotal
      };
    });

    setResultado({
      dimensoes: {
        largura,
        comprimento,
        quantidade,
        areaPorPiso: areaPorPiso.toFixed(2),
        areaTotal: areaTotal.toFixed(2)
      },
      custos: {
        valorUnitario: valorUnitario.toFixed(2),
        valorTotal: valorTotal.toFixed(2),
        tipoValor: dimensoes.tipoDesonerado === 'desonerado' ? 'Desonerado' : 'Não Desonerado'
      },
      composicao: composicaoDetalhada
    });
  };

  const limpar = () => {
    setDimensoes({
      largura: '',
      comprimento: '',
      quantidade: 1,
      tipoDesonerado: 'naoDesonerado'
    });
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader 
        title="Calculadora de Piso de Concreto" 
        bgColor="bg-slate-600/90" 
      />
      
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="bg-slate-50 border-l-4 border-slate-500 p-4 mb-6">
            <div className="flex items-start">
              <div className="text-slate-600 text-xl mr-3">📋</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Composição SINAPI - {dadosSINAPI.pisoConcreto.codigo}</h3>
                <p className="text-slate-700 text-sm">
                  {dadosSINAPI.pisoConcreto.descricao}
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  {dadosSINAPI.pisoConcreto.tipo}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="font-semibold">Não Desonerado:</span> R$ {dadosSINAPI.pisoConcreto.valorNaoDesonerado.toFixed(2)}/m²
                  </div>
                  <div>
                    <span className="font-semibold">Desonerado:</span> R$ {dadosSINAPI.pisoConcreto.valorDesonerado.toFixed(2)}/m²
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏢 Calculadora de Piso de Concreto
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                📐 Dimensões do Piso
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Largura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dimensoes.largura}
                    onChange={(e) => setDimensoes({...dimensoes, largura: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Ex: 3.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprimento (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dimensoes.comprimento}
                    onChange={(e) => setDimensoes({...dimensoes, comprimento: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Ex: 10.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={dimensoes.quantidade}
                    onChange={(e) => setDimensoes({...dimensoes, quantidade: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Valor SINAPI
                  </label>
                  <select
                    value={dimensoes.tipoDesonerado}
                    onChange={(e) => setDimensoes({...dimensoes, tipoDesonerado: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="naoDesonerado">Não Desonerado (R$ 103,54/m²)</option>
                    <option value="desonerado">Desonerado (R$ 101,85/m²)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={calcular}
                  className="flex-1 bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  🧮 Calcular
                </button>
                <button
                  onClick={limpar}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  🗑️ Limpar
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                💡 Informações Técnicas
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Aplicação:</strong> Passeios (calçadas) e pisos de concreto</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Concreto:</strong> FCK = 20MPa, traço 1:2:3</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Espessura:</strong> 6 cm</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Armadura:</strong> Tela soldada Q-196 (5,0mm)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Acabamento:</strong> Convencional</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span><strong>Região:</strong> Porto Velho - RO (SINAPI 05/2025)</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">📊 Composição Inclui:</h4>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• Mão de obra (carpinteiro, pedreiro, servente)</li>
                  <li>• Concreto FCK 20MPa moldado in loco</li>
                  <li>• Tela de aço soldada Q-196</li>
                  <li>• Materiais auxiliares (sarrafos, pregos)</li>
                  <li>• Encargos sociais e BDI</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1 text-sm">✅ Serviço Completo:</h4>
                <p className="text-xs text-green-700">
                  Inclui execução completa do piso: formas, armadura, concretagem e acabamento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📊 Resultado do Orçamento
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-3">📐 Dimensões</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Largura:</span>
                    <span className="font-medium">{resultado.dimensoes.largura}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comprimento:</span>
                    <span className="font-medium">{resultado.dimensoes.comprimento}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantidade:</span>
                    <span className="font-medium">{resultado.dimensoes.quantidade}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Área por Piso:</span>
                    <span className="font-medium">{resultado.dimensoes.areaPorPiso}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Área Total:</span>
                    <span className="font-bold">{resultado.dimensoes.areaTotal}m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-3">💰 Custos</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="font-medium">{resultado.custos.tipoValor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor/m²:</span>
                    <span className="font-medium">R$ {resultado.custos.valorUnitario}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-green-700">R$ {resultado.custos.valorTotal}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-semibold text-amber-800 mb-3">ℹ️ Observações</h4>
                <div className="space-y-2 text-xs text-amber-700">
                  <p>• Valores baseados na tabela SINAPI vigente</p>
                  <p>• Inclui execução completa do piso</p>
                  <p>• Concreto FCK 20MPa com tela soldada</p>
                  <p>• Espessura padrão de 6 cm</p>
                </div>
              </div>
            </div>

            {/* Composição detalhada */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">🔍 Composição Detalhada</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2">Código</th>
                      <th className="text-left py-2">Descrição</th>
                      <th className="text-left py-2">Tipo</th>
                      <th className="text-center py-2">Unid.</th>
                      <th className="text-right py-2">Coef.</th>
                      <th className="text-right py-2">Quant. Total</th>
                      <th className="text-right py-2">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.composicao.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-white">
                        <td className="py-2 font-mono text-xs">{item.codigo}</td>
                        <td className="py-2 text-xs">{item.descricao}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.tipo === 'Mão de obra' ? 'bg-blue-100 text-blue-800' :
                            item.tipo === 'Material' ? 'bg-green-100 text-green-800' :
                            item.tipo === 'Produção de Concreto' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.tipo}
                          </span>
                        </td>
                        <td className="py-2 text-center">{item.unidade}</td>
                        <td className="py-2 text-right">{item.coeficiente}</td>
                        <td className="py-2 text-right">{item.quantidadeTotal.toFixed(3)}</td>
                        <td className="py-2 text-right font-semibold">R$ {item.valorTotalItem.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link 
            href="/calculadoras/concreto"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Voltar para Calculadoras de Concreto
          </Link>
        </div>
      </div>
    </div>
  );
} 