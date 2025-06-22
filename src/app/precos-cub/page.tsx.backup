"use client";
import React from "react";
import Link from "next/link";
import CalculadoraHeader from "../components/CalculadoraHeader";

export default function PrecosCUBPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Preços CUB - Sinduscon RO" bgColor="bg-blue-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-4">📊 Preços CUB - Sinduscon RO</h1>
            <p className="text-xl opacity-90 mb-2">Custo Unitário Básico - Maio 2025</p>
            <p className="text-lg opacity-80">Dados oficiais do Sinduscon de Rondônia</p>
          </div>
        </div>

        {/* Cards Principais */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card Residencial */}
          <Link href="/precos-cub/residencial" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-green-200 hover:border-green-400 transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🏠</div>
                <h2 className="text-2xl font-bold text-green-700 mb-4">Obras Residenciais</h2>
                <p className="text-gray-600 mb-6">
                  Calculadora para residências unifamiliares com diferentes padrões construtivos
                </p>
                <div className="space-y-2 text-sm text-green-600">
                  <div className="flex justify-between">
                    <span>Popular:</span>
                    <span className="font-bold">R$ 1.567,80/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Normal:</span>
                    <span className="font-bold">R$ 1.847,25/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alto Padrão:</span>
                    <span className="font-bold">R$ 2.234,60/m²</span>
                  </div>
                </div>
                <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full font-bold group-hover:bg-green-600 transition-colors">
                  Acessar Calculadora →
                </div>
              </div>
            </div>
          </Link>

          {/* Card Comercial */}
          <Link href="/precos-cub/comercial" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-blue-200 hover:border-blue-400 transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🏢</div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Obras Comerciais</h2>
                <p className="text-gray-600 mb-6">
                  Calculadora para edifícios comerciais com salas, lojas e andares livres
                </p>
                <div className="space-y-2 text-sm text-blue-600">
                  <div className="flex justify-between">
                    <span>CSL-8:</span>
                    <span className="font-bold">R$ 1.892,45/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CSL-16:</span>
                    <span className="font-bold">R$ 2.156,78/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CAL-8/16:</span>
                    <span className="font-bold">R$ 2.034,12/m²</span>
                  </div>
                </div>
                <div className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full font-bold group-hover:bg-blue-600 transition-colors">
                  Acessar Calculadora →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Seção de Dados Atuais */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📈 Dados Atuais - Maio 2025</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Valores Desonerados */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                <span className="mr-2">✅</span> Valores Desonerados
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Popular:</span>
                  <span className="font-bold text-green-600">R$ 1.567,80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Normal:</span>
                  <span className="font-bold text-green-600">R$ 1.847,25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Alto Padrão:</span>
                  <span className="font-bold text-green-600">R$ 2.234,60</span>
                </div>
              </div>
            </div>

            {/* Valores Onerados */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                <span className="mr-2">📊</span> Valores Onerados
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Popular:</span>
                  <span className="font-bold text-blue-600">R$ 1.623,45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Normal:</span>
                  <span className="font-bold text-blue-600">R$ 1.912,30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">R1 Alto Padrão:</span>
                  <span className="font-bold text-blue-600">R$ 2.315,85</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Link para Preços Detalhados */}
        <div className="text-center mb-8">
          <Link href="/precos-cub/detalhados" className="inline-block">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              📋 Ver Preços Detalhados por Serviço
            </div>
          </Link>
        </div>

        {/* Seção Educativa */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 O que é o CUB?</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-gray-700 mb-3">📖 Definição</h4>
              <p className="text-gray-600 mb-4">
                O CUB (Custo Unitário Básico) é um índice que representa o custo por metro quadrado 
                de construção, calculado mensalmente pelos Sinduscons de cada estado.
              </p>
              
              <h4 className="text-lg font-bold text-gray-700 mb-3">🎯 Como Usar</h4>
              <p className="text-gray-600">
                Multiplique o CUB pela área da construção para ter uma estimativa do custo total. 
                Use como base para orçamentos e financiamentos.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-700 mb-3">⚠️ O que NÃO inclui</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Fundações especiais</li>
                <li>• Elevadores e ar-condicionado</li>
                <li>• Projetos e aprovações</li>
                <li>• Lucro do construtor</li>
                <li>• Terreno e paisagismo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="text-yellow-400 mr-3 text-xl">⚠️</div>
            <div>
              <h4 className="text-lg font-bold text-yellow-800 mb-2">Importante</h4>
              <p className="text-yellow-700 text-sm">
                Os valores apresentados são baseados nos dados oficiais do Sinduscon-RO para maio de 2025. 
                Estes valores representam custos básicos e podem variar conforme especificações do projeto, 
                localização e condições de mercado. Sempre consulte um profissional para orçamentos precisos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 