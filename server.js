// server.js - Servidor principal do bot WhatsApp ConectaPro
const express = require('express');
const twilio = require('twilio');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Middleware para logar TODAS as requisições que chegam
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Nova requisição recebida: ${req.method} ${req.url}`);
    next(); // Passa a requisição para a próxima etapa
});

// Middlewares para interpretar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Armazenamento temporário das conversas (em produção, use Redis ou banco)
const conversationState = new Map();

// Estados da conversa
const STATES = {
  INICIO: 'inicio',
  NOME: 'nome',
  WHATSAPP: 'whatsapp',
  PROFISSAO: 'profissao',
  BAIRRO: 'bairro',
  EXPERIENCIA: 'experiencia',
  FOTO_PERFIL: 'foto_perfil',
  SERVICOS: 'servicos',
  DESLOCAMENTO: 'deslocamento',
  GALERIA: 'galeria',
  CONFIRMACAO: 'confirmacao',
  FINALIZADO: 'finalizado'
};

// Função para obter ou criar estado da conversa
function getConversationState(phoneNumber) {
  if (!conversationState.has(phoneNumber)) {
    conversationState.set(phoneNumber, {
      state: STATES.INICIO,
      data: {},
      messageCount: 0
    });
  }
  return conversationState.get(phoneNumber);
}

// Função para enviar mensagem
async function sendMessage(to, message) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER.replace('whatsapp:', ''),
      to: 'whatsapp:' + to.replace('whatsapp:', '')
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

// Função para salvar dados no Supabase
async function saveUserData(userData) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([userData]);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error);
    return { success: false, error };
  }
}

// Função principal para processar mensagens
async function processMessage(phoneNumber, message, mediaUrl = null) {
  const conversation = getConversationState(phoneNumber);
  conversation.messageCount++;

  switch (conversation.state) {
    case STATES.INICIO:
      await sendMessage(phoneNumber, 
        `🎉 Olá! Bem-vindo ao ConectaPro! 

Vou te ajudar a criar seu perfil profissional de forma bem simples. É rapidinho, prometo! 😊

Primeiro, me diga: *qual é o seu nome completo?*

(Pode escrever do jeito que souber, eu entendo! 📝)`
      );
      conversation.state = STATES.NOME;
      break;

    case STATES.NOME:
      conversation.data.nome = message.trim();
      await sendMessage(phoneNumber, 
        `Prazer em conhecer você, ${conversation.data.nome}! 👋

Agora preciso confirmar seu WhatsApp. 

*Este número ${phoneNumber} está correto?*

Digite:
• *SIM* - se estiver certo
• *NÃO* - se quiser colocar outro número`
      );
      conversation.state = STATES.WHATSAPP;
      break;

    case STATES.WHATSAPP:
      const resposta = message.toLowerCase().trim();
      if (resposta === 'sim' || resposta === 's') {
        conversation.data.whatsapp = phoneNumber;
      } else if (resposta === 'não' || resposta === 'nao' || resposta === 'n') {
        await sendMessage(phoneNumber, 
          `Tudo bem! Digite o número de WhatsApp correto:

Exemplo: (11) 99999-9999 ou 11999999999`
        );
        return;
      } else if (resposta.includes('não') || resposta.includes('nao')) {
        conversation.data.whatsapp = message.trim();
      } else {
        conversation.data.whatsapp = phoneNumber;
      }

      await sendMessage(phoneNumber, 
        `Perfeito! 📱

Agora me conta: *qual é a sua profissão?*

Exemplo: 
• Pedreiro
• Diarista  
• Cabeleireira
• Jardineiro
• Costureira

(Pode escrever do seu jeito! 🛠️)`
      );
      conversation.state = STATES.PROFISSAO;
      break;

    case STATES.PROFISSAO:
      conversation.data.profissao = message.trim();
      await sendMessage(phoneNumber, 
        `Que legal! ${conversation.data.profissao} é uma profissão muito importante! 👏

*Em qual bairro você mora ou trabalha?*

Exemplo: Vila Madalena, Centro, Copacabana...

(Só o nome do bairro mesmo! 📍)`
      );
      conversation.state = STATES.BAIRRO;
      break;

    case STATES.BAIRRO:
      conversation.data.bairro = message.trim();
      await sendMessage(phoneNumber, 
        `Ótimo! ${conversation.data.bairro} é um bairro conhecido! 🏘️

*Há quantos anos você trabalha como ${conversation.data.profissao}?*

Pode responder assim:
• 2 anos
• 5 anos  
• 10 anos
• Estou começando agora

(Não precisa ser exato, aproximado está bom! ⏰)`
      );
      conversation.state = STATES.EXPERIENCIA;
      break;

    case STATES.EXPERIENCIA:
      conversation.data.experiencia = message.trim();
      await sendMessage(phoneNumber, 
        `Que experiência bacana! 🌟

Agora vamos deixar seu perfil mais atrativo! 

*Envie uma foto sua para o perfil* 📸

Pode ser:
• Uma foto trabalhando
• Uma foto sorrindo
• Uma selfie legal

(Só mandar a foto aqui no chat! 📱)`
      );
      conversation.state = STATES.FOTO_PERFIL;
      break;

    case STATES.FOTO_PERFIL:
      if (mediaUrl) {
        conversation.data.foto_perfil = mediaUrl;
        await sendMessage(phoneNumber, 
          `Foto linda! Ficou perfeita para o perfil! 📸✨

Agora me conta: *quais serviços você oferece?*

Exemplo para ${conversation.data.profissao}:
• Lista os principais trabalhos que faz
• Pode ser mais de um
• Escreva de forma simples

Exemplo: "Faço limpeza de casa, passo roupa, organizo armários"

(Conte tudo que você sabe fazer! 💪)`
        );
        conversation.state = STATES.SERVICOS;
      } else {
        await sendMessage(phoneNumber, 
          `Não recebi sua foto! 😅

Tente novamente:
• Abra a câmera
• Tire uma foto ou escolha da galeria  
• Envie aqui no chat

(Precisa ser uma imagem! 📸)`
        );
      }
      break;

    case STATES.SERVICOS:
      conversation.data.servicos = message.trim();
      await sendMessage(phoneNumber, 
        `Excelente! Você oferece ótimos serviços! 👍

*Como você se desloca para trabalhar?*

Escolha uma ou mais opções:
• A pé
• Ônibus
• Carro próprio
• Moto
• Bicicleta
• Uber/99

(Pode escolher mais de uma! 🚶‍♂️🚌🚗)`
      );
      conversation.state = STATES.DESLOCAMENTO;
      break;

    case STATES.DESLOCAMENTO:
      conversation.data.deslocamento = message.trim();
      await sendMessage(phoneNumber, 
        `Perfeito! 🚀

Para finalizar, que tal mostrar seu trabalho?

*Envie fotos dos seus serviços* (opcional)

Podem ser fotos de:
• Trabalhos que já fez
• Antes e depois
• Seus melhores resultados

Envie quantas quiser ou digite *PULAR* se não quiser enviar agora.

(Isso ajuda muito a conseguir clientes! 📷)`
      );
      conversation.state = STATES.GALERIA;
      conversation.data.galeria = [];
      break;

    case STATES.GALERIA:
      if (message.toLowerCase().includes('pular') || message.toLowerCase().includes('passo')) {
        await showConfirmation(phoneNumber, conversation);
      } else if (mediaUrl) {
        conversation.data.galeria.push(mediaUrl);
        await sendMessage(phoneNumber, 
          `Foto adicionada! 📷 (${conversation.data.galeria.length} foto${conversation.data.galeria.length > 1 ? 's' : ''})

Pode enviar mais fotos ou digite *PRONTO* quando terminar.`
        );
      } else if (message.toLowerCase().includes('pronto') || message.toLowerCase().includes('acabei')) {
        await showConfirmation(phoneNumber, conversation);
      } else {
        await sendMessage(phoneNumber, 
          `Não recebi a foto. Tente novamente ou digite *PULAR* para continuar.`
        );
      }
      break;

    case STATES.CONFIRMACAO:
      const confirm = message.toLowerCase().trim();
      if (confirm === 'sim' || confirm === 's' || confirm === 'confirmar') {
        const result = await saveUserData({
          nome: conversation.data.nome,
          whatsapp: conversation.data.whatsapp,
          profissao: conversation.data.profissao,
          bairro: conversation.data.bairro,
          experiencia: conversation.data.experiencia,
          foto_perfil: conversation.data.foto_perfil,
          servicos: conversation.data.servicos,
          deslocamento: conversation.data.deslocamento,
          galeria: conversation.data.galeria,
          data_cadastro: new Date().toISOString()
        });

        if (result.success) {
          await sendMessage(phoneNumber, 
            `🎉 PARABÉNS! Seu cadastro no ConectaPro foi concluído com sucesso!

✅ Seu perfil já está ativo
✅ Clientes podem te encontrar
✅ Você pode começar a receber trabalhos

🌐 Acesse: www.conectapro.app

💡 Dicas para conseguir mais clientes:
• Mantenha seu WhatsApp sempre ativo
• Responda rápido às mensagens
• Seja sempre educado e pontual

Sucesso na sua jornada profissional! 🚀

*Obrigado por escolher o ConectaPro!*`
          );
        } else {
          await sendMessage(phoneNumber, 
            `😔 Ops! Houve um problema ao salvar seus dados.

Tente novamente em alguns minutos ou entre em contato conosco.

Seus dados estão seguros, não se preocupe! 🔒`
          );
        }
        conversation.state = STATES.FINALIZADO;
      } else {
        await sendMessage(phoneNumber, 
          `Sem problemas! Vamos corrigir.

*O que você gostaria de alterar?*

Digite:
• NOME - para mudar o nome
• PROFISSAO - para mudar a profissão  
• BAIRRO - para mudar o bairro
• SERVICOS - para mudar os serviços
• RECOMECAR - para começar tudo de novo`
        );
      }
      break;

    case STATES.FINALIZADO:
      await sendMessage(phoneNumber, 
        `Seu cadastro já foi finalizado! 😊

Para fazer um novo cadastro ou alterar informações, acesse:
🌐 www.conectapro.app

Ou entre em contato com nosso suporte.

Obrigado! 🙏`
      );
      break;
  }
}

async function showConfirmation(phoneNumber, conversation) {
  const summary = `
📋 *RESUMO DO SEU CADASTRO*

👤 *Nome:* ${conversation.data.nome}
📱 *WhatsApp:* ${conversation.data.whatsapp}
🛠️ *Profissão:* ${conversation.data.profissao}
📍 *Bairro:* ${conversation.data.bairro}
⏰ *Experiência:* ${conversation.data.experiencia}
🔧 *Serviços:* ${conversation.data.servicos}
🚗 *Deslocamento:* ${conversation.data.deslocamento}
📷 *Fotos:* ${conversation.data.galeria.length} foto${conversation.data.galeria.length > 1 ? 's' : ''}

✅ *Está tudo correto?*

Digite *SIM* para confirmar e finalizar seu cadastro.
Digite *NÃO* se quiser alterar algo.`;

  await sendMessage(phoneNumber, summary);
  conversation.state = STATES.CONFIRMACAO;
}

// Rota do webhook para receber mensagens do WhatsApp
app.post('/webhook', (req, res) => {
    console.log('--- WEBHOOK /webhook FOI ACIONADO! ---');
    
    let rawBody = '';
    req.on('data', chunk => {
        rawBody += chunk.toString();
    });

    req.on('end', () => {
        console.log('Corpo da requisição (raw):', rawBody);
        console.log('Corpo da requisição (parsed by express.urlencoded):', req.body);
        
        const message = req.body.Body;
        const senderId = req.body.From;

        console.log(`Mensagem recebida de ${senderId}: ${message}`);
    });

    res.setHeader('Content-Type', 'text/xml');
    res.send('<Response></Response>');
});

// Endpoint de saúde
app.get('/', (req, res) => {
  res.json({ 
    status: 'Bot ConectaPro ativo!',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para limpar conversas (útil para testes)
app.post('/clear-conversations', (req, res) => {
  conversationState.clear();
  res.json({ message: 'Conversas limpas com sucesso!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Aguardando requisições no endpoint /webhook...');
    console.log('---');
});

module.exports = app; 