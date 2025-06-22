import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div>
            <span className="inline-block px-6 py-2 bg-white bg-opacity-30 rounded-full text-sm font-bold mb-8 backdrop-blur-sm text-blue-900 border border-white border-opacity-40">
              🏗️ A maior plataforma de profissionais em Porto Velho
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white drop-shadow-2xl">Conecte-se com os</span>
            <br />
            <span className="text-yellow-300 drop-shadow-2xl">
              Melhores Profissionais
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white drop-shadow-md">
            Plataforma 100% gratuita que conecta profissionais qualificados da construção civil 
            com clientes em <strong className="text-yellow-300">Porto Velho - RO</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/buscar-profissional"
              className="group relative px-10 py-4 bg-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl min-w-[280px] text-blue-600"
            >
              <span className="flex items-center justify-center gap-3">
                🔍 Encontrar Profissional
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/cadastro-profissional"
              className="group px-10 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-105 min-w-[280px]"
            >
              <span className="flex items-center justify-center gap-3">
                👷 Sou Profissional
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-80">Profissionais Cadastrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-80">Conexões Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-80">Gratuito Sempre</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher a ConectaPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A plataforma mais completa para conectar profissionais e clientes da construção civil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conexão Instantânea</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Encontre profissionais qualificados em segundos. Nossa busca inteligente conecta você rapidamente.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                💬
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contato Direto WhatsApp</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Converse diretamente com profissionais via WhatsApp. Sem intermediários, sem burocracia.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Profissionais Verificados</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Todos os profissionais passam por verificação. Qualidade e confiança garantidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ferramentas Profissionais
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Mais que uma plataforma de conexão. Tenha acesso a ferramentas que vão revolucionar seu trabalho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/calculadoras" className="group">
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-2 h-full border border-white border-opacity-20 text-center">
                <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  🧮
                </div>
                <h3 className="text-4xl font-black mb-6 text-white leading-tight tracking-wide">
                  CALCULADORA DE SERVIÇOS
                </h3>
                <p className="text-white text-2xl font-semibold mb-8 leading-relaxed opacity-90">
                  Calcule materiais para sua obra
                </p>
                <div className="bg-yellow-400 text-blue-900 px-10 py-5 rounded-2xl font-black text-xl group-hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center gap-3 shadow-xl">
                  ACESSAR
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/precos-cub" className="group">
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-2 h-full border border-white border-opacity-20 text-center">
                <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
                <h3 className="text-4xl font-black mb-6 text-white leading-tight tracking-wide">
                  CUB / SINDUSCON
                </h3>
                <p className="text-white text-2xl font-semibold mb-8 leading-relaxed opacity-90">
                  Preços oficiais por metro quadrado
                </p>
                <div className="bg-yellow-400 text-blue-900 px-10 py-5 rounded-2xl font-black text-xl group-hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center gap-3 shadow-xl">
                  ACESSAR
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Junte-se a centenas de profissionais e clientes que já descobriram a forma mais fácil de conectar
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/cadastro-profissional"
              className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Cadastrar como Profissional
            </Link>
            <Link 
              href="/buscar-profissional"
              className="px-10 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-105"
            >
              Buscar Profissionais
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
