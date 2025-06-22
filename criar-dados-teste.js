const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 🛡️ Configuração Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Configure as variáveis SUPABASE no .env.local primeiro!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 📋 Dados fictícios para teste
const profissionaisTeste = [
    {
        nome: 'João Silva',
        telefone: '69999887766',
        email: 'joao.silva@email.com',
        servicos: ['Pedreiro', 'Alvenaria', 'Construção Geral'],
        experiencia: '15 anos de experiência em construção civil, especializado em alvenaria estrutural e acabamentos',
        endereco: {
            rua: 'Rua das Flores, 123',
            bairro: 'Centro',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'site',
        status: 'pendente'
    },
    {
        nome: 'Maria Santos',
        telefone: '69888776655',
        email: null,
        servicos: ['Pintor', 'Decoração'],
        experiencia: '8 anos pintando casas e comércios em Porto Velho, trabalho com tinta acrílica e textura',
        endereco: {
            rua: 'Av. Jorge Teixeira, 456',
            bairro: 'Liberdade',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'whatsapp',
        dados_whatsapp: {
            conversa_id: '5569888776655@c.us',
            mensagens: [
                { timestamp: new Date(), tipo: 'text', conteudo: 'Oi, quero me cadastrar', audio: false },
                { timestamp: new Date(), tipo: 'text', conteudo: 'Sou pintora', audio: false }
            ],
            audio_transcritos: ['[Áudio: Oi, sou Maria, trabalho com pintura há 8 anos]']
        },
        status: 'pendente'
    },
    {
        nome: 'Carlos Oliveira',
        telefone: '69777665544',
        email: 'carlos.eletricista@gmail.com',
        servicos: ['Eletricista', 'Instalações Elétricas', 'Manutenção'],
        experiencia: '12 anos na área elétrica, faço instalações residenciais e comerciais, certificado pelo CREA',
        endereco: {
            rua: 'Rua Almirante Barroso, 789',
            bairro: 'São João Bosco',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'site',
        status: 'pendente'
    },
    {
        nome: 'Ana Costa',
        telefone: '69666554433',
        email: null,
        servicos: ['Faxineira', 'Limpeza Pós-Obra'],
        experiencia: '6 anos fazendo limpeza pesada e pós-obra, tenho equipe completa',
        endereco: {
            rua: 'Rua Presidente Vargas, 321',
            bairro: 'Olaria',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'whatsapp',
        dados_whatsapp: {
            conversa_id: '5569666554433@c.us',
            mensagens: [
                { timestamp: new Date(), tipo: 'audio', conteudo: '[Áudio]', audio: true },
                { timestamp: new Date(), tipo: 'text', conteudo: 'Trabalho com limpeza', audio: false }
            ],
            audio_transcritos: ['[Áudio: Oi, eu faço limpeza pós-obra, tenho experiência]']
        },
        status: 'pendente'
    },
    {
        nome: 'Roberto Ferreira',
        telefone: '69555443322',
        email: 'roberto.encanador@hotmail.com',
        servicos: ['Encanador', 'Hidráulica', 'Desentupimento'],
        experiencia: '20 anos como encanador, atendo emergências 24h, trabalho com PVC e ferro',
        endereco: {
            rua: 'Av. Pinheiro Machado, 654',
            bairro: 'Areal',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'site',
        status: 'pendente'
    },
    {
        nome: 'Sebastião Pereira',
        telefone: '69444332211',
        email: null,
        servicos: ['Carpinteiro', 'Móveis Planejados'],
        experiencia: '25 anos trabalhando com madeira, faço móveis sob medida e telhados',
        endereco: {
            rua: 'Rua Marechal Deodoro, 987',
            bairro: 'Caiari',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'whatsapp',
        dados_whatsapp: {
            conversa_id: '5569444332211@c.us',
            mensagens: [
                { timestamp: new Date(), tipo: 'audio', conteudo: '[Áudio]', audio: true },
                { timestamp: new Date(), tipo: 'audio', conteudo: '[Áudio]', audio: true }
            ],
            audio_transcritos: [
                '[Áudio: Sou carpinteiro há 25 anos]',
                '[Áudio: Faço móveis planejados e telhados]'
            ]
        },
        status: 'pendente'
    }
];

// 🚀 Função para inserir dados
async function inserirDadosTeste() {
    console.log('🚀 Inserindo dados de teste...');

    try {
        // Limpar dados existentes (opcional)
        console.log('🧹 Limpando dados antigos...');
        await supabase.from('profissionais_pendentes').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        // Inserir novos dados
        console.log('📝 Inserindo profissionais de teste...');
        const { data, error } = await supabase
            .from('profissionais_pendentes')
            .insert(profissionaisTeste);

        if (error) {
            throw error;
        }

        console.log('✅ Dados inseridos com sucesso!');
        console.log(`📊 ${profissionaisTeste.length} profissionais criados:`);
        
        profissionaisTeste.forEach((prof, index) => {
            console.log(`   ${index + 1}. ${prof.nome} - ${prof.servicos.join(', ')} (${prof.origem})`);
        });

        console.log('\n🎯 Próximos passos:');
        console.log('1. Acesse: https://conectapro-b1vaje3bv-conecta-pro.vercel.app/admin');
        console.log('2. Veja os profissionais pendentes');
        console.log('3. Teste aprovação/rejeição');
        console.log('4. Configure WhatsApp bot para testes reais');

    } catch (error) {
        console.error('❌ Erro ao inserir dados:', error);
        console.log('\n🔧 Possíveis soluções:');
        console.log('1. Verifique se o Supabase está configurado');
        console.log('2. Execute o SQL do setup-database.sql');
        console.log('3. Confira as variáveis no .env.local');
    }
}

// 📊 Função para criar avaliações de teste
async function criarAvaliacoesTeste() {
    console.log('⭐ Criando avaliações de teste...');

    const avaliacoes = [
        {
            cliente_nome: 'Pedro Almeida',
            cliente_telefone: '69888999777',
            nota: 5,
            comentario: 'Excelente trabalho! João é muito profissional e pontual.',
            servico_realizado: 'Construção de muro',
            data_servico: '2025-01-15',
            status: 'pendente'
        },
        {
            cliente_nome: 'Mariana Lima',
            cliente_telefone: '69777888666',
            nota: 4,
            comentario: 'Maria pintou minha casa muito bem, recomendo!',
            servico_realizado: 'Pintura residencial',
            data_servico: '2025-01-18',
            status: 'pendente'
        },
        {
            cliente_nome: 'José Santos',
            cliente_telefone: '69666777555',
            nota: 5,
            comentario: 'Carlos resolveu problema elétrico rapidamente.',
            servico_realizado: 'Instalação elétrica',
            data_servico: '2025-01-20',
            status: 'pendente'
        }
    ];

    try {
        const { data, error } = await supabase
            .from('avaliacoes')
            .insert(avaliacoes);

        if (error) throw error;

        console.log('✅ Avaliações criadas com sucesso!');
        console.log(`📊 ${avaliacoes.length} avaliações pendentes`);
    } catch (error) {
        console.log('⚠️ Erro ao criar avaliações (normal se não tiver profissionais aprovados)');
    }
}

// 🎯 Executar script
async function main() {
    console.log('🎯 ConectaPro - Criador de Dados de Teste');
    console.log('==========================================');

    await inserirDadosTeste();
    await criarAvaliacoesTeste();

    console.log('\n🎉 Script concluído!');
    console.log('📱 Agora você pode testar o sistema completo!');
    
    process.exit(0);
}

// Executar se chamado diretamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { inserirDadosTeste, criarAvaliacoesTeste }; 