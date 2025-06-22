"use client";
import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaChartLine, FaBuilding, FaCalculator, FaInfoCircle } from "react-icons/fa";
import PageLayout, { PageCard } from "../../../components/PageLayout";

export default function CUBSinduscon2025Page() {
  return (
    <PageLayout 
      title="📊 CUB Sinduscon 2025"
      subtitle="Entenda os custos da construção civil em Porto Velho"
    >
      {/* Botão Voltar */}
      <div className="mb-6">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaArrowLeft />
          Voltar para o Blog
        </Link>
      </div>

      {/* Artigo Principal */}
      <PageCard>
        <div className="prose max-w-none">
          <div className="mb-8 text-center">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              Mercado
            </div>
            <h1 className="text-4xl font-bold cp-text-gradient mb-4">
              CUB Sinduscon: Entenda os Custos da Construção em 2025
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
              <span>📅 15 de Janeiro, 2025</span>
              <span>⏱️ 10 min de leitura</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800 font-medium">
              💡 <strong>Resumo:</strong> Análise completa do CUB (Custo Unitário Básico) 
              e como ele impacta os preços da construção civil em Porto Velho e região em 2025. 
              Descubra como usar essas informações nos seus orçamentos.
            </p>
          </div>

          <div className="space-y-8">
            {/* O que é CUB */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  O que é o CUB?
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                O CUB (Custo Unitário Básico) é um índice calculado mensalmente pelos 
                Sindicatos da Indústria da Construção Civil (Sinduscon) de cada estado. 
                Ele representa o custo por metro quadrado de construção.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">📋 Características do CUB:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Estabelecido pela Lei 4.591/64 e NBR 12.721</li>
                  <li>• Atualizado mensalmente</li>
                  <li>• Inclui materiais e mão de obra</li>
                  <li>• Base para financiamentos e contratos</li>
                </ul>
              </div>
            </div>

            {/* Valores 2025 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Valores CUB 2025 - Porto Velho/RO
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Confira os valores atualizados do CUB para diferentes tipos de construção 
                em Porto Velho, referência janeiro de 2025:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-800">🏠 Residencial</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• R1 (Popular): <strong>R$ 1.850,45/m²</strong></li>
                    <li>• R8 (Padrão): <strong>R$ 2.156,78/m²</strong></li>
                    <li>• R16 (Alto): <strong>R$ 2.489,32/m²</strong></li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-800">🏢 Comercial</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• CS8 (Salas): <strong>R$ 2.234,67/m²</strong></li>
                    <li>• CS16 (Lojas): <strong>R$ 2.567,89/m²</strong></li>
                    <li>• Galpões: <strong>R$ 1.678,23/m²</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Como usar */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaCalculator className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Como Usar o CUB nos Seus Orçamentos
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                O CUB é uma ferramenta poderosa para profissionais da construção. 
                Veja como aplicá-lo na prática:
              </p>
              
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">💼 Aplicações práticas:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Orçamentos rápidos:</strong> Multiplique a área pelo CUB correspondente</li>
                  <li>• <strong>Comparação de preços:</strong> Verifique se seu orçamento está na média</li>
                  <li>• <strong>Negociação:</strong> Use como base para justificar preços</li>
                  <li>• <strong>Planejamento:</strong> Estime custos de projetos futuros</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-800">⚠️ Importante:</h4>
                <p className="text-yellow-700">
                  O CUB é uma referência base. Seu orçamento pode variar +/- 20% dependendo 
                  de fatores como: localização, acabamentos especiais, complexidade da obra, 
                  e condições do terreno.
                </p>
              </div>
            </div>

            {/* Fatores que influenciam */}
            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaBuilding className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Fatores que Influenciam o CUB
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Entenda o que faz o CUB variar e como isso afeta seus projetos:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-red-800">📈 Fatores de Alta:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Aumento do preço do aço e cimento</li>
                    <li>• Valorização da mão de obra</li>
                    <li>• Inflação dos materiais</li>
                    <li>• Demanda aquecida</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-800">📉 Fatores de Baixa:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Redução de impostos</li>
                    <li>• Aumento da concorrência</li>
                    <li>• Melhoria na logística</li>
                    <li>• Novas tecnologias</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exemplo prático */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">💡 Exemplo Prático</h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold mb-2">Situação: Casa de 120m² padrão médio</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Tipo: R8 (Residencial padrão)</p>
                  <p>• CUB: R$ 2.156,78/m²</p>
                  <p>• Cálculo: 120m² × R$ 2.156,78</p>
                  <p className="text-lg font-bold text-green-600">• Custo estimado: R$ 258.813,60</p>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  *Valor base. Pode variar conforme acabamentos e localização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageCard>

      {/* CTA para Calculadora */}
      <PageCard className="text-center">
        <h3 className="text-2xl font-bold cp-text-gradient mb-4">
          🧮 Quer Calcular o CUB da Sua Obra?
        </h3>
        <p className="text-gray-600 mb-6">
          Use nossa calculadora gratuita com valores sempre atualizados do Sinduscon-RO
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/precos-cub"
            className="cp-button-primary"
          >
            Acessar Calculadora CUB
          </Link>
          <Link 
            href="/blog"
            className="cp-button-secondary"
          >
            Ver Mais Artigos
          </Link>
        </div>
      </PageCard>
    </PageLayout>
  );
} 