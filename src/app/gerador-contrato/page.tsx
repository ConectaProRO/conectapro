"use client";
import React, { useState } from "react";
import { FaDownload, FaFileContract, FaUser, FaBuilding, FaCalendar, FaDollarSign, FaClipboardList } from "react-icons/fa";
import jsPDF from 'jspdf';

interface ContratoData {
  // Dados do Contratante (Cliente)
  contratanteNome: string;
  contratanteCpf: string;
  contratanteRg: string;
  contratanteEndereco: string;
  contratanteTelefone: string;
  contratanteEmail: string;
  
  // Dados do Contratado (Profissional)
  contratadoNome: string;
  contratadoCpfCnpj: string;
  contratadoRg: string;
  contratadoEndereco: string;
  contratadoTelefone: string;
  contratadoEmail: string;
  
  // Dados do Serviço
  tipoServico: string;
  descricaoDetalhada: string;
  localExecucao: string;
  prazoExecucao: string;
  dataInicio: string;
  valorTotal: string;
  formaPagamento: string;
  
  // Observações
  observacoes: string;
}

export default function GeradorContratoPage() {
  const [contratoData, setContratoData] = useState<ContratoData>({
    contratanteNome: "",
    contratanteCpf: "",
    contratanteRg: "",
    contratanteEndereco: "",
    contratanteTelefone: "",
    contratanteEmail: "",
    contratadoNome: "",
    contratadoCpfCnpj: "",
    contratadoRg: "",
    contratadoEndereco: "",
    contratadoTelefone: "",
    contratadoEmail: "",
    tipoServico: "",
    descricaoDetalhada: "",
    localExecucao: "",
    prazoExecucao: "",
    dataInicio: "",
    valorTotal: "",
    formaPagamento: "",
    observacoes: ""
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field: keyof ContratoData, value: string) => {
    setContratoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const gerarContratoPDF = () => {
    const pdf = new jsPDF();
    
    // Configurações do PDF
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = 30;
    
    // Função para adicionar texto com quebra de linha
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const { fontSize = 10, fontStyle = 'normal', maxWidth = pageWidth - 2 * margin } = options;
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };
    
    // Função para verificar se precisa de nova página
    const checkNewPage = (currentY: number, nextItemHeight: number = 20) => {
      if (currentY + nextItemHeight > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        return 30; // Reset Y position
      }
      return currentY;
    };
    
    // Título
    yPosition = addText('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', pageWidth/2, yPosition, { 
      fontSize: 16, 
      fontStyle: 'bold' 
    });
    pdf.setTextColor(0, 0, 0);
    yPosition += 10;
    
    // CONTRATANTE
    yPosition = checkNewPage(yPosition);
    yPosition = addText('CONTRATANTE:', margin, yPosition, { fontSize: 12, fontStyle: 'bold' });
    yPosition += 5;
    
    yPosition = addText(`Nome: ${contratoData.contratanteNome}`, margin, yPosition);
    yPosition = addText(`CPF: ${contratoData.contratanteCpf}`, margin, yPosition);
    if (contratoData.contratanteRg) {
      yPosition = addText(`RG: ${contratoData.contratanteRg}`, margin, yPosition);
    }
    yPosition = addText(`Endereço: ${contratoData.contratanteEndereco}`, margin, yPosition);
    if (contratoData.contratanteTelefone) {
      yPosition = addText(`Telefone: ${contratoData.contratanteTelefone}`, margin, yPosition);
    }
    if (contratoData.contratanteEmail) {
      yPosition = addText(`E-mail: ${contratoData.contratanteEmail}`, margin, yPosition);
    }
    yPosition += 10;
    
    // CONTRATADO
    yPosition = checkNewPage(yPosition);
    yPosition = addText('CONTRATADO:', margin, yPosition, { fontSize: 12, fontStyle: 'bold' });
    yPosition += 5;
    
    yPosition = addText(`Nome: ${contratoData.contratadoNome}`, margin, yPosition);
    yPosition = addText(`CPF/CNPJ: ${contratoData.contratadoCpfCnpj}`, margin, yPosition);
    if (contratoData.contratadoRg) {
      yPosition = addText(`RG: ${contratoData.contratadoRg}`, margin, yPosition);
    }
    yPosition = addText(`Endereço: ${contratoData.contratadoEndereco}`, margin, yPosition);
    if (contratoData.contratadoTelefone) {
      yPosition = addText(`Telefone: ${contratoData.contratadoTelefone}`, margin, yPosition);
    }
    if (contratoData.contratadoEmail) {
      yPosition = addText(`E-mail: ${contratoData.contratadoEmail}`, margin, yPosition);
    }
    yPosition += 10;
    
    // OBJETO DO CONTRATO
    yPosition = checkNewPage(yPosition);
    yPosition = addText('OBJETO DO CONTRATO:', margin, yPosition, { fontSize: 12, fontStyle: 'bold' });
    yPosition += 5;
    
    yPosition = addText(`1. SERVIÇO: ${contratoData.tipoServico}`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText(`2. DESCRIÇÃO DETALHADA: ${contratoData.descricaoDetalhada}`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText(`3. LOCAL DE EXECUÇÃO: ${contratoData.localExecucao}`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 10;
    
    // CONDIÇÕES
    yPosition = checkNewPage(yPosition);
    yPosition = addText('CONDIÇÕES:', margin, yPosition, { fontSize: 12, fontStyle: 'bold' });
    yPosition += 5;
    
    const dataInicio = contratoData.dataInicio ? ` com início em ${new Date(contratoData.dataInicio).toLocaleDateString('pt-BR')}` : '';
    yPosition = addText(`4. PRAZO: O serviço deverá ser executado no prazo de ${contratoData.prazoExecucao}${dataInicio}.`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText(`5. VALOR: O valor total dos serviços é de R$ ${contratoData.valorTotal}.`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText(`6. FORMA DE PAGAMENTO: ${contratoData.formaPagamento}.`, margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText('7. RESPONSABILIDADES: O CONTRATADO se compromete a executar os serviços com qualidade e dentro do prazo estabelecido, fornecendo materiais de primeira qualidade quando especificado.', margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    yPosition = addText('8. GARANTIA: Os serviços possuem garantia de 90 (noventa) dias contra defeitos de execução.', margin, yPosition, { fontStyle: 'bold' });
    yPosition += 3;
    
    if (contratoData.observacoes) {
      yPosition = addText(`9. OBSERVAÇÕES: ${contratoData.observacoes}`, margin, yPosition, { fontStyle: 'bold' });
      yPosition += 5;
    }
    
    // Cláusula final
    yPosition = checkNewPage(yPosition, 30);
    yPosition = addText('E por estarem assim justos e contratados, assinam o presente instrumento em duas vias de igual teor.', margin, yPosition);
    yPosition += 15;
    
    // Data
    yPosition = addText(`Porto Velho - RO, ${new Date().toLocaleDateString('pt-BR')}`, pageWidth/2, yPosition, { fontStyle: 'bold' });
    yPosition += 25;
    
    // Assinaturas
    yPosition = checkNewPage(yPosition, 40);
    const signatureY = yPosition;
    
    // Linha para assinatura do contratante
    pdf.line(margin, signatureY, (pageWidth/2) - 10, signatureY);
    yPosition = addText('CONTRATANTE', margin + 20, signatureY + 10, { fontStyle: 'bold' });
    yPosition = addText(contratoData.contratanteNome, margin + 20, signatureY + 17);
    
    // Linha para assinatura do contratado
    pdf.line((pageWidth/2) + 10, signatureY, pageWidth - margin, signatureY);
    addText('CONTRATADO', (pageWidth/2) + 30, signatureY + 10, { fontStyle: 'bold' });
    addText(contratoData.contratadoNome, (pageWidth/2) + 30, signatureY + 17);
    
    // Rodapé
    const footerY = pdf.internal.pageSize.getHeight() - 20;
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Contrato gerado através da plataforma ConectaPro', pageWidth/2, footerY, { align: 'center' });
    pdf.text('www.conectapro.app - Conectando profissionais em Porto Velho', pageWidth/2, footerY + 5, { align: 'center' });
    
    // Salvar o PDF
    const fileName = `contrato-${contratoData.contratanteNome.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    pdf.save(fileName);
    
    alert('Contrato PDF gerado com sucesso! 📄✅');
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return contratoData.contratanteNome && contratoData.contratanteCpf && contratoData.contratanteEndereco;
      case 2:
        return contratoData.contratadoNome && contratoData.contratadoCpfCnpj && contratoData.contratadoEndereco;
      case 3:
        return contratoData.tipoServico && contratoData.descricaoDetalhada && contratoData.localExecucao;
      case 4:
        return contratoData.valorTotal && contratoData.formaPagamento && contratoData.prazoExecucao;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FaFileContract className="text-4xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Gerador de Contrato</h1>
          </div>
          <p className="text-gray-600">
            Crie contratos profissionais de prestação de serviços de forma rápida e segura
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm text-gray-600">{step}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Dados do Contratante */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Contratante (Cliente)</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteNome}
                    onChange={(e) => handleInputChange('contratanteNome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: João Silva Santos"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CPF *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteCpf}
                    onChange={(e) => handleInputChange('contratanteCpf', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">RG</label>
                  <input
                    type="text"
                    value={contratoData.contratanteRg}
                    onChange={(e) => handleInputChange('contratanteRg', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0000000 SSP/RO"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input
                    type="text"
                    value={contratoData.contratanteTelefone}
                    onChange={(e) => handleInputChange('contratanteTelefone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(69) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Endereço Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteEndereco}
                    onChange={(e) => handleInputChange('contratanteEndereco', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rua, número, bairro, cidade - RO, CEP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    value={contratoData.contratanteEmail}
                    onChange={(e) => handleInputChange('contratanteEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cliente@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados do Contratado */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaBuilding className="text-2xl text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Contratado (Profissional)</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo/Razão Social *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoNome}
                    onChange={(e) => handleInputChange('contratadoNome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: Maria Construções Ltda"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CPF/CNPJ *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoCpfCnpj}
                    onChange={(e) => handleInputChange('contratadoCpfCnpj', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="000.000.000-00 ou 00.000.000/0001-00"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">RG/Inscrição Estadual</label>
                  <input
                    type="text"
                    value={contratoData.contratadoRg}
                    onChange={(e) => handleInputChange('contratadoRg', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0000000 SSP/RO"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input
                    type="text"
                    value={contratoData.contratadoTelefone}
                    onChange={(e) => handleInputChange('contratadoTelefone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="(69) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Endereço Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoEndereco}
                    onChange={(e) => handleInputChange('contratadoEndereco', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Rua, número, bairro, cidade - RO, CEP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    value={contratoData.contratadoEmail}
                    onChange={(e) => handleInputChange('contratadoEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="profissional@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dados do Serviço */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaClipboardList className="text-2xl text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Serviço</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tipo de Serviço *</label>
                  <select
                    value={contratoData.tipoServico}
                    onChange={(e) => handleInputChange('tipoServico', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione o tipo de serviço</option>
                    <option value="Alvenaria">Alvenaria</option>
                    <option value="Contra-Piso">Contra-Piso</option>
                    <option value="Forro de Gesso">Forro de Gesso</option>
                    <option value="Instalações Elétricas">Instalações Elétricas</option>
                    <option value="Instalações Hidráulicas">Instalações Hidráulicas</option>
                    <option value="Pintura">Pintura</option>
                    <option value="Revestimento Cerâmico">Revestimento Cerâmico</option>
                    <option value="Reforma Geral">Reforma Geral</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Descrição Detalhada do Serviço *</label>
                  <textarea
                    value={contratoData.descricaoDetalhada}
                    onChange={(e) => handleInputChange('descricaoDetalhada', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva detalhadamente o serviço a ser executado, incluindo materiais, especificações técnicas, etc."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Local de Execução *</label>
                  <input
                    type="text"
                    value={contratoData.localExecucao}
                    onChange={(e) => handleInputChange('localExecucao', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Endereço onde o serviço será executado"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Data de Início</label>
                  <input
                    type="date"
                    value={contratoData.dataInicio}
                    onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Condições Financeiras */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaDollarSign className="text-2xl text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Condições Financeiras e Prazo</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Valor Total *</label>
                    <input
                      type="text"
                      value={contratoData.valorTotal}
                      onChange={(e) => handleInputChange('valorTotal', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="5.000,00"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Prazo de Execução *</label>
                    <input
                      type="text"
                      value={contratoData.prazoExecucao}
                      onChange={(e) => handleInputChange('prazoExecucao', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: 15 dias úteis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Forma de Pagamento *</label>
                  <textarea
                    value={contratoData.formaPagamento}
                    onChange={(e) => handleInputChange('formaPagamento', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 50% na assinatura do contrato e 50% na conclusão dos serviços"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Observações Adicionais</label>
                  <textarea
                    value={contratoData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Observações especiais, cláusulas adicionais, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                step === 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              ← Anterior
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próximo →
              </button>
            ) : (
              <button
                onClick={gerarContratoPDF}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed() 
                    ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaDownload />
                Gerar Contrato
              </button>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">💡 Sobre o Gerador de Contratos</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• <strong>Gratuito:</strong> Ferramenta 100% gratuita para profissionais e clientes</li>
            <li>• <strong>Personalizado:</strong> Contrato adaptado às suas necessidades específicas</li>
            <li>• <strong>Profissional:</strong> Modelo baseado em boas práticas jurídicas</li>
            <li>• <strong>Seguro:</strong> Seus dados não são armazenados em nossos servidores</li>
            <li>• <strong>Prático:</strong> Gera arquivo HTML que pode ser convertido em PDF</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 