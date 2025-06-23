console.log('🔄 Testando dependências...');

try {
    const { Client } = require('whatsapp-web.js');
    console.log('✅ whatsapp-web.js carregado com sucesso');
    
    const { createClient } = require('@supabase/supabase-js');
    console.log('✅ @supabase/supabase-js carregado com sucesso');
    
    const qrcode = require('qrcode-terminal');
    console.log('✅ qrcode-terminal carregado com sucesso');
    
    // Teste de conexão com Supabase
    const supabaseUrl = 'https://yugcnpbadwmnqmixlsdc.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg';
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client criado com sucesso');
    
    console.log('🎉 Todas as dependências estão funcionando!');
    console.log('📱 Agora vou tentar inicializar o WhatsApp...');
    
    const client = new Client({
        authStrategy: require('whatsapp-web.js').LocalAuth(),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });
    
    client.on('qr', (qr) => {
        console.log('🔄 QR Code gerado! Escaneie com seu WhatsApp:');
        qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
        console.log('✅ WhatsApp conectado com sucesso!');
        process.exit(0);
    });
    
    client.on('auth_failure', (msg) => {
        console.error('❌ Falha na autenticação:', msg);
        process.exit(1);
    });
    
    client.initialize();
    
} catch (error) {
    console.error('❌ Erro ao carregar dependências:', error.message);
    process.exit(1);
} 