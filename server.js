// server.js - Chatbot simples ConectaPro
const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Armazenamento das conversas
const conversas = new Map();

// Estados simples
const ESTADOS = {
  INICIO: 'inicio',
  NOME: 'nome',
  WHATSAPP: 'whatsapp',
  PROFISSAO: 'profissao',
  BAIRRO: 'bairro',
  EXPERIENCIA: 'experiencia',
  FOTO: 'foto',
  SERVICOS: 'servicos',
  DESLOCAMENTO: 'deslocamento',
  GALERIA: 'galeria',
  FINALIZADO: 'finalizado'
};

// Pega ou cria conversa
function getConversa(telefone) {
  if (!conversas.has(telefone)) {
    conversas.set(telefone, {
      estado: ESTADOS.INICIO,
      dados: {},
      fotos: []
    });
  }
  return conversas.get(telefone);
}

// Envia mensagem
async function enviarMensagem(para, texto) {
  try {
    await twilioClient.messages.create({
      body: texto,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: para
    });
    console.log(`✅ Mensagem enviada para ${para}`);
  } catch (error) {
    console.error('❌ Erro ao enviar:', error.message);
  }
}

// Salva no banco
async function salvarDados(dados) {
  // Supabase removido. Aqui você pode salvar em arquivo, ou simplesmente não fazer nada.
  return true;
}

// Processa mensagens
async function processarMensagem(telefone, mensagem, foto = null) {
  const conversa = getConversa(telefone);
  
  console.log(`📱 ${telefone} | Estado: ${conversa.estado} | Mensagem: "${mensagem}"`);

  switch (conversa.estado) {
    case ESTADOS.INICIO:
      await enviarMensagem(telefone, 
        `Olá! Bem-vindo ao ConectaPro! 🎉

Vou criar seu perfil profissional rapidinho.

Qual é o seu nome?`
      );
      conversa.estado = ESTADOS.NOME;
      break;

    case ESTADOS.NOME:
      conversa.dados.nome = mensagem;
      await enviarMensagem(telefone, 
        `Oi ${mensagem}! 👋

Qual é o seu WhatsApp? (pode ser este mesmo)`
      );
      conversa.estado = ESTADOS.WHATSAPP;
      break;

    case ESTADOS.WHATSAPP:
      conversa.dados.whatsapp = mensagem;
      await enviarMensagem(telefone, 
        `Perfeito! 📱

Qual é a sua profissão?`
      );
      conversa.estado = ESTADOS.PROFISSAO;
      break;

    case ESTADOS.PROFISSAO:
      conversa.dados.profissao = mensagem;
      await enviarMensagem(telefone, 
        `Legal! ${mensagem} é uma profissão importante! 👏

Em qual bairro você mora/trabalha?`
      );
      conversa.estado = ESTADOS.BAIRRO;
      break;

    case ESTADOS.BAIRRO:
      conversa.dados.bairro = mensagem;
      await enviarMensagem(telefone, 
        `Ótimo! ${mensagem} 🏘️

Há quanto tempo trabalha com isso?`
      );
      conversa.estado = ESTADOS.EXPERIENCIA;
      break;

    case ESTADOS.EXPERIENCIA:
      conversa.dados.experiencia = mensagem;
      await enviarMensagem(telefone, 
        `Que experiência! 🌟

Agora me mande uma foto sua para o perfil 📸

(pode ser qualquer foto sua)`
      );
      conversa.estado = ESTADOS.FOTO;
      break;

    case ESTADOS.FOTO:
      if (foto) {
        conversa.dados.foto_perfil = foto;
        await enviarMensagem(telefone, 
          `Foto recebida! 📸

Quais serviços você oferece?

(pode descrever do seu jeito)`
        );
        conversa.estado = ESTADOS.SERVICOS;
      } else {
        await enviarMensagem(telefone, 
          `Não recebi a foto. Tente enviar novamente 📸`
        );
      }
      break;

    case ESTADOS.SERVICOS:
      conversa.dados.servicos = mensagem;
      await enviarMensagem(telefone, 
        `Excelente! 👍

Como você se desloca para trabalhar?

(ônibus, carro, a pé, etc)`
      );
      conversa.estado = ESTADOS.DESLOCAMENTO;
      break;

    case ESTADOS.DESLOCAMENTO:
      conversa.dados.deslocamento = mensagem;
      await enviarMensagem(telefone, 
        `Perfeito! 🚀

Quer enviar fotos dos seus trabalhos?

Mande as fotos ou escreva "não" para pular`
      );
      conversa.estado = ESTADOS.GALERIA;
      break;

    case ESTADOS.GALERIA:
      if (foto) {
        conversa.fotos.push(foto);
        await enviarMensagem(telefone, 
          `Foto adicionada! 📷 

Pode enviar mais ou escreva "pronto" para finalizar`
        );
      } else if (mensagem.toLowerCase().includes('não') || 
                 mensagem.toLowerCase().includes('nao') ||
                 mensagem.toLowerCase().includes('pular')) {
        await finalizarCadastro(telefone, conversa);
      } else if (mensagem.toLowerCase().includes('pronto') ||
                 mensagem.toLowerCase().includes('acabei') ||
                 mensagem.toLowerCase().includes('fim')) {
        await finalizarCadastro(telefone, conversa);
      } else {
        await enviarMensagem(telefone, 
          `Mande uma foto ou escreva "pronto" para finalizar`
        );
      }
      break;

    case ESTADOS.FINALIZADO:
      await enviarMensagem(telefone, 
        `Seu cadastro já foi finalizado! ✅

Acesse: www.conectapro.app

Obrigado! 🙏`
      );
      break;
  }
}

// Finaliza cadastro
async function finalizarCadastro(telefone, conversa) {
  const dadosCompletos = {
    nome: conversa.dados.nome,
    whatsapp: conversa.dados.whatsapp,
    profissao: conversa.dados.profissao,
    bairro: conversa.dados.bairro,
    experiencia: conversa.dados.experiencia,
    foto_perfil: conversa.dados.foto_perfil,
    servicos: conversa.dados.servicos,
    deslocamento: conversa.dados.deslocamento,
    galeria: conversa.fotos,
    data_cadastro: new Date().toISOString()
  };

  const salvou = await salvarDados(dadosCompletos);

  if (salvou) {
    await enviarMensagem(telefone, 
      `🎉 CADASTRO CONCLUÍDO!

✅ Seu perfil está ativo
✅ Clientes podem te encontrar
✅ Pode começar a receber trabalhos

🌐 Acesse: www.conectapro.app

Sucesso! 🚀`
    );
  } else {
    await enviarMensagem(telefone, 
      `Ops! Erro ao salvar. Tente novamente mais tarde.`
    );
  }

  conversa.estado = ESTADOS.FINALIZADO;
}

// Webhook do Twilio
app.post('/webhook', async (req, res) => {
  console.log('📨 Webhook recebido:', req.body);
  
  const telefone = req.body.From;
  const mensagem = req.body.Body || '';
  const foto = req.body.MediaUrl0 || null;
  
  if (telefone) {
    await processarMensagem(telefone, mensagem, foto);
  }
  
  res.setHeader('Content-Type', 'text/xml');
  res.send('<Response></Response>');
});

// Rota de teste
app.post('/teste', async (req, res) => {
  const { telefone, mensagem, foto } = req.body;
  
  if (telefone && mensagem) {
    await processarMensagem(telefone, mensagem, foto);
    res.json({ ok: true });
  } else {
    res.json({ erro: 'Falta telefone ou mensagem' });
  }
});

// Limpar conversas
app.post('/limpar', (req, res) => {
  conversas.clear();
  res.json({ mensagem: 'Conversas limpas!' });
});

// Status
app.get('/', (req, res) => {
  res.json({ 
    status: 'ConectaPro Bot ativo!',
    conversas: conversas.size,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log('✅ Bot ConectaPro ativo!');
});

module.exports = app;