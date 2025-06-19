"use client";
import Image from "next/image";
import Link from "next/link";

const postsBlog = [
  {
    id: 1,
    titulo: "5 Dicas para Não Ser Enganado na Obra",
    resumo: "Orientações práticas para evitar golpes, atrasos e cobranças abusivas na construção civil. Proteja seu investimento!",
    data: "20 de Janeiro, 2025",
    categoria: "Proteção",
    imagem: "/conectapro.png",
    cta: "Quer contratar um profissional de confiança em Porto Velho? Clique aqui e fale direto com quem faz!"
  },
  {
    id: 2,
    titulo: "Quanto Custa um Pedreiro em Porto Velho Hoje?",
    resumo: "Explicação sobre média de preços, variações por tipo de serviço e como negociar sem intermediários na capital de Rondônia.",
    data: "18 de Janeiro, 2025",
    categoria: "Preços",
    imagem: "/conectapro.png",
    cta: "Precisa de um pedreiro? Converse com a gente pelo WhatsApp e encontre o profissional ideal!"
  },
  {
    id: 3,
    titulo: "Qual a Diferença entre Servente, Ajudante e Pedreiro?",
    resumo: "Texto educativo que esclarece as funções e responsabilidades de cada profissional, ajudando o cliente a contratar certo.",
    data: "16 de Janeiro, 2025",
    categoria: "Educativo",
    imagem: "/conectapro.png",
    cta: "Tem dúvidas técnicas? Converse com a equipe técnica da ConectaPro para tirar suas dúvidas!"
  },
  {
    id: 4,
    titulo: "Como Fazer um Orçamento Certo para Não Estourar o Custo da Obra?",
    resumo: "Guia passo a passo para planejar e controlar gastos, evitando surpresas desagradáveis no meio da obra.",
    data: "14 de Janeiro, 2025",
    categoria: "Planejamento",
    imagem: "/conectapro.png",
    cta: "Gostou das dicas? Agora é hora de colocar em prática! Clique aqui para falar direto com os profissionais!"
  },
  {
    id: 5,
    titulo: "Como Contratar um Bom Pintor em Porto Velho, Sem Erro?",
    resumo: "Dicas específicas para escolher pintores qualificados e confiáveis, incluindo perguntas importantes para fazer.",
    data: "12 de Janeiro, 2025",
    categoria: "Contratação",
    imagem: "/conectapro.png",
    cta: "Precisa de um pintor de confiança? Fale direto com profissionais qualificados em Porto Velho!"
  },
  {
    id: 6,
    titulo: "Benefícios de Contratar Profissionais Direto, Sem Taxa e Sem Intermediário",
    resumo: "Explicação das vantagens de usar o ConectaPro: economia, transparência e contato direto com quem faz o trabalho.",
    data: "10 de Janeiro, 2025",
    categoria: "ConectaPro",
    imagem: "/conectapro.png",
    cta: "Experimente a diferença! Contrate sem taxa, sem atravessador. 100% gratuito em Porto Velho!"
  },
  {
    id: 7,
    titulo: "Cuidados Essenciais na Contratação de Eletricistas e Encanadores",
    resumo: "Alertas importantes sobre segurança, certificações e cuidados na contratação desses profissionais especializados.",
    data: "8 de Janeiro, 2025",
    categoria: "Segurança",
    imagem: "/conectapro.png",
    cta: "Precisa de eletricista ou encanador certificado? Encontre profissionais qualificados aqui!"
  },
  {
    id: 8,
    titulo: "Como Preparar sua Obra para a Chegada do Pedreiro",
    resumo: "Orientações sobre o que deixar pronto para otimizar o trabalho do profissional e agilizar sua obra.",
    data: "6 de Janeiro, 2025",
    categoria: "Preparação",
    imagem: "/conectapro.png",
    cta: "Obra organizada, resultado garantido! Encontre o pedreiro ideal para seu projeto!"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header da página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog ConectaPro</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dicas práticas para construção e reforma em <strong>Porto Velho - RO</strong>. 
            Orientações para contratar profissionais qualificados, sem taxa e sem intermediário.
          </p>
          <div className="mt-4 text-sm text-blue-600 font-medium">
            📍 Serviço direto, sem taxa, sem atravessador. 100% gratuito em Porto Velho - RO.
          </div>
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {postsBlog.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image 
                  src={post.imagem} 
                  alt={post.titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.categoria}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>📅</span>
                  <span>{post.data}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {post.titulo}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.resumo}
                </p>
                
                <Link 
                  href="/buscar-profissional" 
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors inline-block"
                >
                  {post.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Call to action principal */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🏗️ Precisa de um Profissional em Porto Velho?
          </h2>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            <strong>Quem faz, quem precisa.</strong> Encontre pedreiros, pintores, eletricistas e encanadores qualificados. 
            Serviço direto, sem taxa e sem intermediário. 100% gratuito em Porto Velho - RO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link 
              href="/buscar-profissional"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🔍 Buscar Profissional
            </Link>
            <Link 
              href="/cadastro-profissional"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              👷 Sou Profissional
            </Link>
          </div>
          
          {/* CTAs específicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                💬 Converse direto pelo WhatsApp e encontre o profissional ideal para seu projeto!
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                🤝 Tem dúvidas técnicas? Nossa equipe está pronta para te orientar!
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter e relacionamento */}
        <div className="mt-12 bg-gray-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-4">📧 Newsletter ConectaPro - Porto Velho</h3>
          <p className="text-gray-300 mb-6">
            Receba dicas exclusivas sobre construção civil, preços atualizados de Porto Velho e novidades sobre profissionais qualificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Inscrever
            </button>
          </div>
          
          {/* Estratégia de relacionamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-lg mb-2">📱</div>
              <p className="text-gray-300">
                <strong>WhatsApp Business</strong><br/>
                Atendimento direto e grupos organizados por categoria
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-lg mb-2">⭐</div>
              <p className="text-gray-300">
                <strong>Pós-Serviço</strong><br/>
                Acompanhamento e coleta de feedback para melhoria contínua
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-lg mb-2">🤝</div>
              <p className="text-gray-300">
                <strong>Parcerias Locais</strong><br/>
                Conexões com depósitos e lojas de materiais em Porto Velho
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 