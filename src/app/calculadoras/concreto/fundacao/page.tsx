"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../../components/CalculadoraHeader";

export const metadata = {
  title: "Calculadora de Fundação (Sapatas) SINAPI - Porto Velho | ConectaPro",
  description: "Calcule materiais e mão de obra para fundações rasas (sapatas, blocos, vigas baldrame) baseado na tabela SINAPI 2025. Valores atualizados para Porto Velho-RO!",
  keywords: "calculadora fundacao, sapata concreto, blocos fundacao, vigas baldrame, sinapi rondonia, orcamento fundacao",
};

// Dados SINAPI baseados na imagem fornecida - AF_01/2024 (05/2025)
const dadosSINAPI = {
  formasSapata: {
    codigo: "AF_01/2024",
    descricao: "FABRICAÇÃO, MONTAGEM E DESMONTAGEM DE FORMA PARA SAPATA, EM MADEIRA SERRADA, E=25 MM, 2 UTILIZAÇÕES",
    unidade: "m²",
    valorNaoDesonerado: 180.21,
    valorDesonerado: 169.36,
    composicao: [
      {
        codigo: "88239",
        descricao: "AJUDANTE DE CARPINTEIRO COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H",
        coeficiente: 1.17,
        valorUnitario: 32.15,
        valorTotal: 29.64
      },
      {
        codigo: "88262", 
        descricao: "CARPINTEIRO DE FORMAS COM ENCARGOS COMPLEMENTARES",
        tipo: "Mão de obra",
        unidade: "H", 
        coeficiente: 2.6,
        valorUnitario: 77.48,
        valorTotal: 71.26
      },
      {
        codigo: "91693",
        descricao: "SERRA CIRCULAR DE BANCADA COM MOTOR ELÉTRICO POTÊNCIA DE 5HP",
        tipo: "Equipamento",
        unidade: "CHI",
        coeficiente: 0.543,
        valorUnitario: 19.45,
        valorTotal: 17.75
      },
      {
        codigo: "91692",
        descricao: "SERRA CIRCULAR DE BANCADA COM MOTOR ELÉTRICO POTÊNCIA DE 5HP", 
        tipo: "Equipamento",
        unidade: "CHP",
        coeficiente: 0.135,
        valorUnitario: 5.13,
        valorTotal: 4.71
      },
      {
        codigo: "0002692",
        descricao: "DESMOLDANTE PROTETOR PARA FORMAS DE MADEIRA",
        tipo: "Material",
        unidade: "L",
        coeficiente: 0.0167,
        valorUnitario: 0.15,
        valorTotal: 0.15
      },
      {
        codigo: "0005074",
        descricao: "PREGO DE AÇO POLIDO COM CABEÇA 15 X 18",
        tipo: "Material", 
        unidade: "KG",
        coeficiente: 0.009,
        valorUnitario: 0.18,
        valorTotal: 0.18
      },
      {
        codigo: "0005073",
        descricao: "PREGO DE AÇO POLIDO COM CABEÇA 17 X 24",
        tipo: "Material",
        unidade: "KG", 
        coeficiente: 0.073,
        valorUnitario: 1.38,
        valorTotal: 1.38
      },
      {
        codigo: "0040304",
        descricao: "PREGO DE AÇO POLIDO COM CABEÇA DUPLA 17 X 27",
        tipo: "Material",
        unidade: "KG",
        coeficiente: 0.047,
        valorUnitario: 1.08,
        valorTotal: 1.08
      },
      {
        codigo: "0004517",
        descricao: "SARRAFO 2,5 X 7,5 CM EM PINUS - BRUTA",
        tipo: "Material",
        unidade: "M",
        coeficiente: 6.955,
        valorUnitario: 16.55,
        valorTotal: 16.55
      },
      {
        codigo: "0006212",
        descricao: "TÁBUA 2,5 X 30 CM EM PINUS - BRUTA",
        tipo: "Material",
        unidade: "M",
        coeficiente: 2.364,
        valorUnitario: 26.66,
        valorTotal: 26.66
      }
    ]
  }
};

export default function FundacaoCalculadora() {
  const [dimensoes, setDimensoes] = useState({
    largura: '',
    comprimento: '',
    altura: '',
    quantidade: 1,
    tipoDesonerado: 'naoDesonerado'
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const largura = parseFloat(dimensoes.largura) || 0;
    const comprimento = parseFloat(dimensoes.comprimento) || 0;
    const altura = parseFloat(dimensoes.altura) || 0;
    const quantidade = parseInt(dimensoes.quantidade.toString()) || 1;

    if (largura <= 0 || comprimento <= 0 || altura <= 0) {
      alert('Por favor, preencha todas as dimensões com valores válidos.');
      return;
    }

    // Cálculo da área de formas (perímetro × altura × quantidade)
    const perimetro = 2 * (largura + comprimento);
    const areaFormas = perimetro * altura * quantidade;

    // Valor por m² baseado no tipo (desonerado ou não)
    const valorUnitario = dimensoes.tipoDesonerado === 'desonerado' 
      ? dadosSINAPI.formasSapata.valorDesonerado 
      : dadosSINAPI.formasSapata.valorNaoDesonerado;

    const valorTotal = areaFormas * valorUnitario;

    // Calcular composição detalhada
    const composicaoDetalhada = dadosSINAPI.formasSapata.composicao.map(item => ({
      ...item,
      quantidadeTotal: item.coeficiente * areaFormas,
      valorTotalItem: item.valorTotal * areaFormas
    }));

    setResultado({
      dimensoes: {
        largura,
        comprimento, 
        altura,
        quantidade,
        perimetro,
        areaFormas: areaFormas.toFixed(2)
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
      altura: '',
      quantidade: 1,
      tipoDesonerado: 'naoDesonerado'
    });
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader 
        title="Calculadora de Fundação (Sapatas)" 
        bgColor="bg-amber-600/90" 
      />
      
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <div className="flex items-start">
              <div className="text-amber-600 text-xl mr-3">📋</div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">Composição SINAPI - {dadosSINAPI.formasSapata.codigo}</h3>
                <p className="text-amber-700 text-sm">
                  {dadosSINAPI.formasSapata.descricao}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="font-semibold">Não Desonerado:</span> R$ {dadosSINAPI.formasSapata.valorNaoDesonerado.toFixed(2)}/m²
                  </div>
                  <div>
                    <span className="font-semibold">Desonerado:</span> R$ {dadosSINAPI.formasSapata.valorDesonerado.toFixed(2)}/m²
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏗️ Calculadora de Fundação (Sapatas)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                📐 Dimensões da Sapata
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ex: 1.20"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ex: 1.20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dimensoes.altura}
                    onChange={(e) => setDimensoes({...dimensoes, altura: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ex: 0.60"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="naoDesonerado">Não Desonerado (R$ 180,21/m²)</option>
                  <option value="desonerado">Desonerado (R$ 169,36/m²)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={calcular}
                  className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
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
                  <span className="text-amber-600">•</span>
                  <span><strong>Aplicação:</strong> Fundações rasas (sapatas, blocos)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Material:</strong> Madeira serrada, espessura 25mm</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Utilizações:</strong> 2 utilizações da forma</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Inclui:</strong> Fabricação, montagem e desmontagem</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Região:</strong> Porto Velho - RO (SINAPI 05/2025)</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">📊 Composição Inclui:</h4>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Mão de obra especializada (carpinteiro + ajudante)</li>
                  <li>• Equipamentos (serra circular)</li>
                  <li>• Materiais (madeira, pregos, desmoldante)</li>
                  <li>• Encargos sociais e BDI</li>
                </ul>
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
                    <span>Comprimento:</span>
                    <span className="font-medium">{resultado.dimensoes.comprimento}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Altura:</span>
                    <span className="font-medium">{resultado.dimensoes.altura}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantidade:</span>
                    <span className="font-medium">{resultado.dimensoes.quantidade}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Área de Formas:</span>
                    <span className="font-bold">{resultado.dimensoes.areaFormas}m²</span>
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
                  <p>• Forma reutilizável (2 utilizações)</p>
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
                      <th className="text-right py-2">Valor Unit.</th>
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
                        <td className="py-2 text-right">R$ {item.valorUnitario.toFixed(2)}</td>
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