"use client";
import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaWhatsapp, FaStar, FaHandshake, FaTools } from "react-icons/fa";
import PageLayout, { PageCard } from "../../../components/PageLayout";

export default function DicasConseguirClientesPage() {
  return (
    <PageLayout 
      title="💼 5 Dicas para Conseguir Mais Clientes"
      subtitle="Estratégias práticas para profissionais da construção civil"
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
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Dicas Profissionais
            </div>
            <h1 className="text-4xl font-bold cp-text-gradient mb-4">
              5 Dicas para Profissionais da Construção Conseguirem Mais Clientes
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
              <span>📅 18 de Janeiro, 2025</span>
              <span>⏱️ 6 min de leitura</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-800 font-medium">
              💡 <strong>Resumo:</strong> Neste artigo, você vai descobrir 5 estratégias práticas 
              e comprovadas para aumentar sua carteira de clientes na construção civil. 
              Desde marketing pessoal até excelência no atendimento.
            </p>
          </div>

          <div className="space-y-8">
            {/* Dica 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. Construa uma Presença Digital Profissional
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Hoje em dia, a primeira impressão acontece online. Ter uma presença digital 
                profissional é essencial para conquistar a confiança dos clientes.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">✅ O que fazer:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cadastre-se na ConectaPro com fotos profissionais</li>
                  <li>• Crie perfis no WhatsApp Business e Instagram</li>
                  <li>• Mantenha informações sempre atualizadas</li>
                  <li>• Publique fotos dos seus trabalhos regularmente</li>
                </ul>
              </div>
            </div>

            {/* Dica 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Use o WhatsApp de Forma Estratégica
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                O WhatsApp é a ferramenta de comunicação mais usada no Brasil. 
                Saber usá-lo profissionalmente pode fazer toda a diferença.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">✅ Dicas práticas:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Responda rapidamente (máximo 2 horas)</li>
                  <li>• Use mensagens de áudio para explicar orçamentos</li>
                  <li>• Envie fotos do progresso da obra</li>
                  <li>• Crie status mostrando seus trabalhos</li>
                </ul>
              </div>
            </div>

            {/* Dica 3 */}
            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Busque Avaliações e Depoimentos
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Avaliações positivas são a prova social mais poderosa. Elas convencem 
                novos clientes melhor que qualquer propaganda.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">✅ Como conseguir:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Peça avaliação ao final de cada trabalho</li>
                  <li>• Facilite o processo (link direto)</li>
                  <li>• Ofereça pequenos descontos por avaliações</li>
                  <li>• Use as avaliações em seu marketing</li>
                </ul>
              </div>
            </div>

            {/* Dica 4 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaHandshake className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Invista no Relacionamento com Clientes
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Clientes satisfeitos são sua melhor fonte de indicações. Um cliente 
                feliz pode trazer 3-5 novos clientes através de indicações.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">✅ Estratégias de relacionamento:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lembre de datas importantes (aniversários)</li>
                  <li>• Faça follow-up após a entrega da obra</li>
                  <li>• Ofereça garantia e pós-vendas</li>
                  <li>• Peça indicações de forma educada</li>
                </ul>
              </div>
            </div>

            {/* Dica 5 */}
            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaTools className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Especialize-se e Seja Referência
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                Em vez de fazer "de tudo um pouco", torne-se especialista em algo específico. 
                Especialistas cobram mais e são mais procurados.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">✅ Áreas para especialização:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reformas de banheiros e cozinhas</li>
                  <li>• Instalações elétricas residenciais</li>
                  <li>• Pintura decorativa e texturas</li>
                  <li>• Construção de muros e portões</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusão */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">🎯 Conclusão</h3>
            <p className="text-gray-700 text-center">
              Conseguir mais clientes na construção civil não é sorte - é estratégia! 
              Aplique essas 5 dicas consistentemente e você verá resultados em 30-60 dias. 
              Lembre-se: a qualidade do trabalho é fundamental, mas saber se comunicar 
              e se posicionar no mercado é o que diferencia profissionais de sucesso.
            </p>
          </div>
        </div>
      </PageCard>

      {/* Call to Action */}
      <PageCard className="text-center">
        <h3 className="text-2xl font-bold cp-text-gradient mb-4">
          🚀 Pronto para Conseguir Mais Clientes?
        </h3>
        <p className="text-gray-600 mb-6">
          Cadastre-se gratuitamente na ConectaPro e comece a aplicar essas dicas hoje mesmo!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/cadastro-profissional"
            className="cp-button-primary"
          >
            Cadastrar-se Gratuitamente
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