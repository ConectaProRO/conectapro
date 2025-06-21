"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCalculator, FaArrowLeft, FaInfoCircle, FaDownload } from "react-icons/fa";
import CalculadoraHeader from "../../../components/CalculadoraHeader";

export default function CalculadoraPilar() {
  const [largura, setLargura] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [comprimento, setComprimento] = useState<string>("");
  const [desonerado, setDesonerado] = useState<boolean>(false);
  const [resultado, setResultado] = useState<{
    areaFormas: number;
    custoTotal: number;
    valorUnitario: number;
  } | null>(null);

  // Valores SINAPI AF_09/2020 - Rondônia 05/2025
  const valorNaoDesonerado = 171.50;
  const valorDesonerado = 166.08;

  const calcular = () => {
    const larguraNum = parseFloat(largura);
    const alturaNum = parseFloat(altura);
    const comprimentoNum = parseFloat(comprimento);

    if (larguraNum <= 0 || alturaNum <= 0 || comprimentoNum <= 0) {
      alert("Por favor, insira valores válidos maiores que zero.");
      return;
    }

    // Área de formas = perímetro × altura
    // Perímetro = 2 × (largura + comprimento)
    const perimetro = 2 * (larguraNum + comprimentoNum);
    const areaFormas = perimetro * alturaNum;
    
    const valorUnitario = desonerado ? valorDesonerado : valorNaoDesonerado;
    const custoTotal = areaFormas * valorUnitario;

    setResultado({
      areaFormas,
      custoTotal,
      valorUnitario
    });
  };

  const limpar = () => {
    setLargura("");
    setAltura("");
    setComprimento("");
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <CalculadoraHeader 
        title="Calculadora de Pilares - Montagem e desmontagem de formas"
        bgColor="bg-purple-600/90"
      />

      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Navegação */}
        <div className="mb-6">
          <Link 
            href="/calculadoras/concreto" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para Concreto
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCalculator className="text-purple-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dados do Pilar</h2>
                <p className="text-gray-600 text-sm">Insira as dimensões em metros</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Largura (m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={largura}
                  onChange={(e) => setLargura(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: 0.20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comprimento (m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={comprimento}
                  onChange={(e) => setComprimento(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: 0.30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: 3.00"
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={desonerado}
                    onChange={(e) => setDesonerado(e.target.checked)}
                    className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Usar valor desonerado (sem INSS)
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={calcular}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Calcular
                </button>
                <button
                  onClick={limpar}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCalculator className="text-purple-600" />
                  Resultado
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-purple-600 font-medium">Área de Formas</div>
                    <div className="text-2xl font-bold text-purple-800">
                      {resultado.areaFormas.toFixed(2)} m²
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Custo Total</div>
                    <div className="text-3xl font-bold text-green-800">
                      R$ {resultado.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                    <strong>Valor unitário:</strong> R$ {resultado.valorUnitario.toFixed(2)}/m² 
                    ({desonerado ? 'desonerado' : 'não desonerado'})
                    <br />
                    <strong>Cálculo:</strong> Perímetro (2×{largura || '0'}+2×{comprimento || '0'}) × Altura ({altura || '0'}) = {resultado.areaFormas.toFixed(2)} m²
                  </div>
                </div>
              </div>
            )}

            {/* Informações Técnicas */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-purple-600" />
                Informações Técnicas
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-purple-600">Serviço:</strong> Montagem e desmontagem de forma para pilares retangulares
                </div>
                <div>
                  <strong className="text-purple-600">Material:</strong> Chapa de madeira compensada resinada, 2 utilizações
                </div>
                <div>
                  <strong className="text-purple-600">Código SINAPI:</strong> AF_09/2020
                </div>
                <div>
                  <strong className="text-purple-600">Referência:</strong> SINAPI Rondônia 05/2025
                </div>
                <div>
                  <strong className="text-purple-600">Unidade:</strong> m² (metro quadrado de forma)
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-purple-700">
                  <strong>Composição inclui:</strong> Ajudante de carpinteiro, carpinteiro de formas, 
                  fabricação de forma para pilares, desmoldante protetor, locação de equipamentos 
                  (aprumador metálico, barra de ancoragem, viga sanduíche metálica) e prego de aço.
                </div>
              </div>
            </div>

            {/* Dica Profissional */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6">
              <h3 className="font-bold mb-3">💡 Dica Profissional</h3>
              <p className="text-sm mb-4">
                O cálculo considera montagem completa + desmontagem das formas. 
                Para pilares com seção diferente, ajuste as dimensões conforme o projeto.
              </p>
              <Link 
                href="/buscar-profissional"
                className="inline-flex items-center bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
              >
                Encontrar Profissional Especializado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 