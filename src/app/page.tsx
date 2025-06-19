"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
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

      {/* Header Hero */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-element">
            Encontre Mão de Obra Rápido e Sem Complicação
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light max-w-3xl mx-auto fade-in-element">
            Conectamos você aos melhores profissionais da construção civil em <strong>Porto Velho - RO</strong> de forma simples, direta e sem burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center fade-in-element">
            <Link 
              href="/cadastro-profissional"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              👷 Sou Profissional
            </Link>
            <Link 
              href="/buscar-profissional"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              🔍 Preciso de um Profissional
            </Link>
          </div>
        </div>
      </header>

      {/* Por que usar o ConectaPro */}
      <section className="py-20 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center fade-in-element">
          Por que usar o ConectaPro?
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto fade-in-element">
          A plataforma que conecta quem faz com quem precisa, de forma direta e sem intermediários em Porto Velho.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <BenefitCard 
            icon="⚡"
            title="Fácil de Usar"
            description="Encontre ou ofereça serviços em poucos cliques. Interface simples e intuitiva para todos."
          />
          <BenefitCard 
            icon="💬"
            title="Contato Direto"
            description="Fale diretamente com o profissional ou cliente via WhatsApp. Sem intermediários, sem complicação."
          />
          <BenefitCard 
            icon="✅"
            title="Profissionais Verificados"
            description="Trabalhamos para oferecer qualidade e confiança. Profissionais avaliados pela comunidade."
          />
          <BenefitCard 
            icon="💰"
            title="Sem Taxas Ocultas"
            description="100% gratuito para usar. Sem comissão, sem taxas, sem pegadinhas. Economia real para você."
          />
          <BenefitCard 
            icon="📍"
            title="Atendimento Local"
            description="Conectamos você com profissionais da sua região em Porto Velho. Rapidez e proximidade."
          />
          <BenefitCard 
            icon="🚀"
            title="Resultados Rápidos"
            description="Encontre ou seja encontrado em minutos. Nossa plataforma conecta você na hora certa."
          />
          <BenefitCard 
            icon="🧮"
            title="Calculadora de Orçamento"
            description="Estime custos de materiais e mão de obra antes de contratar. Planeje seu projeto com precisão."
            link="/calculadora-orcamento"
          />
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-gray-50 py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center fade-in-element">
            Como Funciona
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto fade-in-element">
            Em apenas 3 passos simples, você encontra o profissional ideal ou oferece seus serviços.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <StepCard 
              number="1"
              title="Escolha sua Opção"
              description="Cadastre-se como profissional para oferecer seus serviços ou como cliente para encontrar quem precisa."
            />
            <StepCard 
              number="2"
              title="Conecte-se"
              description="Faça seu pedido ou ofereça seu serviço. Nossa plataforma conecta você automaticamente com a pessoa certa."
            />
            <StepCard 
              number="3"
              title="Feche Negócio"
              description="Converse diretamente pelo WhatsApp, acerte os detalhes e feche o negócio. Simples assim!"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center fade-in-element">
          Quem Usa, Recomenda
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto fade-in-element">
          Veja o que nossos usuários estão falando sobre o ConectaPro em Porto Velho.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <TestimonialCard 
            text="Encontrei um pedreiro excelente em menos de uma hora. O trabalho ficou perfeito e o preço justo. Muito fácil de usar!"
            author="Marcos Silva, Vila Tupi"
          />
          <TestimonialCard 
            text="Graças ao ConectaPro, fechei três reformas esse mês. A plataforma é sensacional para quem é profissional sério."
            author="Juliana Rodrigues, Pedreiro"
          />
          <TestimonialCard 
            text="Precisava de um eletricista urgente e encontrei na mesma hora. Profissional pontual e competente. Recomendo!"
            author="Roberto Santos, Centro"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-5 mx-5 rounded-3xl shadow-lg my-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 fade-in-element">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto fade-in-element">
            Cadastre-se agora como profissional e receba mais serviços, ou encontre um profissional qualificado para sua obra ou reforma em Porto Velho.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center fade-in-element">
            <Link 
              href="/cadastro-profissional"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              👷 Cadastrar como Profissional
            </Link>
            <Link 
              href="/buscar-profissional"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              🔍 Buscar Profissional
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Componente para os cards de benefícios
function BenefitCard({ icon, title, description, link }: { icon: string; title: string; description: string; link?: string }) {
  const content = (
    <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100 fade-in-element">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-600 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      {link && (
        <div className="mt-4">
          <span className="text-blue-600 font-semibold hover:text-blue-700">
            Experimentar →
          </span>
        </div>
      )}
    </div>
  );

  return link ? (
    <Link href={link} className="block">
      {content}
    </Link>
  ) : content;
}

// Componente para os steps
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl text-center shadow-lg border-l-4 border-blue-600 fade-in-element">
      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-blue-600 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Componente para testimonials
function TestimonialCard({ text, author }: { text: string; author: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative fade-in-element">
      <div className="text-6xl opacity-30 absolute top-4 left-6">&ldquo;</div>
      <p className="text-lg leading-relaxed mb-6 relative z-10">{text}</p>
      <p className="font-semibold text-blue-100">— {author}</p>
    </div>
  );
}
