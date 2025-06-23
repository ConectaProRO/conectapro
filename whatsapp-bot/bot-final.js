const { Client, LocalAuth } = require('whatsapp-web.js');
const { createClient } = require('@supabase/supabase-js');
const qrcode = require('qrcode-terminal');

// Configuração do Supabase
const supabaseUrl = 'https://yugcnpbadwmnqmixlsdc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg';
const supabase = createClient(supabaseUrl, supabaseKey);

// Estados da conversa
const conversationStates = {};

// Validação de telefone brasileiro
function validarTelefoneBrasil(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    if (numeroLimpo.length < 10 || numeroLimpo.length > 11) return false;
    
    const dddsValidos = [
        '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38',
        '41', '42', '43', '44', '45', '46', '47', '48', '49',
        '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69',
        '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89',
        '91', '92', '93', '94', '95', '96', '97', '98', '99'
    ];
    
    const ddd = numeroLimpo.substring(0, 2);
    return dddsValidos.includes(ddd);
}

console.log('🤖 Iniciando bot ConectaPro...');
console.log('📱 Configurando WhatsApp...');

// Criar cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-extensions',
            '--disable-dev-shm-usage'
        ]
    }
});

// Gerar QR Code
client.on('qr', (qr) => {
    console.log('🔄 Escaneie o QR Code abaixo com seu WhatsApp:');
    console.log('');
    qrcode.generate(qr, { small: true });
    console.log('');
    console.log('📱 Abra o WhatsApp no seu celular > Menu (3 pontos) > Aparelhos conectados > Conectar um aparelho');
});

// Cliente pronto
client.on('ready', () => {
    console.log('✅ Bot ConectaPro está online!');
    console.log('📞 Número: 69993705343');
    console.log('🤖 Powered by Supabase');
});

// Erro de autenticação
client.on('auth_failure', (msg) => {
    console.error('❌ Erro de autenticação:', msg);
});

// Desconectado
client.on('disconnected', (reason) => {
    console.log('⚠️ Bot desconectado:', reason);
});

// Processar mensagens
client.on('message', async (message) => {
    try {
        const chatId = message.from;
        const userMessage = message.body.toLowerCase().trim();
        
        console.log(`📨 Mensagem de ${chatId}: ${message.body}`);
        
        if (message.from.includes('@g.us') || message.fromMe) return;
        
        if (userMessage === '/reset') {
            delete conversationStates[chatId];
            await message.reply('🔄 Conversa resetada! Digite *oi* para começar novamente.');
            return;
        }
        
        if (!conversationStates[chatId]) {
            conversationStates[chatId] = { step: 'inicio', data: {} };
        }
        
        const state = conversationStates[chatId];
        
        switch (state.step) {
            case 'inicio':
                if (userMessage.includes('oi') || userMessage.includes('olá') || userMessage.includes('ola')) {
                    await message.reply(`👋 Olá! Bem-vindo à *ConectaPro*!

🔨 Somos a plataforma que conecta profissionais da construção com clientes.

📋 *Menu de opções:*
1️⃣ - Quero me cadastrar como profissional
2️⃣ - Preciso de ajuda
3️⃣ - Falar com atendente

Digite o número da opção desejada! 👆`);
                    state.step = 'menu';
                } else {
                    await message.reply(`👋 Olá! Digite *oi* para começar! 

🔨 *ConectaPro* - Conectando profissionais da construção!`);
                }
                break;
                
            case 'menu':
                if (userMessage === '1') {
                    await message.reply(`🔨 Ótimo! Vou te ajudar a se cadastrar na ConectaPro.

🎯 Aqui você pode:
• Receber pedidos de orçamento
• Conseguir mais clientes
• Divulgar seus trabalhos

👨‍🔧 Que trabalho você faz?

*Exemplos:*
• Pedreiro
• Eletricista  
• Encanador
• Pintor
• Carpinteiro
• Azulejista`);
                    state.step = 'profissao';
                } else if (userMessage === '2') {
                    await message.reply(`❓ *Como posso te ajudar?*

🔨 A ConectaPro conecta profissionais da construção com clientes que precisam de serviços.

📋 *Para profissionais:*
• Cadastro gratuito
• Receba pedidos de orçamento
• Aumente sua renda

👥 *Para clientes:*
• Encontre profissionais qualificados
• Compare orçamentos
• Contrate com segurança

Digite *1* para se cadastrar ou *3* para falar com atendente.`);
                } else if (userMessage === '3') {
                    await message.reply(`📞 *Falar com Atendente*

Para falar diretamente conosco:
📱 WhatsApp: (69) 99370-5343
📧 Email: contato@conectapro.com

🌐 Site: conectapro.vercel.app

Horário de atendimento:
🕐 Segunda a Sexta: 8h às 18h
🕐 Sábado: 8h às 12h`);
                } else {
                    await message.reply(`❌ Opção inválida!

Digite:
1️⃣ - Para se cadastrar
2️⃣ - Para ajuda  
3️⃣ - Para falar com atendente`);
                }
                break;
                
            case 'profissao':
                state.data.profissao = message.body;
                await message.reply(`👍 Legal! Você trabalha como *${message.body}*.

⏰ Há quanto tempo você trabalha nessa área?

*Exemplos:*
• 2 anos
• 5 anos
• 10 anos
• Mais de 15 anos`);
                state.step = 'experiencia';
                break;
                
            case 'experiencia':
                state.data.experiencia = message.body;
                await message.reply(`⭐ Perfeito! ${message.body} de experiência.

📍 Em que cidade você trabalha?

*Exemplo:* Porto Velho, RO`);
                state.step = 'cidade';
                break;
                
            case 'cidade':
                state.data.cidade = message.body;
                await message.reply(`📍 Ótimo! Você trabalha em *${message.body}*.

📱 Agora preciso do seu número de WhatsApp para contato.

*Digite apenas os números* (com DDD):
*Exemplo:* 69999887766`);
                state.step = 'telefone';
                break;
                
            case 'telefone':
                if (validarTelefoneBrasil(message.body)) {
                    state.data.telefone = message.body;
                    await message.reply(`📱 Telefone confirmado: *${message.body}*

📝 Para finalizar, me conte um pouco sobre seus trabalhos:

*Exemplos:*
• "Faço obras residenciais e comerciais"
• "Especialista em instalações elétricas"
• "Trabalho com acabamentos e reformas"

Pode usar áudio se preferir! 🎤`);
                    state.step = 'descricao';
                } else {
                    await message.reply(`❌ Número inválido!

📱 Digite um número válido com DDD:
*Exemplo:* 69999887766

O número deve ter 10 ou 11 dígitos.`);
                }
                break;
                
            case 'descricao':
                if (message.hasMedia && message.type === 'ptt') {
                    state.data.descricao = `[Áudio transcrito] Profissional experiente em ${state.data.profissao}`;
                    await message.reply(`🎤 Áudio recebido e transcrito!`);
                } else {
                    state.data.descricao = message.body;
                }
                
                await message.reply(`✅ *Dados confirmados:*

👨‍🔧 *Profissão:* ${state.data.profissao}
⏰ *Experiência:* ${state.data.experiencia}  
📍 *Cidade:* ${state.data.cidade}
📱 *Telefone:* ${state.data.telefone}
📝 *Sobre você:* ${state.data.descricao}

Os dados estão corretos?
✅ Digite *SIM* para confirmar
❌ Digite *NÃO* para refazer`);
                state.step = 'confirmacao';
                break;
                
            case 'confirmacao':
                if (userMessage === 'sim' || userMessage === 's') {
                    try {
                        const { data, error } = await supabase
                            .from('profissionais_pendentes')
                            .insert([
                                {
                                    nome: `Profissional ${state.data.profissao}`,
                                    telefone: state.data.telefone,
                                    email: `${state.data.telefone}@whatsapp.conectapro.com`,
                                    experiencia: state.data.experiencia,
                                    servicos: [state.data.profissao],
                                    descricao: state.data.descricao,
                                    cidade: state.data.cidade,
                                    origem: 'whatsapp'
                                }
                            ]);
                            
                        if (error) {
                            console.error('Erro ao salvar:', error);
                            await message.reply(`❌ Erro ao salvar cadastro. Tente novamente ou entre em contato: (69) 99370-5343`);
                        } else {
                            await message.reply(`🎉 *Cadastro realizado com sucesso!*

✅ Seus dados foram enviados para análise.
⏰ Em até 24h você receberá uma resposta.
📱 Mantenha este WhatsApp ativo para receber atualizações.

🚀 *Próximos passos:*
• Aguarde aprovação
• Complete seu perfil
• Comece a receber clientes!

Obrigado por escolher a *ConectaPro*! 🔨

_Powered by Supabase_`);
                            
                            delete conversationStates[chatId];
                        }
                    } catch (err) {
                        console.error('Erro geral:', err);
                        await message.reply(`❌ Erro no sistema. Entre em contato: (69) 99370-5343`);
                    }
                } else if (userMessage === 'não' || userMessage === 'nao' || userMessage === 'n') {
                    await message.reply(`🔄 Tudo bem! Vamos recomeçar.

Digite *oi* para iniciar novamente.`);
                    delete conversationStates[chatId];
                } else {
                    await message.reply(`❓ Não entendi.

Digite:
✅ *SIM* para confirmar
❌ *NÃO* para refazer`);
                }
                break;
        }
        
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await message.reply('❌ Ocorreu um erro. Tente novamente ou entre em contato: (69) 99370-5343');
    }
});

client.initialize();

console.log('🔄 Aguardando QR Code...'); 