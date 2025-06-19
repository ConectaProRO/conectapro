"use client";
import Image from "next/image";
import Link from "next/link";

const postsBlog = [
  {
    id: 1,
    titulo: "Como Escolher o Profissional Certo para sua Obra",
    resumo: "Dicas essenciais para contratar profissionais qualificados e evitar problemas na sua construção ou reforma.",
    data: "15 de Janeiro, 2025",
    categoria: "Dicas",
    imagem: "/conectapro.png"
  },
  {
    id: 2,
    titulo: "Tendências da Construção Civil em 2025",
    resumo: "Conheça as principais inovações e tendências que estão transformando o setor da construção civil.",
    data: "10 de Janeiro, 2025",
    categoria: "Tendências",
    imagem: "/conectapro.png"
  },
  {
    id: 3,
    titulo: "Orçamento de Obra: Como Calcular Corretamente",
    resumo: "Aprenda a fazer um orçamento detalhado e evite surpresas desagradáveis durante sua obra.",
    data: "5 de Janeiro, 2025",
    categoria: "Planejamento",
    imagem: "/conectapro.png"
  },
  {
    id: 4,
    titulo: "Reforma vs Construção: Qual Escolher?",
    resumo: "Entenda as vantagens e desvantagens de reformar ou construir do zero para tomar a melhor decisão.",
    data: "1 de Janeiro, 2025",
    categoria: "Orientação",
    imagem: "/conectapro.png"
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
            Dicas, tendências e orientações sobre construção civil, reforma e contratação de profissionais qualificados.
          </p>
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
                
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Ler mais →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Precisa de um Profissional?
          </h2>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Encontre profissionais qualificados em Porto Velho para sua obra ou reforma. 
            Cadastre-se gratuitamente ou busque o profissional ideal para seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/buscar-profissional"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Buscar Profissional
            </Link>
            <Link 
              href="/cadastro-profissional"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Sou Profissional
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-gray-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-4">📧 Newsletter ConectaPro</h3>
          <p className="text-gray-300 mb-6">
            Receba dicas e novidades sobre construção civil diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Inscrever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 