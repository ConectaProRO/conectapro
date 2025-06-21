"use client";
import Image from "next/image";
import Link from "next/link";

const postsBlog = [
  {
    id: 1,
    titulo: "Como Surgiu a ConectaPro? A História por Trás da Plataforma",
    resumo: "Descubra a origem da ConectaPro: nasceu da experiência real em obras, da necessidade de profissionais e da falta de transparência no mercado da construção civil em Porto Velho.",
    data: "22 de Janeiro, 2025",
    categoria: "História",
    imagem: "/conectapro.png",
    conteudo: `
      <h2>A Realidade do Mercado da Construção em Porto Velho</h2>
      
      <p>A ConectaPro não nasceu de uma ideia teórica ou de um escritório climatizado. Ela surgiu do chão da obra, literalmente. <strong>Anos de vivência em canteiros de obras em Porto Velho</strong> revelaram uma realidade que muitos conhecem, mas poucos falam abertamente: o tamanho gigantesco do mercado informal da construção civil.</p>

      <p>Imagine a seguinte cena: você está em uma obra e vê profissionais extremamente qualificados, com anos de experiência, que sabem fazer seu trabalho com excelência, mas que <strong>não têm tempo nem conhecimento para divulgar seus serviços</strong>. Eles passam o dia inteiro trabalhando, chegam em casa cansados, e a ideia de criar um perfil no Instagram ou investir em marketing digital parece um mundo distante.</p>

      <h2>O Problema da Gestão de Obras</h2>

      <p>Durante esses anos, ficou claro que <strong>a melhor forma de administrar uma obra é separando-a por etapas</strong> e colocando em cada etapa um profissional especialista em determinado serviço. Não adianta querer que um pedreiro faça instalação elétrica ou que um pintor resolva problemas hidráulicos. Cada profissional tem sua especialidade, e quando você coloca a pessoa certa no lugar certo, o resultado é sempre superior.</p>

      <p>Mas como encontrar esses especialistas? Como saber quem é realmente bom no que faz? E mais importante: <strong>como fazer isso sem pagar taxas abusivas para intermediários</strong> que nunca pisaram em uma obra?</p>

      <h2>A Informalidade e Seus Riscos</h2>

      <p>Uma das coisas que mais chamava atenção era ver que <strong>muitos serviços eram executados sem contrato formal</strong>. Não por má fé, mas pela correria do dia a dia. O profissional precisava trabalhar, o cliente precisava resolver seu problema, e no meio dessa urgência, as formalidades ficavam para depois.</p>

      <p>Resultado? Mal-entendidos sobre prazos, valores, materiais inclusos ou não, garantias... Problemas que poderiam ser evitados com um simples contrato bem elaborado, mas que muitas vezes não acontecia por <strong>falta de ajuda ou conhecimento de como fazer</strong>.</p>

      <h2>As Mensagens que Mudaram Tudo</h2>

      <p>O ponto de virada veio através de mensagens. Profissionais experientes, que sabiam fazer seu trabalho com os olhos fechados, me procuravam com uma pergunta simples mas reveladora: <strong>"Quanto devo cobrar pelo meu serviço?"</strong></p>

      <p>Do outro lado, clientes me perguntavam: <strong>"Quanto está custando a mão de obra hoje?"</strong>, <strong>"Não tenho noção de quanto vai custar minha obra"</strong>. Era um desencontro total: quem sabia fazer não sabia precificar, e quem precisava fazer não sabia quanto pagar.</p>

      <h2>A Questão dos Projetos e Orçamentos</h2>

      <p>A realidade é dura: <strong>nem todos têm condição de contratar um profissional qualificado</strong> para entregar um projeto em plataforma BIM, com projetos 3D compatibilizados, análise de interferências, projeto detalhado para evitar retrabalho e uma planilha orçamentária com quantitativos precisos.</p>

      <p>Mas isso não significa que essas pessoas devem ficar sem orientação. Todo mundo merece ter acesso a informações básicas sobre sua obra, mesmo que não possa pagar por um projeto completo.</p>

      <h2>A Pergunta Final que Definiu Tudo</h2>

      <p>A gota d'água foi receber mensagens de profissionais perguntando: <strong>"Qual o preço do m² para entregar na chave?"</strong></p>

      <p>Essa pergunta mostrou o tamanho do problema. Profissionais qualificados, com anos de experiência, não tinham uma referência confiável de preços. Não sabiam se estavam cobrando muito, pouco, ou se estavam sendo justos tanto com eles mesmos quanto com seus clientes.</p>

      <h2>Nasce a ConectaPro</h2>

      <p>Foi assim que surgiu a ConectaPro. Não como mais uma plataforma digital, mas como uma <strong>solução real para problemas reais</strong> que vivenciamos no dia a dia da construção civil em Porto Velho.</p>

      <p>Nossa missão é simples:</p>
      <ul>
        <li><strong>Conectar</strong> profissionais qualificados com clientes que precisam de seus serviços</li>
        <li><strong>Fornecer</strong> ferramentas práticas como calculadoras de orçamento e gerador de contratos</li>
        <li><strong>Eliminar</strong> intermediários desnecessários que só encarecem o serviço</li>
        <li><strong>Dar transparência</strong> aos preços e processos da construção civil</li>
        <li><strong>Profissionalizar</strong> relações que antes eram informais</li>
      </ul>

      <h2>Por Que "ConectaPro"?</h2>

      <p>O nome diz tudo: <strong>Conecta + Pro</strong>. Conectamos profissionais (Pro) com quem precisa de seus serviços. Simples, direto, sem enrolação.</p>

      <p>Não somos mais uma empresa de tecnologia que quer "revolucionar" um mercado que não conhece. Somos pessoas que viveram os problemas da construção civil na pele e decidiram fazer algo a respeito.</p>

      <h2>O Futuro da Construção Civil em Porto Velho</h2>

      <p>Acreditamos que o futuro da construção civil em Porto Velho passa pela <strong>profissionalização das relações</strong>, pela <strong>transparência nos preços</strong> e pela <strong>valorização do profissional qualificado</strong>.</p>

      <p>A ConectaPro é nossa contribuição para esse futuro. Um futuro onde:</p>
      <ul>
        <li>Profissionais qualificados são valorizados e bem remunerados</li>
        <li>Clientes têm acesso a informações claras sobre seus projetos</li>
        <li>Contratos formais protegem ambas as partes</li>
        <li>Preços justos beneficiam todo mundo</li>
        <li>A qualidade do trabalho é o que realmente importa</li>
      </ul>

      <p><strong>Essa é nossa história. Essa é nossa missão. Bem-vindo à ConectaPro!</strong></p>
    `,
    cta: "Conhece nossa história? Agora faça parte dela! Encontre profissionais qualificados ou cadastre-se como profissional."
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
                  href={post.id === 1 ? "/blog/como-surgiu-a-conectapro" : "/buscar-profissional"}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors inline-block"
                >
                  {post.id === 1 ? "Leia a história completa →" : post.cta}
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