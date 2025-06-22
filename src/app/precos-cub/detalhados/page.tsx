"use client";
import React, { useState } from "react";
import Link from "next/link";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function PrecosDetalhadosPage() {
  const [padrao, setPadrao] = useState("normal");

  // Valores base por padrão (R$/m²)
  const valoresBase = {
    popular: {
      multiplicador: 0.85,
      cubBase: 1567.80
    },
    normal: {
      multiplicador: 1.0,
      cubBase: 1847.25
    },
    alto: {
      multiplicador: 1.21,
      cubBase: 2234.60
    }
  };

  // Serviços detalhados com preços base (padrão normal)
  const servicosDetalhados = [
    {
      categoria: "Paredes",
      emoji: "🧱",
      cor: "red",
      servicos: [
        { nome: "Alvenaria (sem reboco)", valor: 112.79, descricao: "Execução de alvenaria com tijolos cerâmicos" },
        { nome: "Reboco/Emboço", valor: 93.99, descricao: "Revestimento básico das paredes" },
        { nome: "Emassamento", valor: 37.60, descricao: "Preparação para pintura" },
        { nome: "Pintura", valor: 37.60, descricao: "Tinta acrílica padrão" }
      ]
    },
    {
      categoria: "Pisos e Revestimentos",
      emoji: "🔲",
      cor: "blue",
      servicos: [
        { nome: "Contrapiso", valor: 56.39, descricao: "Base nivelada para piso" },
        { nome: "Piso Cerâmico", valor: 93.99, descricao: "Cerâmica padrão 45x45cm" },
        { nome: "Piso Porcelanato", valor: 150.38, descricao: "Porcelanato 60x60cm" },
        { nome: "Azulejo Banheiro", valor: 112.79, descricao: "Revestimento cerâmico áreas molhadas" }
      ]
    },
    {
      categoria: "Instalações",
      emoji: "⚡",
      cor: "yellow",
      servicos: [
        { nome: "Instalação Elétrica", valor: 225.58, descricao: "Pontos elétricos, tomadas e iluminação" },
        { nome: "Instalação Hidráulica", valor: 187.98, descricao: "Água fria, quente e esgoto" },
        { nome: "Instalação Gás", valor: 75.19, descricao: "Tubulação para gás GLP" }
      ]
    },
    {
      categoria: "Estrutura e Cobertura",
      emoji: "🏗️",
      cor: "green",
      servicos: [
        { nome: "Fundação", valor: 169.17, descricao: "Sapatas e vigas baldrame" },
        { nome: "Estrutura Concreto", valor: 281.95, descricao: "Pilares, vigas e lajes" },
        { nome: "Cobertura/Telhado", valor: 337.73, descricao: "Estrutura e telhas cerâmicas" }
      ]
    }
  ];

  const multiplicadorAtual = valoresBase[padrao as keyof typeof valoresBase].multiplicador;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor * multiplicadorAtual);
  };

  const calcularMaterialMaoObra = (valorTotal: number) => {
    const material = valorTotal * 0.6; // 60% material
    const maoObra = valorTotal * 0.4; // 40% mão de obra
    return { material, maoObra };
  };

  const getCoresTailwind = (cor: string) => {
    const cores = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-800" },
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-800" },
      yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-800" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-800" }
    };
    return cores[cor as keyof typeof cores];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Preços Detalhados por Serviço" bgColor="bg-purple-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link href="/precos-cub" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            ← Voltar ao Menu CUB
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">📋 Preços Detalhados por Serviço</h1>
          <p className="text-gray-600">Valores separados por material e mão de obra baseados no CUB Sinduscon-RO</p>
        </div>

        {/* Seletor de Padrão */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">⚙️ Padrão Construtivo</h3>
              <p className="text-gray-600 text-sm">Selecione o padrão para ajustar os preços</p>
            </div>
            <div className="mt-4 md:mt-0">
              <select 
                value={padrao} 
                onChange={(e) => setPadrao(e.target.value)}
                className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">Popular (-15%)</option>
                <option value="normal">Normal (Base)</option>
                <option value="alto">Alto Padrão (+21%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Serviços por Categoria */}
        <div className="space-y-8">
          {servicosDetalhados.map((categoria, catIndex) => {
            const cores = getCoresTailwind(categoria.cor);
            
            return (
              <div key={catIndex} className={`${cores.bg} ${cores.border} border-2 rounded-2xl p-6`}>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3">{categoria.emoji}</span>
                  <h2 className={`text-2xl font-bold ${cores.text}`}>{categoria.categoria}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoria.servicos.map((servico, servIndex) => {
                    const valorTotal = servico.valor * multiplicadorAtual;
                    const { material, maoObra } = calcularMaterialMaoObra(valorTotal);

                    return (
                      <div key={servIndex} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-gray-800 text-lg">{servico.nome}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${cores.badge}`}>
                            {categoria.categoria}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">{servico.descricao}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">💰 Total:</span>
                            <span className="font-bold text-lg text-gray-900">{formatarMoeda(servico.valor)}</span>
                          </div>
                          
                          <div className="border-t pt-3 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">🧱 Material (60%):</span>
                              <span className="font-medium text-blue-600">{formatarMoeda(servico.valor * 0.6)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">👷 Mão de obra (40%):</span>
                              <span className="font-medium text-green-600">{formatarMoeda(servico.valor * 0.4)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Exemplo Prático */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">💡 Exemplo Prático</h3>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-xl font-bold text-gray-800 mb-4">🧱 Parede Completa (1m²)</h4>
            <p className="text-gray-600 mb-4">Vamos calcular o custo total para executar 1m² de parede do zero até a pintura final:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-gray-700 mb-3">Serviços Necessários:</h5>
                <div className="space-y-2">
                  {servicosDetalhados[0].servicos.map((servico, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{servico.nome}:</span>
                      <span className="font-medium">{formatarMoeda(servico.valor)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total por m²:</span>
                    <span className="text-purple-600">
                      {formatarMoeda(servicosDetalhados[0].servicos.reduce((acc, s) => acc + s.valor, 0))}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-700 mb-3">Separação Material/Mão de Obra:</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600">🧱 Material Total (60%):</span>
                    <span className="font-medium text-blue-600">
                      {formatarMoeda(servicosDetalhados[0].servicos.reduce((acc, s) => acc + s.valor, 0) * 0.6)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">👷 Mão de Obra Total (40%):</span>
                    <span className="font-medium text-green-600">
                      {formatarMoeda(servicosDetalhados[0].servicos.reduce((acc, s) => acc + s.valor, 0) * 0.4)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <strong>Dica:</strong> Este valor inclui todos os processos para deixar a parede pronta para uso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Importantes */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="text-yellow-400 mr-3 text-xl">⚠️</div>
            <div>
              <h4 className="text-lg font-bold text-yellow-800 mb-2">Informações Importantes</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• <strong>Valores baseados no CUB Sinduscon-RO (Maio 2025)</strong></li>
                <li>• <strong>Separação 60% Material / 40% Mão de Obra</strong> baseada em composições SINAPI</li>
                <li>• <strong>Padrão Popular:</strong> Materiais básicos, acabamentos simples (-15%)</li>
                <li>• <strong>Padrão Normal:</strong> Materiais intermediários, acabamentos padrão (base)</li>
                <li>• <strong>Alto Padrão:</strong> Materiais premium, acabamentos superiores (+21%)</li>
                <li>• <strong>Não inclui:</strong> Projetos, licenças, fundações especiais, lucro do construtor</li>
                <li>• <strong>Para orçamentos precisos, sempre consulte um profissional qualificado</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Observações Técnicas */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="text-blue-400 mr-3 text-xl">📝</div>
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-2">Observações Técnicas</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• <strong>Alvenaria:</strong> Inclui tijolos, argamassa e execução (sem reboco)</li>
                <li>• <strong>Reboco:</strong> Chapisco + emboço com argamassa industrializada</li>
                <li>• <strong>Porcelanato:</strong> Inclui peça, argamassa colante e rejunte</li>
                <li>• <strong>Instalações:</strong> Incluem materiais, tubulações e mão de obra especializada</li>
                <li>• <strong>Estrutura:</strong> Concreto usinado, aço e formas inclusos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 