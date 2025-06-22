"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaUsers, FaHandshake, FaRocket, FaShieldAlt } from "react-icons/fa";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

export default function Sobre() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Configuração do observer para animações
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observar todos os elementos com a classe de animação
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <PageLayout 
      title="🏗️ Sobre o ConectaPro"
      subtitle="Conectando profissionais da construção com oportunidades em Porto Velho - RO"
    >
      {/* Seção principal de apresentação */}
      <PageCard>
        <div className="text-center mb-8">
          <Image 
            src="/conectapro.png" 
            alt="Logo ConectaPro" 
            width={120} 
            height={120} 
            className="mx-auto mb-6 drop-shadow-lg" 
          />
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">O que é o ConectaPro?</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            O <strong>ConectaPro</strong> é uma plataforma digital gratuita que conecta profissionais da construção civil a clientes que precisam de serviços. Nosso objetivo é facilitar o encontro entre quem precisa trabalhar e quem precisa contratar, de forma simples, rápida e segura.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl cp-bg-figma-light">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUsers className="text-3xl" style={{ color: 'var(--figma-color-1)' }} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Para Profissionais</h3>
            <p className="text-gray-600">Mais visibilidade, mais clientes, mais oportunidades de trabalho</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl cp-bg-figma-light">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaHandshake className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Para Clientes</h3>
            <p className="text-gray-600">Encontre profissionais qualificados e confiáveis perto de você</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl cp-bg-figma-light">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaMapMarkerAlt className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Porto Velho</h3>
            <p className="text-gray-600">Focado na região de Porto Velho, conectando nossa comunidade</p>
          </div>
        </div>
      </PageCard>

      {/* Como Funciona */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">Como Funciona?</h2>
          <p className="text-xl text-gray-600">Um processo simples em 4 passos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cp-bg-figma-light rounded-2xl p-6 text-center cp-border-figma">
            <div className="cp-gradient-figma-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Cadastro Fácil</h3>
            <p className="text-gray-600 text-sm">O profissional se cadastra informando seus serviços, bairro e contato</p>
          </div>
          
          <div className="cp-bg-figma-light rounded-2xl p-6 text-center cp-border-figma">
            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Portfólio</h3>
            <p className="text-gray-600 text-sm">Envie fotos dos seus trabalhos para mostrar a qualidade dos seus serviços</p>
          </div>
          
          <div className="cp-bg-figma-light rounded-2xl p-6 text-center cp-border-figma">
            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Visibilidade</h3>
            <p className="text-gray-600 text-sm">Seu perfil aparece nas buscas, facilitando ser encontrado por clientes</p>
          </div>
          
          <div className="cp-bg-figma-light rounded-2xl p-6 text-center cp-border-figma">
            <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Contato Direto</h3>
            <p className="text-gray-600 text-sm">Cliente entra em contato direto via WhatsApp, sem intermediários</p>
          </div>
        </div>
      </PageCard>

      {/* Por que usar */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">Por que usar o ConectaPro?</h2>
          <p className="text-xl text-gray-600">Vantagens para profissionais e clientes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="cp-bg-figma-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaRocket className="text-2xl" style={{ color: 'var(--figma-color-1)' }} />
              <h3 className="font-bold text-gray-800">Mais Oportunidades</h3>
            </div>
            <p className="text-gray-600">Alcance mais clientes e aumente suas oportunidades de trabalho</p>
          </div>
          
          <div className="cp-bg-figma-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaShieldAlt className="text-2xl text-green-600" />
              <h3 className="font-bold text-gray-800">Divulgação Gratuita</h3>
            </div>
            <p className="text-gray-600">Divulgue seus serviços sem custo algum na nossa plataforma</p>
          </div>

          <div className="cp-bg-figma-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaWhatsapp className="text-2xl text-green-500" />
              <h3 className="font-bold text-gray-800">Contato Direto</h3>
            </div>
            <p className="text-gray-600">Comunicação direta via WhatsApp, sem intermediários ou taxas</p>
          </div>
        </div>
      </PageCard>

      {/* Missão, Visão e Valores */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">Nossa Missão</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Facilitar o encontro entre profissionais da construção civil e clientes em Porto Velho, 
            promovendo o desenvolvimento local e a qualidade dos serviços prestados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold cp-text-gradient mb-4">🎯 Nossa Visão</h3>
            <p className="text-gray-600 leading-relaxed">
              Ser a principal plataforma de conexão de profissionais da construção em Rondônia, 
              reconhecida pela qualidade e confiabilidade.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold cp-text-gradient mb-4">💎 Nossos Valores</h3>
            <ul className="text-gray-600 space-y-2">
              <li>🤝 <strong>Transparência</strong> - Informações claras e honestas</li>
              <li>🎯 <strong>Qualidade</strong> - Foco nos melhores profissionais</li>
              <li>🌱 <strong>Crescimento Local</strong> - Fortalecendo Porto Velho</li>
              <li>🚀 <strong>Inovação</strong> - Tecnologia a serviço da construção</li>
            </ul>
          </div>
        </div>
      </PageCard>

      {/* CTA Final */}
      <PageCard>
        <div className="text-center">
          <h2 className="text-3xl font-bold cp-text-gradient mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se à maior plataforma de profissionais da construção de Porto Velho
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <PageButton href="/cadastro-profissional" variant="primary">
              👷 Sou Profissional
            </PageButton>
            <PageButton href="/buscar-profissional" variant="secondary">
              🔍 Buscar Profissionais
            </PageButton>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              📍 Atendemos toda a região metropolitana de Porto Velho-RO
            </p>
            <p className="text-gray-500 text-sm mt-2">
              📞 Dúvidas? Entre em contato: (69) 99370-5343
            </p>
          </div>
        </div>
      </PageCard>
    </PageLayout>
  );
}