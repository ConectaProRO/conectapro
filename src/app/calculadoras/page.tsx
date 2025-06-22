"use client";
import React from "react";
import Link from "next/link";
import { FaHammer, FaPaintBrush, FaPlug, FaHome, FaCubes, FaCalculator } from "react-icons/fa";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

export default function CalculadorasPage() {
  const calculadoras = [
    { href: "/calculadoras/concreto", icon: FaCubes, nome: "Concreto", cor: "bg-orange-500" },
    { href: "/calculadoras/piso", icon: FaCubes, nome: "Piso", cor: "bg-purple-500" },
    { href: "/calculadoras/parede", icon: FaHammer, nome: "Parede", cor: "bg-red-500" },
    { href: "/calculadoras/instalacoes", icon: FaPlug, nome: "Instalações", cor: "bg-yellow-500" },
    { href: "/calculadoras/pintura", icon: FaPaintBrush, nome: "Pintura", cor: "bg-green-500" },
    { href: "/calculadoras/forro-gesso", icon: FaHome, nome: "Forro de Gesso", cor: "bg-blue-500" },
  ];

  return (
    <PageLayout 
      title="🧮 Calculadoras de Construção"
      subtitle="Ferramentas precisas para orçamento e planejamento de obras"
    >
      {/* Calculadoras Disponíveis */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">
            <FaCalculator className="inline mr-3" />
            Calculadoras Disponíveis
          </h2>
          <p className="text-xl text-gray-600">
            Escolha a calculadora que você precisa para seu projeto
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {calculadoras.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link key={calc.href} href={calc.href} className="group">
                <div className="cp-bg-figma-light rounded-2xl p-6 text-center cp-border-figma hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className={`${calc.cor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                    <IconComponent className="text-white text-2xl" />
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Ativo
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{calc.nome}</h3>
                  <p className="text-gray-600 text-sm">Calcular materiais e custos</p>
                </div>
              </Link>
            );
          })}
        </div>
      </PageCard>

      {/* Informações sobre as calculadoras */}
      <PageCard>
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold cp-text-gradient mb-4">
            📊 Sobre as Calculadoras ConectaPro
          </h3>
          <p className="text-xl text-gray-600">
            Desenvolvidas com base em dados técnicos confiáveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="cp-bg-figma-light rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <h4 className="font-bold text-xl text-red-600 mb-3">SINAPI Oficial</h4>
            </div>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Composições técnicas oficiais da Caixa Econômica Federal</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Valores com encargos sociais completos</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Coeficientes e especificações técnicas detalhadas</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Ideal para obras públicas e projetos técnicos</span>
              </li>
            </ul>
          </div>

          <div className="cp-bg-figma-light rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">🏪</span>
              </div>
              <h4 className="font-bold text-xl text-green-600 mb-3">Mercado Local</h4>
            </div>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Valores praticados por profissionais autônomos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Materiais em unidades práticas de compra</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Preços ajustados para a realidade do mercado</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Ideal para obras particulares e reformas</span>
              </li>
            </ul>
          </div>
        </div>
      </PageCard>

      {/* Como usar */}
      <PageCard>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold cp-text-gradient mb-4">🎯 Como Usar</h3>
          <p className="text-lg text-gray-600">
            Processo simples em 3 passos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="cp-gradient-figma-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Escolha a Calculadora</h4>
            <p className="text-gray-600">Selecione o tipo de serviço que você precisa calcular</p>
          </div>

          <div className="text-center">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Insira as Medidas</h4>
            <p className="text-gray-600">Informe as dimensões e especificações do seu projeto</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Obtenha o Resultado</h4>
            <p className="text-gray-600">Receba a lista completa de materiais e custos</p>
          </div>
        </div>
      </PageCard>

      {/* Integração ConectaPro */}
      <PageCard>
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 cp-gradient-figma-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">🔗</span>
            </div>
            <h3 className="text-2xl font-bold cp-text-gradient mb-4">Integração ConectaPro</h3>
            <p className="text-xl text-gray-600 mb-6">
              Calculou os materiais? Agora encontre profissionais qualificados para executar seu projeto!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <PageButton href="/buscar-profissional" variant="primary">
              🔍 Encontrar Profissionais
            </PageButton>
            <PageButton href="/cadastro-profissional" variant="secondary">
              👷 Sou Profissional
            </PageButton>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              💡 <strong>Dica:</strong> Use nossas calculadoras para ter uma base de preços e depois negocie diretamente com os profissionais
            </p>
          </div>
        </div>
      </PageCard>
    </PageLayout>
  );
} 