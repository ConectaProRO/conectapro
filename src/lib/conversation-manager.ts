import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// Interfaces
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  tags?: string[];
  status: 'active' | 'archived' | 'deleted';
}

interface ConversationSummary {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  updatedAt: Date;
  tags?: string[];
  status: string;
}

class ConversationManager {
  private conversations: Map<string, Conversation> = new Map();
  private dataPath: string;

  constructor(dataPath: string = './data') {
    this.dataPath = dataPath;
    this.ensureDataDirectory();
    this.loadConversations();
  }

  private async ensureDataDirectory(): Promise<void> {
    try {
      await fs.access(this.dataPath);
    } catch {
      await fs.mkdir(this.dataPath, { recursive: true });
    }
  }

  private getFilePath(conversationId: string): string {
    return path.join(this.dataPath, `${conversationId}.json`);
  }

  private async loadConversations(): Promise<void> {
    try {
      const files = await fs.readdir(this.dataPath);
      const jsonFiles = files.filter(file => file.startsWith('conversa-') && file.endsWith('.json'));

      for (const file of jsonFiles) {
        try {
          const filePath = path.join(this.dataPath, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const conversation: Conversation = JSON.parse(data);
          
          // Convert date strings back to Date objects
          conversation.createdAt = new Date(conversation.createdAt);
          conversation.updatedAt = new Date(conversation.updatedAt);
          conversation.messages.forEach(msg => {
            msg.timestamp = new Date(msg.timestamp);
          });

          this.conversations.set(conversation.id, conversation);
        } catch (error) {
          console.error(`Error loading conversation from ${file}:`, error);
        }
      }

      console.log(`Loaded ${this.conversations.size} conversations`);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

  private async saveConversation(conversation: Conversation): Promise<void> {
    try {
      const filePath = this.getFilePath(conversation.id);
      await fs.writeFile(filePath, JSON.stringify(conversation, null, 2));
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }

  private async deleteConversationFile(conversationId: string): Promise<void> {
    try {
      const filePath = this.getFilePath(conversationId);
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting conversation file:', error);
    }
  }

  // Public methods
  async createConversation(title?: string, userId?: string): Promise<Conversation> {
    const conversation: Conversation = {
      id: uuidv4(),
      title: title || 'Nova Conversa',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      tags: [],
      status: 'active'
    };

    this.conversations.set(conversation.id, conversation);
    await this.saveConversation(conversation);
    
    return conversation;
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return this.conversations.get(id) || null;
  }

  async getAllConversations(userId?: string): Promise<ConversationSummary[]> {
    const conversations = Array.from(this.conversations.values())
      .filter(conv => !userId || conv.userId === userId)
      .filter(conv => conv.status !== 'deleted')
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return conversations.map(conv => ({
      id: conv.id,
      title: conv.title,
      lastMessage: conv.messages[conv.messages.length - 1]?.content || '',
      messageCount: conv.messages.length,
      updatedAt: conv.updatedAt,
      tags: conv.tags,
      status: conv.status
    }));
  }

  async addMessage(conversationId: string, role: Message['role'], content: string, metadata?: Record<string, any>): Promise<Message | null> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return null;

    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
      metadata
    };

    conversation.messages.push(message);
    conversation.updatedAt = new Date();

    // Auto-generate title from first user message
    if (conversation.messages.length === 1 && role === 'user') {
      conversation.title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
    }

    await this.saveConversation(conversation);
    return message;
  }

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<Conversation | null> {
    const conversation = this.conversations.get(id);
    if (!conversation) return null;

    Object.assign(conversation, updates, { updatedAt: new Date() });
    await this.saveConversation(conversation);
    
    return conversation;
  }

  async deleteConversation(id: string, permanent: boolean = false): Promise<boolean> {
    const conversation = this.conversations.get(id);
    if (!conversation) return false;

    if (permanent) {
      this.conversations.delete(id);
      await this.deleteConversationFile(id);
    } else {
      conversation.status = 'deleted';
      conversation.updatedAt = new Date();
      await this.saveConversation(conversation);
    }

    return true;
  }

  async searchConversations(query: string, userId?: string): Promise<ConversationSummary[]> {
    const searchTerm = query.toLowerCase();
    const conversations = Array.from(this.conversations.values())
      .filter(conv => !userId || conv.userId === userId)
      .filter(conv => conv.status !== 'deleted')
      .filter(conv => 
        conv.title.toLowerCase().includes(searchTerm) ||
        conv.messages.some(msg => msg.content.toLowerCase().includes(searchTerm)) ||
        conv.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return conversations.map(conv => ({
      id: conv.id,
      title: conv.title,
      lastMessage: conv.messages[conv.messages.length - 1]?.content || '',
      messageCount: conv.messages.length,
      updatedAt: conv.updatedAt,
      tags: conv.tags,
      status: conv.status
    }));
  }

  async getStats(userId?: string): Promise<Record<string, any>> {
    const conversations = Array.from(this.conversations.values())
      .filter(conv => !userId || conv.userId === userId)
      .filter(conv => conv.status !== 'deleted');

    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
    const avgMessagesPerConv = conversations.length > 0 ? totalMessages / conversations.length : 0;

    return {
      totalConversations: conversations.length,
      totalMessages,
      averageMessagesPerConversation: Math.round(avgMessagesPerConv * 100) / 100,
      activeConversations: conversations.filter(conv => conv.status === 'active').length,
      archivedConversations: conversations.filter(conv => conv.status === 'archived').length
    };
  }

  async processMessage({ phoneNumber, message, messageType, messageId }: { phoneNumber: string, message: string, messageType: string, messageId: string }) {
    // Aqui você pode criar uma conversa nova ou buscar uma existente pelo phoneNumber
    // Para exemplo, só retorna uma resposta fixa:
    return { reply: "Mensagem recebida: " + message };
  }
}

export { ConversationManager };