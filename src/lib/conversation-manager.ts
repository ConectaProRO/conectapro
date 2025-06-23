import { 
  WhatsAppMessage, 
  ConversationState, 
  ConversationResponse, 
  ConversationStep,
  RegistrationData 
} from '@/types/whatsapp';
import { DatabaseService } from './database-service';
import { WhatsAppService } from './whatsapp-service';

export class ConversationManager {
  private databaseService: DatabaseService;
  private whatsappService: WhatsAppService;
  private conversations: Map<string, ConversationState> = new Map();

  constructor() {
    this.databaseService = new DatabaseService();
    this.whatsappService = new WhatsAppService();
  }

  async processMessage(message: WhatsAppMessage): Promise<ConversationResponse> {
    const { phoneNumber, message: messageText, messageType } = message;

    let conversation = await this.getConversation(phoneNumber);
    if (!conversation) {
      conversation = this.createNewConversation(phoneNumber);
    }
    
    conversation.lastActivity = new Date();

    const response = await this.processStep(conversation, messageText, messageType, message);

    await this.saveConversation(conversation);
    return response;
  }

  private async processStep(
    conversation: ConversationState, 
    message: string, 
    messageType: string,
    fullMessage: WhatsAppMessage
  ): Promise<ConversationResponse> {
    
    // Allow conversation reset
    if (message.toLowerCase() === 'reiniciar') {
      const newConversation = this.createNewConversation(conversation.phoneNumber);
      await this.saveConversation(newConversation);
      return this.handleStart(newConversation);
    }

    switch (conversation.currentStep) {
      case 'start':
        return this.handleStart(conversation);
      
      case 'get_name':
        return this.handleGetName(conversation, message);
      
      case 'get_whatsapp':
        return this.handleGetWhatsapp(conversation, message);

      case 'get_profession':
        return this.handleGetProfession(conversation, message);

      case 'get_neighborhood':
        return this.handleGetNeighborhood(conversation, message);

      case 'get_experience':
        return this.handleGetExperience(conversation, message);

      case 'get_profile_photo':
        return this.handleGetProfilePhoto(conversation, message, messageType, fullMessage);

      case 'get_services':
        return this.handleGetServices(conversation, message);

      case 'get_locomotion':
        return this.handleGetLocomotion(conversation, message);
      
      case 'get_gallery_photos':
        return this.handleGetGalleryPhotos(conversation, message, messageType, fullMessage);

      case 'finish_registration':
        return this.handleFinishRegistration(conversation);

      default:
        conversation.currentStep = 'start';
        return this.handleStart(conversation);
    }
  }

  private handleStart(conversation: ConversationState): ConversationResponse {
    conversation.currentStep = 'get_name';
    return {
      reply: "Olá! Vou te ajudar a se cadastrar. Qual é seu nome completo?",
    };
  }

  private handleGetName(conversation: ConversationState, message: string): ConversationResponse {
    if (!message || message.trim().length < 3) {
      return { reply: "Por favor, digite um nome válido." };
    }
    conversation.userData.nome = message.trim();
    conversation.currentStep = 'get_whatsapp';
    return { reply: "Qual seu número do WhatsApp?" };
  }

  private handleGetWhatsapp(conversation: ConversationState, message: string): ConversationResponse {
    const phoneRegex = /^\d{10,13}$/;
    if (!message || !phoneRegex.test(message.replace(/\s/g, ''))) {
      return { reply: "Por favor, envie um número de WhatsApp válido com DDD." };
    }
    conversation.userData.whatsapp = message.replace(/\s/g, '');
    conversation.currentStep = 'get_profession';
    return { reply: "Qual sua profissão? (pedreiro, eletricista, pintor, etc.)" };
  }

  private handleGetProfession(conversation: ConversationState, message: string): ConversationResponse {
    if (!message || message.trim().length < 3) {
      return { reply: "Por favor, digite uma profissão válida." };
    }
    conversation.userData.profissao = message.trim();
    conversation.currentStep = 'get_neighborhood';
    return { reply: "Em qual bairro você mora?" };
  }

  private handleGetNeighborhood(conversation: ConversationState, message: string): ConversationResponse {
    if (!message || message.trim().length < 3) {
      return { reply: "Por favor, digite um bairro válido." };
    }
    conversation.userData.bairro = message.trim();
    conversation.currentStep = 'get_experience';
    return { reply: "Quantos anos de experiência você tem na sua profissão?" };
  }

  private handleGetExperience(conversation: ConversationState, message: string): ConversationResponse {
    const experience = parseInt(message, 10);
    if (isNaN(experience) || experience < 0) {
      return { reply: "Por favor, envie um número válido de anos de experiência." };
    }
    conversation.userData.anos_experiencia = experience;
    conversation.currentStep = 'get_profile_photo';
    return { reply: "Agora envie uma foto sua para o perfil (foto do rosto, bem clara)" };
  }

  private async handleGetProfilePhoto(conversation: ConversationState, message: string, messageType: string, fullMessage: WhatsAppMessage): Promise<ConversationResponse> {
    if (messageType !== 'image' || !fullMessage.mediaUrl) {
      return { reply: "Por favor, envie uma imagem." };
    }
    try {
      const imageUrl = await this.whatsappService.getMediaUrl(fullMessage.mediaUrl);
      // Here you would typically download and save the image to Cloudinary/S3
      // For now, we'll just store the URL.
      conversation.userData.foto_perfil = imageUrl;
      conversation.currentStep = 'get_services';
      return { reply: "Que serviços você executa? Liste todos que você faz" };
    } catch (error) {
      console.error("Error processing profile photo:", error);
      return { reply: "Ocorreu um erro ao processar sua foto. Tente novamente." };
    }
  }

  private handleGetServices(conversation: ConversationState, message: string): ConversationResponse {
    if (!message || message.trim().length < 5) {
      return { reply: "Por favor, liste os serviços que você executa." };
    }
    conversation.userData.servicos = message.trim();
    conversation.currentStep = 'get_locomotion';
    return { reply: "Como você se desloca até o serviço? (carro próprio, moto, transporte público, etc.)" };
  }

  private handleGetLocomotion(conversation: ConversationState, message: string): ConversationResponse {
    if (!message || message.trim().length < 3) {
      return { reply: "Por favor, informe como você se locomove." };
    }
    conversation.userData.locomocao = message.trim();
    conversation.currentStep = 'get_gallery_photos';
    return { reply: "Envie fotos dos seus trabalhos (galeria com seus melhores serviços)" };
  }

  private async handleGetGalleryPhotos(conversation: ConversationState, message: string, messageType: string, fullMessage: WhatsAppMessage): Promise<ConversationResponse> {
     if (messageType !== 'image' || !fullMessage.mediaUrl) {
       // Check if user wants to finish
       if (message.toLowerCase().includes('fim') || message.toLowerCase().includes('acabei') || message.toLowerCase().includes('pronto')) {
         return this.handleFinishRegistration(conversation);
       }
      return { reply: "Por favor, envie uma imagem. Quando terminar, digite 'fim'." };
    }

    try {
      const imageUrl = await this.whatsappService.getMediaUrl(fullMessage.mediaUrl);
      if (!conversation.userData.galeria_fotos) {
        conversation.userData.galeria_fotos = [];
      }
      conversation.userData.galeria_fotos.push(imageUrl);
      
      // Do not advance step, allow multiple photos.
      return { reply: `Foto recebida! Envie mais fotos ou digite "fim" para finalizar.` };
    } catch (error) {
      console.error("Error processing gallery photo:", error);
      return { reply: "Ocorreu um erro ao processar sua foto. Tente novamente ou digite 'fim'." };
    }
  }

  private async handleFinishRegistration(conversation: ConversationState): Promise<ConversationResponse> {
    conversation.currentStep = 'completed';
    conversation.isComplete = true;

    try {
      // Save the final data to the database
      await this.databaseService.saveRegistration(conversation.userData);
      console.log('✅ Cadastro finalizado e salvo:', conversation.userData);
    } catch(error) {
      console.error("❌ Erro ao salvar o cadastro no banco:", error);
      return { reply: "Tivemos um problema ao salvar seu cadastro. Por favor, tente reiniciar a conversa digitando 'reiniciar'." };
    }
    
    return {
      reply: "Cadastro finalizado! Em breve entraremos em contato.",
      isComplete: true,
      registrationData: conversation.userData
    };
  }

  private createNewConversation(phoneNumber: string): ConversationState {
    return {
      phoneNumber,
      currentStep: 'start',
      userData: {},
      startedAt: new Date(),
      lastActivity: new Date(),
      isComplete: false,
    };
  }

  private async getConversation(phoneNumber: string): Promise<ConversationState | null> {
    // First, check in-memory cache
    if (this.conversations.has(phoneNumber)) {
      return this.conversations.get(phoneNumber) as ConversationState;
    }
    // Then, check database
    const session = await this.databaseService.getSession(phoneNumber);
    if (session) {
      this.conversations.set(phoneNumber, session);
      return session;
    }
    return null;
  }

  private async saveConversation(conversation: ConversationState): Promise<void> {
    this.conversations.set(conversation.phoneNumber, conversation);
    await this.databaseService.saveSession(conversation);
  }
}