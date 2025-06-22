const { createClient } = require('@supabase/supabase-js');

// 🛡️ Credenciais do Supabase (fornecidas pelo usuário)
const supabaseUrl = 'https://yugcnpbadwmnqmixlsdc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testarConexao() {
    console.log('🛡️ Testando conexão com Supabase...');
    console.log('📍 URL:', supabaseUrl);
    
    try {
        // Testar se conseguimos listar tabelas
        const { data, error } = await supabase
            .from('profissionais_pendentes')
            .select('count', { count: 'exact', head: true });

        if (error) {
            if (error.message.includes('relation "profissionais_pendentes" does not exist')) {
                console.log('⚠️ Tabelas não existem ainda. Precisamos executar o setup-database.sql');
                console.log('\n📋 PRÓXIMOS PASSOS:');
                console.log('1. Acesse: https://supabase.com/dashboard/org/tpylufvqtodmdqopczri');
                console.log('2. Clique no seu projeto');
                console.log('3. Vá em SQL Editor');
                console.log('4. Cole todo o conteúdo do arquivo setup-database.sql');
                console.log('5. Execute (RUN)');
                return;
            }
            throw error;
        }

        console.log('✅ Conexão com Supabase OK!');
        console.log(`📊 Tabela existe. Registros: ${data || 0}`);
        
        // Testar inserção de um profissional de teste
        await inserirProfissionalTeste();
        
    } catch (error) {
        console.error('❌ Erro na conexão:', error.message);
        console.log('\n🔧 Possíveis soluções:');
        console.log('1. Verifique se as credenciais estão corretas');
        console.log('2. Execute o setup-database.sql no Supabase');
        console.log('3. Verifique se o projeto está ativo');
    }
}

async function inserirProfissionalTeste() {
    console.log('\n📝 Inserindo profissional de teste...');
    
    const profissionalTeste = {
        nome: 'João Silva - Teste',
        telefone: '69999887766',
        email: 'joao.teste@email.com',
        servicos: ['Pedreiro', 'Teste'],
        experiencia: 'Profissional de teste para validar sistema',
        endereco: {
            rua: 'Rua de Teste, 123',
            bairro: 'Centro',
            cidade: 'Porto Velho',
            estado: 'RO'
        },
        origem: 'site',
        status: 'pendente'
    };

    try {
        const { data, error } = await supabase
            .from('profissionais_pendentes')
            .insert([profissionalTeste])
            .select();

        if (error) throw error;

        console.log('✅ Profissional de teste inserido com sucesso!');
        console.log('📊 ID:', data[0].id);
        console.log('\n🎯 Agora você pode:');
        console.log('1. Acessar: https://conectapro-b1vaje3bv-conecta-pro.vercel.app/admin');
        console.log('2. Ver o profissional pendente');
        console.log('3. Testar aprovação/rejeição');
        
    } catch (error) {
        console.error('❌ Erro ao inserir:', error.message);
    }
}

// Executar teste
testarConexao(); 