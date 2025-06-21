"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaUsers, FaHandshake, FaRocket, FaShieldAlt } from "react-icons/fa";

export const metadata = {
  title: "Sobre o ConectaPro - Plataforma de Profissionais da Construção",
  description: "Conheça a história do ConectaPro: plataforma 100% gratuita que conecta profissionais da construção civil com clientes em Porto Velho-RO. Sem taxas, sem intermediários!",
  keywords: "sobre conectapro, história conectapro, plataforma construção civil porto velho, marketplace profissionais",
};

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
    <>
      {/* CSS personalizado para animações */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Header Hero */}
        <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-6 fade-in-element">
              <Image 
                src="/conectapro.png" 
                alt="Logo ConectaPro" 
                width={120} 
                height={120} 
                className="mx-auto mb-4 drop-shadow-lg" 
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-element">
              🏗️ Sobre o ConectaPro
            </h1>
            <p className="text-xl md:text-2xl mb-10 font-light fade-in-element">
              Conectando profissionais da construção com oportunidades em <strong>Porto Velho - RO</strong>
            </p>
            
            <div className="max-w-2xl mx-auto fade-in-element">
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-lg">
                  Uma plataforma gratuita criada para facilitar o encontro entre profissionais da construção e clientes que precisam de serviços de qualidade.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Seção Principal */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            
            {/* O que é o ConectaPro */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 fade-in-element">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">O que é o ConectaPro?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  O <strong>ConectaPro</strong> é uma plataforma digital gratuita que conecta profissionais da construção civil a clientes que precisam de serviços. Nosso objetivo é facilitar o encontro entre quem precisa trabalhar e quem precisa contratar, de forma simples, rápida e segura.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Para Profissionais</h3>
                  <p className="text-gray-600">Mais visibilidade, mais clientes, mais oportunidades de trabalho</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FaHandshake className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Para Clientes</h3>
                  <p className="text-gray-600">Encontre profissionais qualificados e confiáveis perto de você</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Porto Velho</h3>
                  <p className="text-gray-600">Focado na região de Porto Velho, conectando nossa comunidade</p>
                </div>
              </div>
            </div>

            {/* Como Funciona */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 fade-in-element">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Como Funciona?</h2>
                <p className="text-xl text-gray-600">Um processo simples em 4 passos</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Cadastro Fácil</h3>
                  <p className="text-gray-600 text-sm">O profissional se cadastra informando seus serviços, bairro e contato</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 text-center">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Portfólio</h3>
                  <p className="text-gray-600 text-sm">Envie fotos dos seus trabalhos para mostrar a qualidade dos seus serviços</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 text-center">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Visibilidade</h3>
                  <p className="text-gray-600 text-sm">Seu perfil aparece nas buscas, facilitando ser encontrado por clientes</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 text-center">
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Contato Direto</h3>
                  <p className="text-gray-600 text-sm">Cliente entra em contato direto via WhatsApp, sem intermediários</p>
                </div>
              </div>
            </div>

            {/* Por que usar */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 fade-in-element">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Por que usar o ConectaPro?</h2>
                <p className="text-xl text-gray-600">Vantagens para profissionais e clientes</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaRocket className="text-2xl text-blue-600" />
                    <h3 className="font-bold text-gray-800">Mais Oportunidades</h3>
                  </div>
                  <p className="text-gray-600">Alcance mais clientes e aumente suas oportunidades de trabalho</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaShieldAlt className="text-2xl text-green-600" />
                    <h3 className="font-bold text-gray-800">Divulgação Gratuita</h3>
                  </div>
                  <p className="text-gray-600">Divulgue seus serviços sem custo algum na nossa plataforma</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaWhatsapp className="text-2xl text-green-500" />
                    <h3 className="font-bold text-gray-800">Contato Direto</h3>
                  </div>
                  <p className="text-gray-600">Comunicação direta via WhatsApp entre profissional e cliente</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaUsers className="text-2xl text-yellow-600" />
                    <h3 className="font-bold text-gray-800">Apoio Personalizado</h3>
                  </div>
                  <p className="text-gray-600">Nossa equipe ajuda você no cadastro e tira suas dúvidas</p>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaHandshake className="text-2xl text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Plataforma Simples</h3>
                  </div>
                  <p className="text-gray-600">Interface fácil de usar, feita para todos os níveis de tecnologia</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FaMapMarkerAlt className="text-2xl text-red-600" />
                    <h3 className="font-bold text-gray-800">Foco Local</h3>
                  </div>
                  <p className="text-gray-600">Especializado em Porto Velho, conhecendo as necessidades locais</p>
                </div>
              </div>
            </div>

            {/* Como se cadastrar */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white mb-12 fade-in-element">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Como se Cadastrar?</h2>
                <p className="text-xl opacity-90">É fácil e rápido! Escolha a melhor forma para você:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🌐 Online
                  </h3>
                  <p className="mb-4 opacity-90">
                    Acesse nosso site e faça seu cadastro de forma autônoma
                  </p>
                  <Link 
                    href="/cadastro-profissional"
                    className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-block"
                  >
                    Cadastrar Agora
                  </Link>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    📞 Com Ajuda
                  </h3>
                  <p className="mb-4 opacity-90">
                    Nossa equipe te ajuda no cadastro via WhatsApp ou telefone
                  </p>
                  <a 
                    href="https://wa.me/5569999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <FaWhatsapp /> Falar Conosco
                  </a>
                </div>
              </div>
            </div>

            {/* Quem somos */}
            <div className="bg-white rounded-3xl shadow-xl p-8 fade-in-element">
              <div className="text-center mb-8">
                <Image 
                  src="/conectapro.png" 
                  alt="Logo ConectaPro" 
                  width={80} 
                  height={80} 
                  className="mx-auto mb-4" 
                />
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Quem Faz o ConectaPro?</h2>
              </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl text-gray-600 mb-8">
                  Somos uma equipe comprometida em ajudar profissionais da construção a conseguirem mais trabalho e clientes a encontrarem serviços de qualidade. Nossa missão é democratizar o acesso a oportunidades e facilitar conexões que geram resultados reais.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-2">Nosso Compromisso</h3>
                    <p className="text-gray-600">Inclusão e simplicidade para todos</p>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-2">Nossa Missão</h3>
                    <p className="text-gray-600">Conectar talentos com oportunidades</p>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-2">Nosso Foco</h3>
                    <p className="text-gray-600">Resultados reais para nossa comunidade</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <p className="text-lg font-semibold text-blue-700">
                    💪 ConectaPro — Juntos, construindo oportunidades em Porto Velho!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-16 px-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center fade-in-element">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se aos profissionais que já estão conectados com mais oportunidades
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/cadastro-profissional"
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                👷 Cadastrar como Profissional
              </Link>
              <Link 
                href="/buscar-profissional"
                className="bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                🔍 Buscar Profissionais
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}