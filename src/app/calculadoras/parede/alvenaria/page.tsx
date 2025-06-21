"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCalculator, FaArrowLeft, FaInfoCircle, FaCube, FaTools, FaChartBar } from "react-icons/fa";
import CalculadoraHeader from "../../../components/CalculadoraHeader";

export default function AlvenariaCalculadora() {
  const [dimensoes, setDimensoes] = useState({
    largura: '',
    altura: '',
    comprimento: '',
    quantidade: 1,
    tipoTijolo: 'ceramico',
    espessura: '14',
    tipoDesonerado: 'naoDesonerado'
  });

  const [resultado, setResultado] = useState<any>(null);

  // Dados SINAPI para Alvenaria - Rondônia 2025
  const dadosSINAPI = {
    alvenariaCeramica: {
      codigo: "73915/001",
      descricao: "ALVENARIA DE VEDAÇÃO DE BLOCOS CERÂMICOS FURADOS NA HORIZONTAL DE 9X14X19CM (ESPESSURA 14CM) DE PAREDES COM ÁREA LÍQUIDA MAIOR OU IGUAL A 6M² COM VÃOS E ARGAMASSA DE ASSENTAMENTO COM PREPARO EM BETONEIRA",
      unidade: "m²",
      valorNaoDesonerado: 89.45,
      valorDesonerado: 86.23,
      composicao: [
        {
          codigo: "88309",
          descricao: "PEDREIRO COM ENCARGOS COMPLEMENTARES",
          tipo: "Mão de obra",
          unidade: "H",
          coeficiente: 1.44,
          valorUnitario: 30.21,
          valorNaoDesonerado: 43.50,
          valorDesonerado: 40.12
        },
        {
          codigo: "88316", 
          descricao: "SERVENTE COM ENCARGOS COMPLEMENTARES",
          tipo: "Mão de obra",
          unidade: "H",
          coeficiente: 0.72,
          valorUnitario: 25.95,
          valorNaoDesonerado: 18.68,
          valorDesonerado: 17.25
        },
        {
          codigo: "87292",
          descricao: "BETONEIRA 320L, COM MOTOR ELÉTRICO",
          tipo: "Equipamento",
          unidade: "CHI",
          coeficiente: 0.0288,
          valorUnitario: 2.89,
          valorNaoDesonerado: 0.08,
          valorDesonerado: 0.08
        },
        {
          codigo: "00000381",
          descricao: "AREIA MÉDIA - POSTO JAZIDA/FORNECEDOR (SEM FRETE)",
          tipo: "Material",
          unidade: "m³",
          coeficiente: 0.0076,
          valorUnitario: 45.00,
          valorNaoDesonerado: 0.34,
          valorDesonerado: 0.34
        },
        {
          codigo: "00001179",
          descricao: "CIMENTO PORTLAND COMPOSTO CP II-Z-32 (RESISTÊNCIA 32.0 MPA) - SACO 50KG",
          tipo: "Material",
          unidade: "KG",
          coeficiente: 7.2,
          valorUnitario: 0.58,
          valorNaoDesonerado: 4.18,
          valorDesonerado: 4.18
        },
        {
          codigo: "00000434",
          descricao: "BLOCO CERÂMICO DE VEDAÇÃO COM FUROS HORIZONTAIS 9X14X19CM",
          tipo: "Material",
          unidade: "UN",
          coeficiente: 26.0,
          valorUnitario: 0.85,
          valorNaoDesonerado: 22.10,
          valorDesonerado: 22.10
        },
        {
          codigo: "00001365",
          descricao: "CAL HIDRATADA CH-I PARA ARGAMASSAS - SACO 20KG",
          tipo: "Material",
          unidade: "KG",
          coeficiente: 1.44,
          valorUnitario: 0.42,
          valorNaoDesonerado: 0.60,
          valorDesonerado: 0.60
        }
      ]
    },
    alvenaria20cm: {
      codigo: "73915/002",
      descricao: "ALVENARIA DE VEDAÇÃO DE BLOCOS CERÂMICOS FURADOS NA HORIZONTAL DE 9X19X19CM (ESPESSURA 20CM)",
      unidade: "m²",
      valorNaoDesonerado: 95.80,
      valorDesonerado: 92.15,
      composicao: [
        {
          codigo: "88309",
          descricao: "PEDREIRO COM ENCARGOS COMPLEMENTARES",
          tipo: "Mão de obra",
          unidade: "H",
          coeficiente: 1.52,
          valorUnitario: 30.21,
          valorNaoDesonerado: 45.92,
          valorDesonerado: 42.35
        },
        {
          codigo: "88316",
          descricao: "SERVENTE COM ENCARGOS COMPLEMENTARES", 
          tipo: "Mão de obra",
          unidade: "H",
          coeficiente: 0.76,
          valorUnitario: 25.95,
          valorNaoDesonerado: 19.72,
          valorDesonerado: 18.20
        },
        {
          codigo: "00000434",
          descricao: "BLOCO CERÂMICO DE VEDAÇÃO COM FUROS HORIZONTAIS 9X19X19CM",
          tipo: "Material", 
          unidade: "UN",
          coeficiente: 26.0,
          valorUnitario: 1.15,
          valorNaoDesonerado: 29.90,
          valorDesonerado: 29.90
        }
      ]
    }
  };

  const tiposTijolo = {
    ceramico: {
      nome: "Tijolo Cerâmico Furado",
      descricao: "Bloco cerâmico de vedação com furos horizontais",
      espessuras: {
        "14": { nome: "14cm (9x14x19cm)", dados: dadosSINAPI.alvenariaCeramica },
        "20": { nome: "20cm (9x19x19cm)", dados: dadosSINAPI.alvenaria20cm }
      }
    }
  };

  const calcular = () => {
    const largura = parseFloat(dimensoes.largura) || 0;
    const altura = parseFloat(dimensoes.altura) || 0;
    const comprimento = parseFloat(dimensoes.comprimento) || 0;
    const quantidade = parseInt(dimensoes.quantidade.toString()) || 1;

    if (largura <= 0 || altura <= 0) {
      alert('Por favor, preencha largura e altura com valores válidos.');
      return;
    }

    // Cálculo da área de parede
    let areaPorParede;
    if (comprimento > 0) {
      // Parede com comprimento específico
      areaPorParede = comprimento * altura;
    } else {
      // Parede quadrada/retangular
      areaPorParede = largura * altura;
    }
    
    const areaTotal = areaPorParede * quantidade;

    // Buscar dados do tipo de tijolo selecionado
    const tipoSelecionado = tiposTijolo[dimensoes.tipoTijolo as keyof typeof tiposTijolo];
    const espessuraSelecionada = tipoSelecionado.espessuras[dimensoes.espessura as keyof typeof tipoSelecionado.espessuras];
    const dadosAlvenaria = espessuraSelecionada.dados;

    // Valor por m² baseado no tipo (desonerado ou não)
    const valorUnitario = dimensoes.tipoDesonerado === 'desonerado' 
      ? dadosAlvenaria.valorDesonerado 
      : dadosAlvenaria.valorNaoDesonerado;

    const valorTotal = areaTotal * valorUnitario;

    // Calcular composição detalhada
    const composicaoDetalhada = dadosAlvenaria.composicao.map(item => {
      const valorItem = dimensoes.tipoDesonerado === 'desonerado' 
        ? item.valorDesonerado 
        : item.valorNaoDesonerado;
      
      return {
        ...item,
        quantidadeTotal: item.coeficiente * areaTotal,
        valorTotalItem: valorItem * areaTotal
      };
    });

    // Calcular resumo por tipo
    const resumoPorTipo = {
      maoDeObra: 0,
      materiais: 0,
      equipamentos: 0
    };

    composicaoDetalhada.forEach(item => {
      if (item.tipo === 'Mão de obra') {
        resumoPorTipo.maoDeObra += item.valorTotalItem;
      } else if (item.tipo === 'Material') {
        resumoPorTipo.materiais += item.valorTotalItem;
      } else if (item.tipo === 'Equipamento') {
        resumoPorTipo.equipamentos += item.valorTotalItem;
      }
    });

    // Estimativas técnicas
    const produtividade = 8; // m²/dia por pedreiro
    const tempoExecucao = Math.ceil(areaTotal / produtividade);
    const profissionaisNecessarios = areaTotal > 20 ? 2 : 1;
    const tijolosPorM2 = 26;
    const totalTijolos = Math.ceil(areaTotal * tijolosPorM2);

    setResultado({
      dimensoes: {
        largura,
        altura,
        comprimento: comprimento || largura,
        quantidade,
        areaPorParede: areaPorParede.toFixed(2),
        areaTotal: areaTotal.toFixed(2)
      },
      custos: {
        valorUnitario: valorUnitario.toFixed(2),
        valorTotal: valorTotal.toFixed(2),
        tipoValor: dimensoes.tipoDesonerado === 'desonerado' ? 'Desonerado' : 'Não Desonerado',
        resumoPorTipo
      },
      especificacoes: {
        tipoTijolo: tipoSelecionado.nome,
        espessura: espessuraSelecionada.nome,
        codigo: dadosAlvenaria.codigo,
        descricao: dadosAlvenaria.descricao
      },
      estimativas: {
        tempoExecucao,
        profissionaisNecessarios,
        produtividade,
        totalTijolos
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
      tipoTijolo: 'ceramico',
      espessura: '14',
      tipoDesonerado: 'naoDesonerado'
    });
    setResultado(null);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <CalculadoraHeader 
        title="Calculadora de Alvenaria" 
        bgColor="bg-orange-600/90" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Navegação */}
        <div className="mb-6">
          <Link 
            href="/calculadoras/parede" 
            className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para Parede
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-full">
                <FaCube className="text-orange-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dados da Alvenaria</h2>
                <p className="text-gray-600 text-sm">Configure as dimensões da parede</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Largura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={dimensoes.largura}
                    onChange={(e) => setDimensoes({...dimensoes, largura: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 3.50"
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
                    value={dimensoes.altura}
                    onChange={(e) => setDimensoes({...dimensoes, altura: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 2.80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprimento (m) - Opcional
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={dimensoes.comprimento}
                    onChange={(e) => setDimensoes({...dimensoes, comprimento: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Deixe vazio se usar largura"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade de Paredes
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={dimensoes.quantidade}
                    onChange={(e) => setDimensoes({...dimensoes, quantidade: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Tijolo
                </label>
                <select
                  value={dimensoes.tipoTijolo}
                  onChange={(e) => setDimensoes({...dimensoes, tipoTijolo: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="ceramico">Tijolo Cerâmico Furado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Espessura da Parede
                </label>
                <select
                  value={dimensoes.espessura}
                  onChange={(e) => setDimensoes({...dimensoes, espessura: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="14">14cm (9x14x19cm) - Padrão</option>
                  <option value="20">20cm (9x19x19cm) - Estrutural</option>
                </select>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dimensoes.tipoDesonerado === 'desonerado'}
                    onChange={(e) => setDimensoes({...dimensoes, tipoDesonerado: e.target.checked ? 'desonerado' : 'naoDesonerado'})}
                    className="mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Usar valor desonerado (sem INSS)
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={calcular}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Calcular Alvenaria
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

          {/* Informações Técnicas */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-orange-600" />
                Informações Técnicas
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-orange-600">Consumo:</strong> 26 tijolos por m² (parede 14cm)
                </div>
                <div>
                  <strong className="text-orange-600">Produtividade:</strong> 8-12 m²/dia por pedreiro
                </div>
                <div>
                  <strong className="text-orange-600">Argamassa:</strong> Traço 1:2:8 (cimento:cal:areia)
                </div>
                <div>
                  <strong className="text-orange-600">Espessura junta:</strong> 10-15mm
                </div>
              </div>

              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <div className="text-xs text-orange-700">
                  <strong>Importante:</strong> Valores baseados em composições SINAPI oficiais 
                  para blocos cerâmicos de vedação com furos horizontais.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaTools className="text-orange-600" />
                Materiais por m²
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tijolos cerâmicos</span>
                  <span className="font-medium">26 unidades</span>
                </div>
                <div className="flex justify-between">
                  <span>Cimento (CP II-Z-32)</span>
                  <span className="font-medium">7,2 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Cal hidratada</span>
                  <span className="font-medium">1,44 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Areia média</span>
                  <span className="font-medium">0,0076 m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="mt-8 space-y-6">
            {/* Resumo Executivo */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <FaChartBar className="text-orange-600" />
                Orçamento de Alvenaria
              </h3>

              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-orange-600 font-medium">Área Total</div>
                  <div className="text-2xl font-bold text-orange-800">{resultado.dimensoes.areaTotal} m²</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-600 font-medium">Tijolos Necessários</div>
                  <div className="text-2xl font-bold text-blue-800">{resultado.estimativas.totalTijolos}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-green-600 font-medium">Tempo Estimado</div>
                  <div className="text-2xl font-bold text-green-800">{resultado.estimativas.tempoExecucao} dias</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-purple-600 font-medium">Profissionais</div>
                  <div className="text-2xl font-bold text-purple-800">{resultado.estimativas.profissionaisNecessarios}</div>
                </div>
              </div>

              {/* Custos Principais */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 rounded-xl p-6 text-center">
                  <h4 className="text-lg font-bold text-red-600 mb-2">Mão de Obra</h4>
                  <div className="text-2xl font-bold text-red-800">
                    {formatarMoeda(resultado.custos.resumoPorTipo.maoDeObra)}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <h4 className="text-lg font-bold text-blue-600 mb-2">Materiais</h4>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatarMoeda(resultado.custos.resumoPorTipo.materiais)}
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <h4 className="text-lg font-bold text-green-600 mb-2">Total</h4>
                  <div className="text-3xl font-bold text-green-800">
                    {formatarMoeda(parseFloat(resultado.custos.valorTotal))}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {formatarMoeda(parseFloat(resultado.custos.valorUnitario))}/m²
                  </div>
                </div>
              </div>

              {/* Especificações */}
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-3">📋 Especificações Técnicas</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Código SINAPI:</strong> {resultado.especificacoes.codigo}
                  </div>
                  <div>
                    <strong>Tipo:</strong> {resultado.especificacoes.tipoTijolo}
                  </div>
                  <div>
                    <strong>Espessura:</strong> {resultado.especificacoes.espessura}
                  </div>
                  <div>
                    <strong>Produtividade:</strong> {resultado.estimativas.produtividade} m²/dia
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <strong>Descrição:</strong> {resultado.especificacoes.descricao}
                </div>
              </div>
            </div>

            {/* Composição Detalhada */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-bold text-orange-600 mb-4">🧱 Composição SINAPI Detalhada</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Código</th>
                      <th className="text-left p-3">Descrição</th>
                      <th className="text-left p-3">Tipo</th>
                      <th className="text-right p-3">Quantidade</th>
                      <th className="text-right p-3">Unidade</th>
                      <th className="text-right p-3">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.composicao.map((item: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-mono text-xs">{item.codigo}</td>
                        <td className="p-3">{item.descricao}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.tipo === 'Mão de obra' ? 'bg-red-100 text-red-800' :
                            item.tipo === 'Material' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.tipo}
                          </span>
                        </td>
                        <td className="p-3 text-right">{item.quantidadeTotal.toFixed(2)}</td>
                        <td className="p-3 text-right">{item.unidade}</td>
                        <td className="p-3 text-right font-semibold">
                          {formatarMoeda(item.valorTotalItem)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dicas Profissionais */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-center">💡 Dicas para Execução de Alvenaria</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">✅ Antes de Começar:</h4>
                  <ul className="space-y-1 list-disc list-inside opacity-90">
                    <li>Verificar projeto estrutural</li>
                    <li>Conferir marcação da obra</li>
                    <li>Preparar argamassa adequada</li>
                    <li>Verificar qualidade dos tijolos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚠️ Durante a Execução:</h4>
                  <ul className="space-y-1 list-disc list-inside opacity-90">
                    <li>Manter prumo e nível</li>
                    <li>Respeitar espessura das juntas</li>
                    <li>Fazer amarração adequada</li>
                    <li>Cuidar do tempo de cura</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Link 
                  href="/buscar-profissional"
                  className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium"
                >
                  Encontrar Pedreiro Especializado
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 