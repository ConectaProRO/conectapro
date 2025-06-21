"use client";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog ConectaPro - Dicas de Construção Civil em Porto Velho-RO",
  description: "Artigos e dicas sobre construção civil, reforma, tabela SINAPI, preços de materiais e contratação de profissionais em Porto Velho-RO. Conteúdo gratuito para seu projeto!",
  keywords: "blog construção civil, dicas reforma porto velho, tabela sinapi rondônia, preços construção porto velho, como contratar pedreiro",
};

const postsBlog = [
  {
    id: 1,
    titulo: "Como Surgiu a ConectaPro? A História por Trás da Plataforma",
    resumo: "Descubra a origem da ConectaPro: nasceu da experiência real em obras, da necessidade de profissionais e da falta de transparência no mercado da construção civil em Porto Velho.",
    data: "22 de Janeiro, 2025",
    categoria: "História",
    imagem: "/conectapro.png",
    cta: "Conhece nossa história? Agora faça parte dela! Encontre profissionais qualificados ou cadastre-se como profissional."
  },
  {
    id: 2,
    titulo: "Tabela SINAPI Porto Velho 2025: Preços Oficiais vs Mercado Local",
    resumo: "Entenda a tabela SINAPI 2025, compare preços oficiais com mercado local de Porto Velho e descubra quanto custa contratar pedreiro, pintor, eletricista e encanador em Rondônia.",
    data: "22 de Janeiro, 2025",
    categoria: "Preços",
    imagem: "/conectapro.png",
    cta: "Domine os preços da construção civil! Use nossas calculadoras SINAPI gratuitas."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                  href={
                    post.id === 1 ? "/blog/como-surgiu-a-conectapro" : 
                    post.id === 2 ? "/blog/o-que-e-tabela-sinapi" : 
                    "/buscar-profissional"
                  }
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors inline-block"
                >
                  {post.id === 1 ? "Leia a história completa →" : 
                   post.id === 2 ? "Entenda a tabela SINAPI →" : 
                   post.cta}
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