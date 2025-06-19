"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCalculator, FaPaintRoller, FaHammer, FaRuler, FaMoneyBillWave, FaWhatsapp, FaArrowLeft, FaInfoCircle, FaTools, FaHome } from "react-icons/fa";

interface Material {
  nome: string;
  preco: number;
  unidade: string;
  rendimento?: number;
  quantidade?: number;
}
const tiposServicos = {
  pintura: {
    nome: "Pintura",
    icone: FaPaintRoller,
    unidade: "m²",
    materiais: {
      tinta: { nome: "Tinta", preco: 45, rendimento: 12, unidade: "litro" } as Material,
      primer: { nome: "Primer/Selador", preco: 35, rendimento: 15, unidade: "litro" } as Material,
      lixa: { nome: "Lixa", preco: 8, quantidade: 0.1, unidade: "folha" } as Material,
      rolo: { nome: "Rolo + Bandeja", preco: 25, quantidade: 0.05, unidade: "conjunto" } as Material,
      pincel: { nome: "Pincel", preco: 15, quantidade: 0.03, unidade: "unidade" } as Material,
    },
    maoDeObra: { min: 8, max: 15 }, // por m²
    fatores: {
      textura: { lisa: 1, rugosa: 1.3, muito_rugosa: 1.5 },
      demaosTinta: { uma: 1, duas: 1.8, tres: 2.5 },
      altura: { baixa: 1, media: 1.2, alta: 1.4 }
    }
  },
  alvenaria: {
    nome: "Alvenaria",
    icone: FaHammer,
    unidade: "m²",
    materiais: {
      tijolo: { nome: "Tijolo 6 furos", preco: 0.65, quantidade: 25, unidade: "unidade" },
      cimento: { nome: "Cimento", preco: 28, quantidade: 0.8, unidade: "saco 50kg" },
      areia: { nome: "Areia", preco: 45, quantidade: 0.15, unidade: "m³" },
      cal: { nome: "Cal", preco: 12, quantidade: 0.2, unidade: "saco 20kg" },
    },
    maoDeObra: { min: 25, max: 40 },
    fatores: {
      espessura: { meia_vez: 1, uma_vez: 1.8 },
      altura: { baixa: 1, media: 1.1, alta: 1.3 }
    }
  },
  reboco: {
    nome: "Reboco",
    icone: FaTools,
    unidade: "m²",
    materiais: {
      cimento: { nome: "Cimento", preco: 28, quantidade: 0.4, unidade: "saco 50kg" },
      areia: { nome: "Areia fina", preco: 55, quantidade: 0.08, unidade: "m³" },
      cal: { nome: "Cal", preco: 12, quantidade: 0.15, unidade: "saco 20kg" },
    },
    maoDeObra: { min: 12, max: 20 },
    fatores: {
      espessura: { fina: 1, media: 1.3, grossa: 1.6 },
      superficie: { lisa: 1, irregular: 1.2 }
    }
  },
  gesso: {
    nome: "Forro de Gesso",
    icone: FaHome,
    unidade: "m²",
    materiais: {
      gesso: { nome: "Gesso em pó", preco: 18, quantidade: 1.2, unidade: "saco 20kg" },
      arame: { nome: "Arame galvanizado", preco: 12, quantidade: 0.05, unidade: "kg" },
      prego: { nome: "Prego", preco: 8, quantidade: 0.02, unidade: "kg" },
    },
    maoDeObra: { min: 18, max: 30 },
    fatores: {
      tipo: { liso: 1, decorativo: 1.4, sanca: 1.8 },
      altura: { baixa: 1, alta: 1.3 }
    }
  }
};

export default function CalculadoraOrcamento() {
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [fatoresSelecionados, setFatoresSelecionados] = useState<Record<string, string>>({});
  const [orcamento, setOrcamento] = useState<{
    servico: string;
    area: number;
    fatorTotal: number;
    materiais: Array<{
      nome: string;
      quantidade: number;
      unidade: string;
      precoUnitario: number;
      custoTotal: number;
    }>;
    custoMateriais: number;
    maoDeObra: { min: number; max: number; media: number };
    total: { min: number; max: number; medio: number };
  } | null>(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const calcularOrcamento = () => {
    if (!servicoSelecionado || !area || parseFloat(area) <= 0) {
      alert("Por favor, selecione o serviço e informe uma área válida.");
      return;
    }

    const servico = tiposServicos[servicoSelecionado as keyof typeof tiposServicos];
    const areaNum = parseFloat(area);
    
    // Calcular fator multiplicador baseado nas opções selecionadas
    let fatorTotal = 1;
    Object.entries(servico.fatores).forEach(([categoria, opcoes]) => {
      const opcaoSelecionada = fatoresSelecionados[categoria];
      if (opcaoSelecionada && opcoes[opcaoSelecionada as keyof typeof opcoes]) {
        fatorTotal *= opcoes[opcaoSelecionada as keyof typeof opcoes];
      }
    });

    // Calcular materiais
    const materiaisCalculados = Object.entries(servico.materiais).map(([, material]) => {
      let quantidade;
      if (material.rendimento) {
        quantidade = (areaNum * fatorTotal) / material.rendimento;
      } else {
        quantidade = areaNum * material.quantidade * fatorTotal;
      }
      
      const custo = quantidade * material.preco;
      
      return {
        nome: material.nome,
        quantidade: Math.ceil(quantidade * 10) / 10,
        unidade: material.unidade,
        precoUnitario: material.preco,
        custoTotal: custo
      };
    });

    const custoMateriais = materiaisCalculados.reduce((sum, item) => sum + item.custoTotal, 0);
    
    // Calcular mão de obra
    const maoDeObraMin = areaNum * servico.maoDeObra.min * fatorTotal;
    const maoDeObraMax = areaNum * servico.maoDeObra.max * fatorTotal;
    const maoDeObraMedia = (maoDeObraMin + maoDeObraMax) / 2;

    // Total
    const totalMin = custoMateriais + maoDeObraMin;
    const totalMax = custoMateriais + maoDeObraMax;

    setOrcamento({
      servico: servico.nome,
      area: areaNum,
      fatorTotal,
      materiais: materiaisCalculados,
      custoMateriais,
      maoDeObra: {
        min: maoDeObraMin,
        max: maoDeObraMax,
        media: maoDeObraMedia
      },
      total: {
        min: totalMin,
        max: totalMax,
        medio: (totalMin + totalMax) / 2
      }
    });
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const servicoAtual = servicoSelecionado ? tiposServicos[servicoSelecionado as keyof typeof tiposServicos] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <FaArrowLeft />
                <span>Voltar</span>
              </Link>
              <div className="flex items-center gap-3">
                <FaCalculator className="text-3xl text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Calculadora de Orçamento</h1>
                  <p className="text-gray-600">Estime custos de materiais e mão de obra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Seleção de Serviço */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center gap-2">
                🔧 Tipo de Serviço
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(tiposServicos).map(([key, servico]) => {
                  const IconeServico = servico.icone;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setServicoSelecionado(key);
                        setFatoresSelecionados({});
                        setOrcamento(null);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        servicoSelecionado === key
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconeServico className={`text-2xl ${servicoSelecionado === key ? 'text-blue-600' : 'text-gray-500'}`} />
                        <div>
                          <h3 className="font-semibold text-gray-800">{servico.nome}</h3>
                          <p className="text-sm text-gray-600">Preço por {servico.unidade}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Área */}
            {servicoSelecionado && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center gap-2">
                  <FaRuler /> Área do Projeto
                </h2>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold mb-2 text-gray-700">
                      Área total ({servicoAtual?.unidade})
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Ex: 50"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-8">
                    {servicoAtual?.unidade}
                  </div>
                </div>
              </div>
            )}

            {/* Opções Específicas */}
            {servicoSelecionado && servicoAtual && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center gap-2">
                  ⚙️ Especificações do Projeto
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(servicoAtual.fatores).map(([categoria, opcoes]) => (
                    <div key={categoria}>
                      <label className="block font-semibold mb-3 text-gray-700 capitalize">
                        {categoria.replace('_', ' ')}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(opcoes).map(([opcao, fator]) => (
                          <button
                            key={opcao}
                            onClick={() => setFatoresSelecionados(prev => ({
                              ...prev,
                              [categoria]: opcao
                            }))}
                            className={`p-3 rounded-xl border-2 transition-all text-center ${
                              fatoresSelecionados[categoria] === opcao
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            <div className="font-medium capitalize">
                              {opcao.replace('_', ' ')}
                            </div>
                            <div className="text-sm text-gray-500">
                              +{Math.round(((fator as number) - 1) * 100)}%
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão Calcular */}
            {servicoSelecionado && area && (
              <div className="text-center">
                <button
                  onClick={calcularOrcamento}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <FaCalculator />
                  Calcular Orçamento
                </button>
              </div>
            )}
          </div>

          {/* Resultado */}
          <div className="space-y-6">
            {orcamento && (
              <>
                {/* Resumo */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl p-6 border-2 border-green-200">
                  <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
                    <FaMoneyBillWave />
                    Orçamento Estimado
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Serviço</div>
                      <div className="font-bold text-lg">{orcamento.servico}</div>
                      <div className="text-sm text-gray-600">{orcamento.area} {servicoAtual?.unidade}</div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-4">
                      <div className="text-sm text-gray-600 mb-2">Valor Total Estimado</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatarMoeda(orcamento.total.min)} - {formatarMoeda(orcamento.total.max)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Média: {formatarMoeda(orcamento.total.medio)}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaInfoCircle />
                    {mostrarDetalhes ? 'Ocultar' : 'Ver'} Detalhes
                  </button>
                </div>

                {/* Detalhes */}
                {mostrarDetalhes && (
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h3 className="text-lg font-bold mb-4 text-blue-600">Detalhamento</h3>
                    
                    {/* Materiais */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-700">📦 Materiais</h4>
                      <div className="space-y-2">
                        {orcamento.materiais.map((material, index: number) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div>
                              <div className="font-medium">{material.nome}</div>
                              <div className="text-sm text-gray-600">
                                {material.quantidade} {material.unidade} × {formatarMoeda(material.precoUnitario)}
                              </div>
                            </div>
                            <div className="font-semibold text-blue-600">
                              {formatarMoeda(material.custoTotal)}
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-2 font-bold text-blue-600 border-t-2 border-blue-200">
                          <div>Total Materiais</div>
                          <div>{formatarMoeda(orcamento.custoMateriais)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Mão de obra */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-700">👷 Mão de Obra</h4>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span>Valor estimado</span>
                          <span className="font-semibold">
                            {formatarMoeda(orcamento.maoDeObra.min)} - {formatarMoeda(orcamento.maoDeObra.max)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">💡 Próximo Passo</h3>
                  <p className="mb-4 text-blue-100">
                    Quer um orçamento mais preciso? Converse com profissionais especializados!
                  </p>
                  
                  <Link
                    href={`/buscar-profissional`}
                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    Encontrar Profissionais
                  </Link>
                </div>
              </>
            )}

            {/* Dicas */}
            <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 border-2 border-yellow-200">
              <h3 className="text-lg font-bold mb-3 text-yellow-700 flex items-center gap-2">
                💡 Dicas Importantes
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Preços baseados no mercado de Porto Velho</li>
                <li>• Valores podem variar conforme fornecedor</li>
                <li>• Sempre solicite orçamentos de profissionais</li>
                <li>• Considere 10-15% de margem para imprevistos</li>
                <li>• Qualidade dos materiais afeta o preço final</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 