import { 
  WhatsAppMessage, 
  ConversationState, 
  ConversationResponse, 
  ConversationStep, 
  RegistrationData 
} from '@/types/whatsapp';
import { ConnectaProService } from './conectapro-service';
import { DatabaseService } from './database-service';

export class ConversationManager {
  private connectaProService: ConnectaProService;
  private databaseService: DatabaseService;
  private conversations: Map<string, ConversationState> = new Map();

  constructor() {
    this.connectaProService = new ConnectaProService();
    this.databaseService = new DatabaseService();
  }

  async processMessage(message: WhatsAppMessage): Promise<ConversationResponse> {
    const { phoneNumber, message: messageText, messageType } = message;

    // Get or create conversation state
    let conversation = await this.getConversation(phoneNumber);
    if (!conversation) {
      conversation = this.createNewConversation(phoneNumber);
    }

    // Update last activity
    conversation.lastActivity = new Date();

    // Process message based on current step
    const response = await this.processStep(conversation, messageText, messageType, message);

    // Save conversation state
    await this.saveConversation(conversation);

    return response;
  }

  private async processStep(
    conversation: ConversationState, 
    message: string, 
    messageType: string,
    fullMessage: WhatsAppMessage
  ): Promise<ConversationResponse> {
    
    switch (conversation.currentStep) {
      case 'greeting':
        return this.handleGreeting(conversation, message);
      
      case 'name':
        return this.handleName(conversation, message);
      
      case 'phone_confirmation':
        return this.handlePhoneConfirmation(conversation, message);
      
      case 'work_type':
        return this.handleWorkType(conversation, message);
      
      case 'experience':
        return this.handleExperience(conversation, message);
      
      case 'profile_photo':
        return this.handleProfilePhoto(conversation, message, messageType, fullMessage);
      
      case 'portfolio_photos':
        return this.handlePortfolioPhotos(conversation, message, messageType, fullMessage);
      
      case 'location_confirmation':
        return this.handleLocationConfirmation(conversation, message);
      
      case 'final_confirmation':
        return this.handleFinalConfirmation(conversation, message);
      
      default:
        return this.handleGreeting(conversation, message);
    }
  }

  private handleGreeting(conversation: ConversationState, message: string): ConversationResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('ola') || 
        lowerMessage.includes('começar') || lowerMessage.includes('cadastrar')) {
      
      conversation.currentStep = 'name';
      
      return {
        reply: `👋 Olá! Bem-vindo ao *ConnectaPro*!

🔨 Sou seu assistente e vou te ajudar a se cadastrar para receber mais trabalhos na construção.

📱 *Você pode responder por áudio ou texto* - como preferir!

👨‍🔧 Para começar, me fale seu *nome completo*:

🎤 *Dica:* Segure o botão do microfone e fale seu nome bem claro!`,
        nextStep: 'name'
      };
    }

    return {
      reply: `👋 Olá! Sou o assistente do *ConnectaPro*!

🔨 Te ajudo a se cadastrar para receber mais trabalhos na construção.

Digite ou fale *"oi"* para começar! 🎤`,
      nextStep: 'greeting'
    };
  }

  private handleName(conversation: ConversationState, message: string): ConversationResponse {
    // Extract name from message (remove common words)
    const cleanName = this.extractName(message);
    
    if (cleanName.length < 2) {
      return {
        reply: `❌ Não consegui entender seu nome.

👨‍🔧 Por favor, fale ou digite seu *nome completo*:

🎤 *Exemplo:* "Meu nome é João Silva"`,
        nextStep: 'name'
      };
    }

    conversation.userData.nome = cleanName;
    conversation.currentStep = 'phone_confirmation';

    return {
      reply: `👍 Prazer, *${cleanName}*!

📱 Vou confirmar seu número de telefone: *${conversation.phoneNumber}*

Este número está correto?

✅ Fale ou digite *"sim"*
❌ Fale ou digite *"não"* se estiver errado`,
      nextStep: 'phone_confirmation'
    };
  }

  private handlePhoneConfirmation(conversation: ConversationState, message: string): ConversationResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sim') || lowerMessage.includes('s') || lowerMessage.includes('correto')) {
      conversation.userData.telefone = conversation.phoneNumber;
      conversation.currentStep = 'work_type';
      
      return {
        reply: `📱 Telefone confirmado!

🔨 Agora me fale: *que tipo de trabalho você faz?*

*Exemplos:*
• Pedreiro
• Eletricista
• Pintor
• Encanador
• Carpinteiro
• Azulejista
• Gesseiro

🎤 Pode falar por áudio qual é sua profissão!`,
        nextStep: 'work_type'
      };
    }

    if (lowerMessage.includes('não') || lowerMessage.includes('nao') || lowerMessage.includes('errado')) {
      return {
        reply: `📱 Entendi! 

Por favor, me fale qual é seu *número correto* com DDD:

*Exemplo:* 69999887766

🎤 Pode falar por áudio os números!`,
        nextStep: 'phone_confirmation'
      };
    }

    // If it's a phone number, update it
    const phoneMatch = message.match(/\d{10,11}/);
    if (phoneMatch) {
      conversation.userData.telefone = phoneMatch[0];
      conversation.currentStep = 'work_type';
      
      return {
        reply: `📱 Número atualizado para: *${phoneMatch[0]}*

🔨 Agora me fale: *que tipo de trabalho você faz?*

*Exemplos:*
• Pedreiro
• Eletricista  
• Pintor
• Encanador

🎤 Pode falar por áudio sua profissão!`,
        nextStep: 'work_type'
      };
    }

    return {
      reply: `❓ Não entendi.

📱 Seu número *${conversation.phoneNumber}* está correto?

✅ Fale *"sim"* se estiver certo
❌ Fale *"não"* se estiver errado`,
      nextStep: 'phone_confirmation'
    };
  }

  private handleWorkType(conversation: ConversationState, message: string): ConversationResponse {
    const workType = this.extractWorkType(message);
    
    if (!workType) {
      return {
        reply: `❓ Não consegui identificar sua profissão.

🔨 Me fale novamente *que trabalho você faz*:

*Exemplos:*
• "Sou pedreiro"
• "Trabalho como eletricista"  
• "Faço pintura"
• "Sou encanador"

🎤 Fale bem claro sua profissão!`,
        nextStep: 'work_type'
      };
    }

    conversation.userData.tipoTrabalho = workType;
    conversation.userData.servicos = [workType];
    conversation.currentStep = 'experience';

    return {
      reply: `👍 Perfeito! Você trabalha como *${workType}*.

⏰ *Há quanto tempo* você trabalha nessa área?

*Exemplos:*
• "2 anos"
• "5 anos"  
• "Mais de 10 anos"
• "Desde criança"

🎤 Pode falar por áudio!`,
      nextStep: 'experience'
    };
  }

  private handleExperience(conversation: ConversationState, message: string): ConversationResponse {
    const experience = this.extractExperience(message);
    
    conversation.userData.experiencia = experience || message;
    conversation.currentStep = 'profile_photo';

    return {
      reply: `⭐ Ótimo! *${experience || message}* de experiência.

📸 Agora preciso de uma *foto sua* para o perfil.

*Importante:*
• Foto do seu rosto
• Bem iluminada
• Você sozinho na foto

📱 *Envie a foto* tocando no 📎 e escolhendo "Câmera" ou "Galeria"`,
      nextStep: 'profile_photo',
      shouldWaitForMedia: true
    };
  }

  private handleProfilePhoto(
    conversation: ConversationState, 
    message: string, 
    messageType: string,
    fullMessage: WhatsAppMessage
  ): ConversationResponse {
    
    if (messageType === 'image' && fullMessage.mediaUrl) {
      conversation.userData.fotoPerfil = fullMessage.mediaUrl;
      conversation.currentStep = 'portfolio_photos';
      
      return {
        reply: `📸 Foto de perfil recebida!

🔨 Agora me envie *fotos dos seus trabalhos* (até 8 fotos):

*Exemplos:*
• Casas que construiu
• Instalações que fez
• Pinturas realizadas
• Reformas concluídas

📱 Envie uma foto por vez. Quando terminar, fale *"pronto"* ou *"acabei"*`,
        nextStep: 'portfolio_photos',
        shouldWaitForMedia: true
      };
    }

    return {
      reply: `📸 Preciso de uma *foto sua* para o perfil.

*Como enviar:*
1. Toque no 📎 (clipe)
2. Escolha "Câmera" ou "Galeria"  
3. Selecione uma foto do seu rosto

*Importante:* Foto bem iluminada e você sozinho!`,
      nextStep: 'profile_photo',
      shouldWaitForMedia: true
    };
  }

  private handlePortfolioPhotos(
    conversation: ConversationState, 
    message: string, 
    messageType: string,
    fullMessage: WhatsAppMessage
  ): ConversationResponse {
    
    if (!conversation.userData.fotosPortfolio) {
      conversation.userData.fotosPortfolio = [];
    }

    if (messageType === 'image' && fullMessage.mediaUrl) {
      conversation.userData.fotosPortfolio.push(fullMessage.mediaUrl);
      
      const photoCount = conversation.userData.fotosPortfolio.length;
      
      if (photoCount >= 8) {
        conversation.currentStep = 'location_confirmation';
        return {
          reply: `📸 ${photoCount} fotos recebidas! Máximo atingido.

📍 Você trabalha em *Porto Velho - RO*?

✅ Fale *"sim"* se for correto
❌ Fale *"não"* se trabalhar em outra cidade`,
          nextStep: 'location_confirmation'
        };
      }

      return {
        reply: `📸 Foto ${photoCount} recebida!

🔨 Pode enviar mais fotos dos seus trabalhos (até 8 total).

Quando terminar, fale *"pronto"* ou *"acabei"*`,
        nextStep: 'portfolio_photos',
        shouldWaitForMedia: true
      };
    }

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('pronto') || lowerMessage.includes('acabei') || 
        lowerMessage.includes('terminar') || lowerMessage.includes('fim')) {
      
      conversation.currentStep = 'location_confirmation';
      
      const photoCount = conversation.userData.fotosPortfolio?.length || 0;
      return {
        reply: `✅ ${photoCount} fotos dos seus trabalhos recebidas!

📍 Você trabalha em *Porto Velho - RO*?

✅ Fale *"sim"* se for correto  
❌ Fale *"não"* se trabalhar em outra cidade`,
        nextStep: 'location_confirmation'
      };
    }

    return {
      reply: `🔨 Envie fotos dos seus trabalhos ou fale *"pronto"* quando terminar.

*Dica:* Fotos de obras, reformas, instalações que você fez!`,
      nextStep: 'portfolio_photos',
      shouldWaitForMedia: true
    };
  }

  private handleLocationConfirmation(conversation: ConversationState, message: string): ConversationResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sim') || lowerMessage.includes('s') || lowerMessage.includes('correto')) {
      conversation.userData.cidade = 'Porto Velho';
      conversation.userData.estado = 'RO';
      conversation.currentStep = 'final_confirmation';
      
      return this.generateFinalConfirmation(conversation);
    }

    if (lowerMessage.includes('não') || lowerMessage.includes('nao')) {
      return {
        reply: `📍 Em que cidade você trabalha?

*Exemplo:* "Trabalho em Ji-Paraná" ou "Ariquemes"

🎤 Pode falar por áudio o nome da cidade!`,
        nextStep: 'location_confirmation'
      };
    }

    // If it's a city name, save it
    conversation.userData.cidade = message;
    conversation.userData.estado = 'RO'; // Default to RO
    conversation.currentStep = 'final_confirmation';
    
    return this.generateFinalConfirmation(conversation);
  }

  private generateFinalConfirmation(conversation: ConversationState): ConversationResponse {
    const data = conversation.userData;
    const photoCount = data.fotosPortfolio?.length || 0;
    
    return {
      reply: `✅ *Dados do seu cadastro:*

👨‍🔧 *Nome:* ${data.nome}
📱 *Telefone:* ${data.telefone}
🔨 *Profissão:* ${data.tipoTrabalho}
⏰ *Experiência:* ${data.experiencia}
📍 *Cidade:* ${data.cidade}
📸 *Fotos:* 1 perfil + ${photoCount} trabalhos

*Tudo está correto?*

✅ Fale *"confirmar"* para finalizar
❌ Fale *"corrigir"* para alterar algo`,
      nextStep: 'final_confirmation'
    };
  }

  private async handleFinalConfirmation(conversation: ConversationState, message: string): Promise<ConversationResponse> {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('confirmar') || lowerMessage.includes('sim') || 
        lowerMessage.includes('finalizar') || lowerMessage.includes('ok')) {
      
      try {
        // Submit to ConnectaPro
        await this.connectaProService.submitRegistration(conversation.userData);
        
        conversation.currentStep = 'completed';
        conversation.isComplete = true;
        
        return {
          reply: `🎉 *Cadastro realizado com sucesso!*

✅ Seus dados foram enviados para análise
⏰ Em até 24h você receberá uma resposta
📱 Mantenha este WhatsApp ativo

🚀 *Próximos passos:*
• Aguarde aprovação
• Complete seu perfil no site
• Comece a receber clientes!

🔨 *ConnectaPro* - Conectando profissionais!

_Obrigado por escolher nossos serviços!_`,
          isComplete: true,
          registrationData: conversation.userData
        };
        
      } catch (error) {
        console.error('❌ Registration submission error:', error);
        return {
          reply: `❌ Erro ao enviar cadastro.

Tente novamente ou entre em contato:
📱 (69) 99370-5343

Seus dados estão salvos e podemos tentar novamente.`,
          nextStep: 'final_confirmation'
        };
      }
    }

    if (lowerMessage.includes('corrigir') || lowerMessage.includes('alterar') || lowerMessage.includes('não')) {
      return {
        reply: `🔄 O que você gostaria de corrigir?

1️⃣ *Nome*
2️⃣ *Telefone*  
3️⃣ *Profissão*
4️⃣ *Experiência*
5️⃣ *Fotos*
6️⃣ *Cidade*

Fale o número ou o nome do que quer alterar.`,
        nextStep: 'final_confirmation'
      };
    }

    return {
      reply: `❓ Não entendi.

*Seus dados estão corretos?*

✅ Fale *"confirmar"* para finalizar
❌ Fale *"corrigir"* para alterar`,
      nextStep: 'final_confirmation'
    };
  }

  // Helper methods
  private extractName(message: string): string {
    // Remove common phrases and clean up name
    let name = message
      .replace(/meu nome é|me chamo|sou|eu sou/gi, '')
      .replace(/[^\w\s]/g, '')
      .trim();
    
    // Capitalize first letter of each word
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private extractWorkType(message: string): string | null {
    const workTypes = {
      'pedreiro': ['pedreiro', 'pedreira', 'construção', 'construtor', 'obra'],
      'eletricista': ['eletricista', 'eletrica', 'elétrica', 'instalação elétrica', 'luz'],
      'pintor': ['pintor', 'pintura', 'tinta'],
      'encanador': ['encanador', 'cano', 'encanamento', 'hidráulica', 'hidraulica', 'água'],
      'carpinteiro': ['carpinteiro', 'madeira', 'marceneiro'],
      'azulejista': ['azulejista', 'azulejo', 'cerâmica', 'ceramica', 'piso'],
      'gesseiro': ['gesseiro', 'gesso', 'forro']
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [workType, keywords] of Object.entries(workTypes)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return workType;
      }
    }

    return null;
  }

  private extractExperience(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    // Look for number patterns
    const yearMatch = lowerMessage.match(/(\d+)\s*(ano|anos)/);
    if (yearMatch) {
      return `${yearMatch[1]} anos`;
    }

    // Look for common phrases
    if (lowerMessage.includes('muito tempo') || lowerMessage.includes('bastante tempo')) {
      return 'Mais de 10 anos';
    }
    
    if (lowerMessage.includes('pouco tempo') || lowerMessage.includes('começando')) {
      return 'Menos de 2 anos';
    }

    return null;
  }

  private createNewConversation(phoneNumber: string): ConversationState {
    return {
      phoneNumber,
      currentStep: 'greeting',
      userData: {},
      startedAt: new Date(),
      lastActivity: new Date(),
      isComplete: false
    };
  }

  private async getConversation(phoneNumber: string): Promise<ConversationState | null> {
    // First check in-memory cache
    if (this.conversations.has(phoneNumber)) {
      return this.conversations.get(phoneNumber)!;
    }

    // Then check database
    return await this.databaseService.getConversation(phoneNumber);
  }

  private async saveConversation(conversation: ConversationState): Promise<void> {
    // Save to in-memory cache
    this.conversations.set(conversation.phoneNumber, conversation);
    
    // Save to database
    await this.databaseService.saveConversation(conversation);
  }
} 