import Link from "next/link";
import Image from "next/image";

export default function ComoSurgiuConectaPro() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header com navegação */}
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="text-blue-100 hover:text-white">
            ← Voltar ao Blog
          </Link>
        </div>
      </div>

      {/* Artigo */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header do artigo */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              História
            </span>
            <span className="text-gray-500 text-sm">22 de Janeiro, 2025</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Como Surgiu a ConectaPro? A História por Trás da Plataforma
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Descubra a origem da ConectaPro: nasceu da experiência real em obras, da necessidade de profissionais e da falta de transparência no mercado da construção civil em Porto Velho.
          </p>

          <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
            <Image 
              src="/conectapro.png" 
              alt="ConectaPro - Como surgiu a plataforma"
              fill
              className="object-cover"
            />
          </div>
        </header>

        {/* Conteúdo do artigo */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">A Realidade do Mercado da Construção em Porto Velho</h2>
          
          <p className="mb-6 text-gray-700 leading-relaxed">
            A ConectaPro não nasceu de uma ideia teórica ou de um escritório climatizado. Ela surgiu do chão da obra, literalmente. <strong>Anos de vivência em canteiros de obras em Porto Velho</strong> revelaram uma realidade que muitos conhecem, mas poucos falam abertamente: o tamanho gigantesco do mercado informal da construção civil.
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Imagine a seguinte cena: você está em uma obra e vê profissionais extremamente qualificados, com anos de experiência, que sabem fazer seu trabalho com excelência, mas que <strong>não têm tempo nem conhecimento para divulgar seus serviços</strong>. Eles passam o dia inteiro trabalhando, chegam em casa cansados, e a ideia de criar um perfil no Instagram ou investir em marketing digital parece um mundo distante.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">O Problema da Gestão de Obras</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Durante esses anos, ficou claro que <strong>a melhor forma de administrar uma obra é separando-a por etapas</strong> e colocando em cada etapa um profissional especialista em determinado serviço. Não adianta querer que um pedreiro faça instalação elétrica ou que um pintor resolva problemas hidráulicos. Cada profissional tem sua especialidade, e quando você coloca a pessoa certa no lugar certo, o resultado é sempre superior.
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Mas como encontrar esses especialistas? Como saber quem é realmente bom no que faz? E mais importante: <strong>como fazer isso sem pagar taxas abusivas para intermediários</strong> que nunca pisaram em uma obra?
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">A Informalidade e Seus Riscos</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Uma das coisas que mais chamava atenção era ver que <strong>muitos serviços eram executados sem contrato formal</strong>. Não por má fé, mas pela correria do dia a dia. O profissional precisava trabalhar, o cliente precisava resolver seu problema, e no meio dessa urgência, as formalidades ficavam para depois.
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Resultado? Mal-entendidos sobre prazos, valores, materiais inclusos ou não, garantias... Problemas que poderiam ser evitados com um simples contrato bem elaborado, mas que muitas vezes não acontecia por <strong>falta de ajuda ou conhecimento de como fazer</strong>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">As Mensagens que Mudaram Tudo</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            O ponto de virada veio através de mensagens. Profissionais experientes, que sabiam fazer seu trabalho com os olhos fechados, me procuravam com uma pergunta simples mas reveladora: <strong>"Quanto devo cobrar pelo meu serviço?"</strong>
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Do outro lado, clientes me perguntavam: <strong>"Quanto está custando a mão de obra hoje?"</strong>, <strong>"Não tenho noção de quanto vai custar minha obra"</strong>. Era um desencontro total: quem sabia fazer não sabia precificar, e quem precisava fazer não sabia quanto pagar.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">A Questão dos Projetos e Orçamentos</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            A realidade é dura: <strong>nem todos têm condição de contratar um profissional qualificado</strong> para entregar um projeto em plataforma BIM, com projetos 3D compatibilizados, análise de interferências, projeto detalhado para evitar retrabalho e uma planilha orçamentária com quantitativos precisos.
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Mas isso não significa que essas pessoas devem ficar sem orientação. Todo mundo merece ter acesso a informações básicas sobre sua obra, mesmo que não possa pagar por um projeto completo.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">A Pergunta Final que Definiu Tudo</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            A gota d'água foi receber mensagens de profissionais perguntando: <strong>"Qual o preço do m² para entregar na chave?"</strong>
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Essa pergunta mostrou o tamanho do problema. Profissionais qualificados, com anos de experiência, não tinham uma referência confiável de preços. Não sabiam se estavam cobrando muito, pouco, ou se estavam sendo justos tanto com eles mesmos quanto com seus clientes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Nasce a ConectaPro</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Foi assim que surgiu a ConectaPro. Não como mais uma plataforma digital, mas como uma <strong>solução real para problemas reais</strong> que vivenciamos no dia a dia da construção civil em Porto Velho.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">Nossa missão é simples:</p>
          <ul className="mb-6 text-gray-700 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Conectar</strong> profissionais qualificados com clientes que precisam de seus serviços</li>
            <li><strong>Fornecer</strong> ferramentas práticas como calculadoras de orçamento e gerador de contratos</li>
            <li><strong>Eliminar</strong> intermediários desnecessários que só encarecem o serviço</li>
            <li><strong>Dar transparência</strong> aos preços e processos da construção civil</li>
            <li><strong>Profissionalizar</strong> relações que antes eram informais</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Por Que "ConectaPro"?</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            O nome diz tudo: <strong>Conecta + Pro</strong>. Conectamos profissionais (Pro) com quem precisa de seus serviços. Simples, direto, sem enrolação.
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Não somos mais uma empresa de tecnologia que quer "revolucionar" um mercado que não conhece. Somos pessoas que viveram os problemas da construção civil na pele e decidiram fazer algo a respeito.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">O Futuro da Construção Civil em Porto Velho</h2>

          <p className="mb-6 text-gray-700 leading-relaxed">
            Acreditamos que o futuro da construção civil em Porto Velho passa pela <strong>profissionalização das relações</strong>, pela <strong>transparência nos preços</strong> e pela <strong>valorização do profissional qualificado</strong>.
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">A ConectaPro é nossa contribuição para esse futuro. Um futuro onde:</p>
          <ul className="mb-8 text-gray-700 leading-relaxed list-disc pl-6 space-y-2">
            <li>Profissionais qualificados são valorizados e bem remunerados</li>
            <li>Clientes têm acesso a informações claras sobre seus projetos</li>
            <li>Contratos formais protegem ambas as partes</li>
            <li>Preços justos beneficiam todo mundo</li>
            <li>A qualidade do trabalho é o que realmente importa</li>
          </ul>

          <p className="text-xl font-bold text-blue-600 text-center bg-blue-50 p-6 rounded-lg">
            Essa é nossa história. Essa é nossa missão. Bem-vindo à ConectaPro!
          </p>
        </div>

        {/* CTA do artigo */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Conhece nossa história? Agora faça parte dela!
          </h3>
          <p className="text-blue-100 mb-6">
            Encontre profissionais qualificados ou cadastre-se como profissional na ConectaPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/buscar-profissional"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🔍 Buscar Profissional
            </Link>
            <Link 
              href="/cadastro-profissional"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium"
            >
              👷 Sou Profissional
            </Link>
          </div>
        </div>

        {/* Navegação */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Voltar para o Blog
          </Link>
        </div>
      </article>
    </div>
  );
} 