// WhatsApp Message Types
export interface WhatsAppMessage {
  phoneNumber: string;
  message: string;
  messageType: 'text' | 'audio' | 'image' | 'document';
  messageId: string;
  mediaUrl?: string | null;
  timestamp?: number;
}

// Conversation State Types
export interface ConversationState {
  phoneNumber: string;
  currentStep: ConversationStep;
  userData: RegistrationData;
  startedAt: Date;
  lastActivity: Date;
  isComplete: boolean;
}

export type ConversationStep = 
  | 'start'
  | 'get_name'
  | 'get_whatsapp'
  | 'get_profession'
  | 'get_neighborhood'
  | 'get_experience'
  | 'get_profile_photo'
  | 'get_services'
  | 'get_locomotion'
  | 'get_gallery_photos'
  | 'finish_registration'
  | 'completed';

// Registration Data Types (matching ConnectaPro form)
export interface RegistrationData {
  nome?: string;
  whatsapp?: string;
  profissao?: string;
  bairro?: string;
  anos_experiencia?: number;
  foto_perfil?: string;
  servicos?: string;
  locomocao?: string;
  galeria_fotos?: string[];
  // Legacy fields for compatibility, can be removed later
  email?: string;
  cidade?: string;
  estado?: string;
  descricao?: string;
}

// Conversation Response Types
export interface ConversationResponse {
  reply?: string;
  audioReply?: string;
  nextStep?: ConversationStep;
  shouldWaitForMedia?: boolean;
  isComplete?: boolean;
  registrationData?: RegistrationData;
}

// Audio Processing Types
export interface AudioTranscription {
  text: string;
  confidence: number;
  language: string;
  duration: number;
}

// WhatsApp API Types
export interface WhatsAppWebhookBody {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        messages?: Array<{
          from: string;
          id: string;
          timestamp: string;
          type: string;
          text?: { body: string };
          audio?: { id: string; mime_type: string };
          image?: { id: string; mime_type: string; caption?: string };
        }>;
      };
      field: string;
    }>;
  }>;
}

// Database Models
export interface UserSession {
  id: string;
  phoneNumber: string;
  conversationState: ConversationState;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  registrationSubmitted: boolean;
}

// ConnectaPro Integration Types
export interface ConnectaProRegistration {
  nome: string;
  telefone: string;
  email: string;
  experiencia: string;
  servicos: string[];
  descricao: string;
  cidade: string;
  origem: 'whatsapp-audio';
  fotoPerfil?: string;
  fotosPortfolio?: string[];
} 