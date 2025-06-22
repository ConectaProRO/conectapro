"use client";
import React, { useState } from "react";
import { FaDownload, FaFileContract, FaUser, FaBuilding, FaClipboardList, FaCheck } from "react-icons/fa";
import jsPDF from 'jspdf';
import PageLayout, { PageCard } from "../../components/PageLayout";

interface DadosContrato {
  nomeContratante: string;
  cpfContratante: string;
  enderecoContratante: string;
  telefoneContratante: string;
  nomeContratado: string;
  cpfContratado: string;
  enderecoContratado: string;
  telefoneContratado: string;
  tipoServico: string;
  descricaoServico: string;
  localObra: string;
  valorTotal: string;
  formaPagamento: string;
  prazoExecucao: string;
  dataInicio: string;
  garantia: string;
  observacoes: string;
}

const tiposServico = [
  "Construção Civil",
  "Reforma Residencial", 
  "Reforma Comercial",
  "Instalações Elétricas",
  "Instalações Hidráulicas",
  "Pintura",
  "Alvenaria",
  "Cobertura/Telhado",
  "Piso/Revestimento",
  "Outros"
];

export default function GeradorContratosPage() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dados, setDados] = useState<DadosContrato>({
    nomeContratante: '',
    cpfContratante: '',
    enderecoContratante: '',
    telefoneContratante: '',
    nomeContratado: '',
    cpfContratado: '',
    enderecoContratado: '',
    telefoneContratado: '',
    tipoServico: '',
    descricaoServico: '',
    localObra: '',
    valorTotal: '',
    formaPagamento: '',
    prazoExecucao: '',
    dataInicio: '',
    garantia: '90 dias',
    observacoes: ''
  });

  const handleInputChange = (campo: keyof DadosContrato, valor: string) => {
    setDados(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS", 20, 30);
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    let yPosition = 50;
    
    doc.setFont("helvetica", "bold");
    doc.text("CONTRATANTE:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Nome: ${dados.nomeContratante}`, 20, yPosition);
    yPosition += 6;
    doc.text(`CPF: ${dados.cpfContratante}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Endereço: ${dados.enderecoContratante}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Telefone: ${dados.telefoneContratante}`, 20, yPosition);
    
    yPosition += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text("CONTRATADO:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Nome: ${dados.nomeContratado}`, 20, yPosition);
    yPosition += 6;
    doc.text(`CPF/CNPJ: ${dados.cpfContratado}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Endereço: ${dados.enderecoContratado}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Telefone: ${dados.telefoneContratado}`, 20, yPosition);
    
    yPosition += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text("OBJETO DO CONTRATO:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Tipo de Serviço: ${dados.tipoServico}`, 20, yPosition);
    yPosition += 6;
    
    const descricaoLinhas = doc.splitTextToSize(`Descrição: ${dados.descricaoServico}`, 170);
    doc.text(descricaoLinhas, 20, yPosition);
    yPosition += descricaoLinhas.length * 6;
    
    yPosition += 6;
    doc.text(`Local da Obra: ${dados.localObra}`, 20, yPosition);
    
    yPosition += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text("CONDIÇÕES FINANCEIRAS:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Valor Total: R$ ${dados.valorTotal}`, 20, yPosition);
    yPosition += 6;
    
    const pagamentoLinhas = doc.splitTextToSize(`Forma de Pagamento: ${dados.formaPagamento}`, 170);
    doc.text(pagamentoLinhas, 20, yPosition);
    yPosition += pagamentoLinhas.length * 6;
    
    yPosition += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text("PRAZO DE EXECUÇÃO:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Data de Início: ${dados.dataInicio}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Prazo: ${dados.prazoExecucao}`, 20, yPosition);
    
    yPosition += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text("GARANTIA:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 8;
    doc.text(`Período de Garantia: ${dados.garantia}`, 20, yPosition);
    
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    yPosition += 15;
    
    if (dados.observacoes) {
      doc.setFont("helvetica", "bold");
      doc.text("OBSERVAÇÕES:", 20, yPosition);
      doc.setFont("helvetica", "normal");
      yPosition += 8;
      const observacoesLinhas = doc.splitTextToSize(dados.observacoes, 170);
      doc.text(observacoesLinhas, 20, yPosition);
      yPosition += observacoesLinhas.length * 6 + 15;
    }
    
    yPosition += 20;
    doc.text("_________________________________", 20, yPosition);
    yPosition += 8;
    doc.text("Assinatura do Contratante", 20, yPosition);
    
    doc.text("_________________________________", 120, yPosition - 8);
    doc.text("Assinatura do Contratado", 120, yPosition);
    
    yPosition += 15;
    doc.setFontSize(10);
    doc.text(`Contrato gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);
    doc.text("Gerado pela ConectaPro - www.conectapro.app", 20, yPosition + 5);
    
    doc.save(`contrato-${dados.nomeContratante.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const proximaEtapa = () => {
    if (etapaAtual < 4) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  return (
    <PageLayout 
      title="📋 Gerador de Contratos"
      subtitle="Gere contratos profissionais de forma rápida e segura"
    >
      {/* Indicador de Progresso */}
      <PageCard>
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((etapa) => (
            <div key={etapa} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                etapa <= etapaAtual 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {etapa < etapaAtual ? <FaCheck /> : etapa}
              </div>
              {etapa < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  etapa < etapaAtual ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {etapaAtual === 1 && "Dados do Contratante"}
            {etapaAtual === 2 && "Dados do Contratado"}
            {etapaAtual === 3 && "Detalhes do Serviço"}
            {etapaAtual === 4 && "Revisão e Geração"}
          </h3>
        </div>
      </PageCard>

      {/* Etapa 1 - Contratante */}
      {etapaAtual === 1 && (
        <PageCard>
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-2xl text-blue-600" />
            <h2 className="text-2xl font-bold cp-text-gradient">Dados do Contratante (Cliente)</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={dados.nomeContratante}
                onChange={(e) => handleInputChange('nomeContratante', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: João Silva Santos"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                value={dados.cpfContratante}
                onChange={(e) => handleInputChange('cpfContratante', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000.000.000-00"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Endereço Completo *
              </label>
              <input
                type="text"
                value={dados.enderecoContratante}
                onChange={(e) => handleInputChange('enderecoContratante', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rua, número, bairro, cidade - CEP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="text"
                value={dados.telefoneContratante}
                onChange={(e) => handleInputChange('telefoneContratante', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(69) 99999-9999"
              />
            </div>
          </div>
        </PageCard>
      )}

      {/* Etapa 2 - Contratado */}
      {etapaAtual === 2 && (
        <PageCard>
          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-2xl text-green-600" />
            <h2 className="text-2xl font-bold cp-text-gradient">Dados do Contratado (Profissional)</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={dados.nomeContratado}
                onChange={(e) => handleInputChange('nomeContratado', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Maria Oliveira Construções"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF/CNPJ *
              </label>
              <input
                type="text"
                value={dados.cpfContratado}
                onChange={(e) => handleInputChange('cpfContratado', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Endereço Completo *
              </label>
              <input
                type="text"
                value={dados.enderecoContratado}
                onChange={(e) => handleInputChange('enderecoContratado', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rua, número, bairro, cidade - CEP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="text"
                value={dados.telefoneContratado}
                onChange={(e) => handleInputChange('telefoneContratado', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(69) 99999-9999"
              />
            </div>
          </div>
        </PageCard>
      )}

      {/* Etapa 3 - Serviço */}
      {etapaAtual === 3 && (
        <PageCard>
          <div className="flex items-center gap-3 mb-6">
            <FaClipboardList className="text-2xl text-purple-600" />
            <h2 className="text-2xl font-bold cp-text-gradient">Detalhes do Serviço</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Serviço *
                </label>
                <select
                  value={dados.tipoServico}
                  onChange={(e) => handleInputChange('tipoServico', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione o tipo</option>
                  {tiposServico.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor Total (R$) *
                </label>
                <input
                  type="text"
                  value={dados.valorTotal}
                  onChange={(e) => handleInputChange('valorTotal', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 15.000,00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição Detalhada do Serviço *
              </label>
              <textarea
                value={dados.descricaoServico}
                onChange={(e) => handleInputChange('descricaoServico', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva detalhadamente os serviços que serão executados..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Local da Obra *
              </label>
              <input
                type="text"
                value={dados.localObra}
                onChange={(e) => handleInputChange('localObra', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Endereço completo onde será executado o serviço"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data de Início *
                </label>
                <input
                  type="date"
                  value={dados.dataInicio}
                  onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prazo de Execução *
                </label>
                <input
                  type="text"
                  value={dados.prazoExecucao}
                  onChange={(e) => handleInputChange('prazoExecucao', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 30 dias"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Garantia
                </label>
                <select
                  value={dados.garantia}
                  onChange={(e) => handleInputChange('garantia', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="30 dias">30 dias</option>
                  <option value="60 dias">60 dias</option>
                  <option value="90 dias">90 dias</option>
                  <option value="6 meses">6 meses</option>
                  <option value="1 ano">1 ano</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Forma de Pagamento *
              </label>
              <textarea
                value={dados.formaPagamento}
                onChange={(e) => handleInputChange('formaPagamento', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 50% na assinatura do contrato, 25% no meio da obra, 25% na conclusão"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Observações Adicionais
              </label>
              <textarea
                value={dados.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cláusulas especiais, condições específicas, etc..."
              />
            </div>
          </div>
        </PageCard>
      )}

      {/* Etapa 4 - Revisão */}
      {etapaAtual === 4 && (
        <PageCard>
          <div className="flex items-center gap-3 mb-6">
            <FaFileContract className="text-2xl text-orange-600" />
            <h2 className="text-2xl font-bold cp-text-gradient">Revisão do Contrato</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">📋 Resumo do Contrato:</h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">CONTRATANTE:</h4>
                <p><strong>Nome:</strong> {dados.nomeContratante}</p>
                <p><strong>CPF:</strong> {dados.cpfContratante}</p>
                <p><strong>Telefone:</strong> {dados.telefoneContratante}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-2">CONTRATADO:</h4>
                <p><strong>Nome:</strong> {dados.nomeContratado}</p>
                <p><strong>CPF/CNPJ:</strong> {dados.cpfContratado}</p>
                <p><strong>Telefone:</strong> {dados.telefoneContratado}</p>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-semibold text-purple-600 mb-2">SERVIÇO:</h4>
                <p><strong>Tipo:</strong> {dados.tipoServico}</p>
                <p><strong>Valor:</strong> R$ {dados.valorTotal}</p>
                <p><strong>Prazo:</strong> {dados.prazoExecucao}</p>
                <p><strong>Início:</strong> {dados.dataInicio}</p>
                <p><strong>Garantia:</strong> {dados.garantia}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={gerarPDF}
              className="cp-button-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <FaDownload />
              Gerar Contrato PDF
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              ✅ Contrato profissional • 🔒 Dados seguros • 📄 Formato PDF
            </p>
          </div>
        </PageCard>
      )}

      {/* Botões de Navegação */}
      <PageCard>
        <div className="flex justify-between">
          <button
            onClick={etapaAnterior}
            disabled={etapaAtual === 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              etapaAtual === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>
          
          {etapaAtual < 4 && (
            <button
              onClick={proximaEtapa}
              className="cp-button-primary px-6 py-3"
            >
              Próximo
            </button>
          )}
        </div>
      </PageCard>
    </PageLayout>
  );
} 