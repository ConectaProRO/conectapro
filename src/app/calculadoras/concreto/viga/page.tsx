"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../../components/CalculadoraHeader";

// Dados SINAPI baseados na imagem fornecida - AF_09/2020 (05/2025)
const dadosSINAPI = {
  formasViga: {
    codigo: "AF_09/2020",
    descricao: "FABRICAÇÃO DE FÔRMA PARA VIGAS, COM MADEIRA SERRADA, E = 25 MM",
    unidade: "m²",
    tipo: "Formas para Estruturas de Concreto Armado",
    valorNaoDesonerado: 174.74,
    valorDesonerado: 171.59,
    composicao: [
      {
        codigo: "88239",
        descricao: "AJUDANTE DE CARPINTEIRO COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H",
        coeficiente: 0.179,
        valorUnitario: 27.48,
        valorDesonerado: 25.34,
        valorNaoDesonerado: 4.91,
        valorDesoneradoTotal: 4.53
      },
      {
        codigo: "88262", 
        descricao: "CARPINTEIRO DE FORMAS COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H", 
        coeficiente: 0.792,
        valorUnitario: 29.80,
        valorDesonerado: 27.41,
        valorNaoDesonerado: 23.60,
        valorDesoneradoTotal: 21.70
      },
      {
        codigo: "91693",
        descricao: "SERRA CIRCULAR DE BANCADA COM MOTOR ELÉTRICO POTÊNCIA DE 5HP",
        tipo: "Equipamento",
        unidade: "CHI",
        coeficiente: 0.224,
        valorUnitario: 35.82,
        valorDesonerado: 32.69,
        valorNaoDesonerado: 8.02,
        valorDesoneradoTotal: 7.32
      },
      {
        codigo: "91692",
        descricao: "SERRA CIRCULAR DE BANCADA COM MOTOR ELÉTRICO POTÊNCIA DE 5HP", 
        tipo: "Equipamento",
        unidade: "CHP",
        coeficiente: 0.056,
        valorUnitario: 38.03,
        valorDesonerado: 34.90,
        valorNaoDesonerado: 2.12,
        valorDesoneradoTotal: 1.95
      },
      {
        codigo: "0005068",
        descricao: "PREGO DE AÇO POLIDO COM CABEÇA 17 X 21 (2 X 11)",
        tipo: "Material",
        unidade: "KG",
        coeficiente: 0.128,
        valorUnitario: 18.64,
        valorDesonerado: 18.64,
        valorNaoDesonerado: 2.38,
        valorDesoneradoTotal: 2.38
      },
      {
        codigo: "0004517",
        descricao: "SARRAFO 2,5 X 7,5 CM EM PINUS - BRUTA",
        tipo: "Material",
        unidade: "M",
        coeficiente: 4.228,
        valorUnitario: 2.38,
        valorDesonerado: 2.38,
        valorNaoDesonerado: 10.06,
        valorDesoneradoTotal: 10.06
      },
      {
        codigo: "0006189",
        descricao: "TÁBUA NÃO APARELHADA 2,5 X 30 CM, EM MACARANDUBA/MASSARANDUBA/ANGELIM - BRUTA",
        tipo: "Material",
        unidade: "M",
        coeficiente: 4.448,
        valorUnitario: 27.80,
        valorDesonerado: 27.80,
        valorNaoDesonerado: 123.65,
        valorDesoneradoTotal: 123.65
      }
    ]
  }
};

export default function VigaCalculadora() {
  const [dimensoes, setDimensoes] = useState({
    largura: '',
    altura: '',
    comprimento: '',
    quantidade: 1,
    tipoDesonerado: 'naoDesonerado'
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const largura = parseFloat(dimensoes.largura) || 0;
    const altura = parseFloat(dimensoes.altura) || 0;
    const comprimento = parseFloat(dimensoes.comprimento) || 0;
    const quantidade = parseInt(dimensoes.quantidade.toString()) || 1;

    if (largura <= 0 || altura <= 0 || comprimento <= 0) {
      alert('Por favor, preencha todas as dimensões com valores válidos.');
      return;
    }

    // Cálculo da área de formas para vigas
    // Área = (2 × altura + largura) × comprimento × quantidade
    const areaFormasPorViga = (2 * altura + largura) * comprimento;
    const areaFormasTotal = areaFormasPorViga * quantidade;

    // Valor por m² baseado no tipo (desonerado ou não)
    const valorUnitario = dimensoes.tipoDesonerado === 'desonerado' 
      ? dadosSINAPI.formasViga.valorDesonerado 
      : dadosSINAPI.formasViga.valorNaoDesonerado;

    const valorTotal = areaFormasTotal * valorUnitario;

    // Calcular composição detalhada
    const composicaoDetalhada = dadosSINAPI.formasViga.composicao.map(item => {
      const valorItem = dimensoes.tipoDesonerado === 'desonerado' 
        ? item.valorDesoneradoTotal 
        : item.valorNaoDesonerado;
      
      return {
        ...item,
        quantidadeTotal: item.coeficiente * areaFormasTotal,
        valorTotalItem: valorItem * areaFormasTotal
      };
    });

    setResultado({
      dimensoes: {
        largura,
        altura,
        comprimento,
        quantidade,
        areaFormasPorViga: areaFormasPorViga.toFixed(2),
        areaFormasTotal: areaFormasTotal.toFixed(2)
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
      altura: '',
      comprimento: '',
      quantidade: 1,
      tipoDesonerado: 'naoDesonerado'
    });
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader 
        title="Calculadora de Viga (Formas)" 
        bgColor="bg-blue-600/90" 
      />
      
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-start">
              <div className="text-blue-600 text-xl mr-3">📋</div>
              <div>
                <h3 className="font-bold text-blue-800 mb-1">Composição SINAPI - {dadosSINAPI.formasViga.codigo}</h3>
                <p className="text-blue-700 text-sm">
                  {dadosSINAPI.formasViga.descricao}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  {dadosSINAPI.formasViga.tipo}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="font-semibold">Não Desonerado:</span> R$ {dadosSINAPI.formasViga.valorNaoDesonerado.toFixed(2)}/m²
                  </div>
                  <div>
                    <span className="font-semibold">Desonerado:</span> R$ {dadosSINAPI.formasViga.valorDesonerado.toFixed(2)}/m²
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏗️ Calculadora de Viga (Formas)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                📐 Dimensões da Viga
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 0.20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dimensoes.altura}
                    onChange={(e) => setDimensoes({...dimensoes, altura: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 0.40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprimento (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dimensoes.comprimento}
                    onChange={(e) => setDimensoes({...dimensoes, comprimento: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 6.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={dimensoes.quantidade}
                    onChange={(e) => setDimensoes({...dimensoes, quantidade: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Valor SINAPI
                </label>
                <select
                  value={dimensoes.tipoDesonerado}
                  onChange={(e) => setDimensoes({...dimensoes, tipoDesonerado: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="naoDesonerado">Não Desonerado (R$ 174,74/m²)</option>
                  <option value="desonerado">Desonerado (R$ 171,59/m²)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={calcular}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                  <span className="text-blue-600">•</span>
                  <span><strong>Aplicação:</strong> Vigas em concreto armado</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Material:</strong> Madeira serrada, espessura 25mm</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Madeira:</strong> Macaranduba/Massaranduba/Angelim</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Cálculo:</strong> Área = (2×altura + largura) × comprimento</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Região:</strong> Porto Velho - RO (SINAPI 05/2025)</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Composição Inclui:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Mão de obra especializada (carpinteiro + ajudante)</li>
                  <li>• Equipamentos (serra circular 5HP)</li>
                  <li>• Materiais (madeira nobre, sarrafos, pregos)</li>
                  <li>• Encargos sociais e BDI</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">⚠️ Observação:</h4>
                <p className="text-xs text-yellow-700">
                  Esta composição é apenas para fabricação de formas. Não inclui montagem, desmontagem ou concreto.
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
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-3">📐 Dimensões</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Largura:</span>
                    <span className="font-medium">{resultado.dimensoes.largura}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Altura:</span>
                    <span className="font-medium">{resultado.dimensoes.altura}m</span>
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
                    <span>Área por Viga:</span>
                    <span className="font-medium">{resultado.dimensoes.areaFormasPorViga}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Área Total:</span>
                    <span className="font-bold">{resultado.dimensoes.areaFormasTotal}m²</span>
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
                  <p>• Inclui mão de obra especializada</p>
                  <p>• Materiais e equipamentos inclusos</p>
                  <p>• Apenas fabricação de formas</p>
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