import { NextRequest, NextResponse } from 'next/server';
import { ConversationManager } from '@/lib/conversation-manager';
import { AudioProcessor } from '@/lib/audio-processor';
import { WhatsAppService } from '@/lib/whatsapp-service';

const conversationManager = new ConversationManager();
const audioProcessor = new AudioProcessor();
const whatsappService = new WhatsAppService();

// Webhook verification for WhatsApp
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ WhatsApp webhook verified');
    return new NextResponse(challenge);
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📨 Webhook received:', JSON.stringify(body, null, 2));

    // Extract message data from WhatsApp webhook
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages || messages.length === 0) {
      return new NextResponse('No messages', { status: 200 });
    }

    const message = messages[0];
    const phoneNumber = message.from;
    const messageId = message.id;

    console.log(`📱 Message from ${phoneNumber}: ${message.type}`);

    // Process different message types
    let processedMessage = '';
    let messageType = message.type;

    switch (message.type) {
      case 'text':
        processedMessage = message.text.body;
        break;
        
      case 'audio':
        // Process audio message
        try {
          const audioUrl = await whatsappService.getMediaUrl(message.audio.id);
          processedMessage = await audioProcessor.transcribeAudio(audioUrl);
          console.log(`🎤 Audio transcribed: ${processedMessage}`);
        } catch (error) {
          console.error('❌ Audio processing error:', error);
          processedMessage = '[Erro ao processar áudio]';
        }
        break;
        
      case 'image':
        // Handle profile/portfolio photos
        try {
          const imageUrl = await whatsappService.getMediaUrl(message.image.id);
          processedMessage = `[Imagem recebida: ${imageUrl}]`;
        } catch (error) {
          console.error('❌ Image processing error:', error);
          processedMessage = '[Erro ao processar imagem]';
        }
        break;
        
      default:
        processedMessage = `[Tipo de mensagem não suportado: ${message.type}]`;
    }

    // Process conversation flow
    const response = await conversationManager.processMessage({
      phoneNumber,
      message: processedMessage,
      messageType,
      messageId,
      mediaUrl: message.audio?.id || message.image?.id || null
    });

    // Send response back to user
    if (response.reply) {
      await whatsappService.sendMessage(phoneNumber, response.reply);
    }

    // Send audio response if available
    if (response.audioReply) {
      await whatsappService.sendAudioMessage(phoneNumber, response.audioReply);
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 