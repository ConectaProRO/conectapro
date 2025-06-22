"use client";
import React from "react";
import Link from "next/link";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

const postsBlog = [
  {
    id: 1,
    titulo: "Como Surgiu a ConectaPro? A História por Trás da Plataforma",
    resumo: "Descubra a origem da ConectaPro: nasceu da experiência real em obras, da necessidade de profissionais e da falta de transparência no mercado da construção civil em Porto Velho.",
    data: "22 de Janeiro, 2025",
    categoria: "História",
    icone: "🏗️",
    cor: "from-blue-500 to-blue-600",
    slug: "como-surgiu-a-conectapro",
    tempo: "5 min de leitura"
  },
  {
    id: 2,
    titulo: "O que é a Tabela SINAPI e Como Usar nos Seus Orçamentos",
    resumo: "Guia completo sobre a Tabela SINAPI: o que é, como funciona e como usar para criar orçamentos precisos e competitivos na construção civil.",
    data: "20 de Janeiro, 2025",
    categoria: "Orçamentos",
    icone: "📊",
    cor: "from-green-500 to-green-600",
    slug: "o-que-e-tabela-sinapi",
    tempo: "8 min de leitura"
  },
  {
    id: 3,
    titulo: "5 Dicas para Profissionais da Construção Conseguirem Mais Clientes",
    resumo: "Estratégias práticas para aumentar sua carteira de clientes: desde o marketing pessoal até a qualidade no atendimento.",
    data: "18 de Janeiro, 2025",
    categoria: "Dicas",
    icone: "💡",
    cor: "from-orange-500 to-orange-600",
    slug: "dicas-conseguir-mais-clientes",
    tempo: "6 min de leitura"
  },
  {
    id: 4,
    titulo: "CUB Sinduscon: Entenda os Custos da Construção em 2025",
    resumo: "Análise completa do CUB (Custo Unitário Básico) e como ele impacta os preços da construção civil em Porto Velho e região.",
    data: "15 de Janeiro, 2025",
    categoria: "Mercado",
    icone: "💰",
    cor: "from-purple-500 to-purple-600",
    slug: "cub-sinduscon-2025",
    tempo: "10 min de leitura"
  }
];

const categorias = ["Todos", "História", "Orçamentos", "Dicas", "Mercado"];

export default function BlogConectaProPage() {
  const [categoriaAtiva, setCategoriaAtiva] = React.useState("Todos");

  const postsFiltrados = categoriaAtiva === "Todos" 
    ? postsBlog 
    : postsBlog.filter(post => post.categoria === categoriaAtiva);

  return (
    <PageLayout 
      title="📝 Blog ConectaPro"
      subtitle="Dicas, novidades e conhecimento para profissionais da construção"
    >
      {/* Navegação Rápida */}
      <PageCard className="mb-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Início
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/precos-cub" className="text-blue-600 hover:text-blue-800 transition-colors">
              📊 Preços CUB
            </Link>
            <Link href="/calculadoras" className="text-blue-600 hover:text-blue-800 transition-colors">
              🧮 Calculadoras
            </Link>
          </div>
        </div>
      </PageCard>

      {/* Filtros de Categoria */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold cp-text-gradient mb-4">
            Explore Nossos Artigos
          </h2>
          <p className="text-gray-600 mb-6">
            Conteúdo especializado para profissionais da construção civil
          </p>
          
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  categoriaAtiva === categoria
                    ? 'cp-button-primary'
                    : 'cp-button-secondary'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </PageCard>

      {/* Grid de Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {postsFiltrados.map((post) => (
          <PageCard key={post.id} className="hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className={`w-full h-48 bg-gradient-to-br ${post.cor} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                <div className="text-8xl filter drop-shadow-lg">
                  {post.icone}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    {post.categoria}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                {post.titulo}
              </h3>
              
              <p className="text-gray-600 line-clamp-3">
                {post.resumo}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.data}</span>
                <span>{post.tempo}</span>
              </div>
              
              <div className="pt-4">
                <Link href={`/blog/${post.slug}`}>
                  <PageButton variant="primary" className="w-full justify-center">
                    Ler Artigo Completo
                  </PageButton>
                </Link>
              </div>
            </div>
          </PageCard>
        ))}
      </div>

      {/* Seção de Newsletter */}
      <PageCard className="text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <h3 className="text-2xl font-bold cp-text-gradient mb-4">
          📧 Receba Novidades do Blog
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Cadastre-se para receber os melhores artigos sobre construção civil, 
          dicas profissionais e novidades do mercado diretamente no seu WhatsApp.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <PageButton variant="primary">
            Inscrever-se
          </PageButton>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          📱 Também enviamos pelo WhatsApp • 🔒 Seus dados estão seguros
        </p>
      </PageCard>

      {/* Call to Action Final */}
      <PageCard className="text-center">
        <h3 className="text-2xl font-bold cp-text-gradient mb-4">
          👷 Você é Profissional da Construção?
        </h3>
        <p className="text-gray-600 mb-6">
          Cadastre-se gratuitamente na ConectaPro e comece a receber mais clientes hoje mesmo!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cadastro-profissional">
            <PageButton variant="primary">
              Cadastrar-se Gratuitamente
            </PageButton>
          </Link>
          <Link href="/buscar-profissional">
            <PageButton variant="secondary">
              Encontrar Profissionais
            </PageButton>
          </Link>
        </div>
      </PageCard>
    </PageLayout>
  );
}