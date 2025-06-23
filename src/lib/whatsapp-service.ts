export class WhatsAppService {
  private accessToken: string;
  private phoneNumberId: string;
  private apiUrl: string;

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.apiUrl = `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`;
  }

  async sendMessage(to: string, message: string): Promise<void> {
    try {
      console.log(`📤 Sending message to ${to}:`, message);

      // For development, just log the message
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode - message logged instead of sent');
        return;
      }

      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: message
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`WhatsApp API error: ${error}`);
      }

      const result = await response.json();
      console.log('✅ Message sent successfully:', result);

    } catch (error) {
      console.error('❌ Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  async sendAudioMessage(to: string, audioUrl: string): Promise<void> {
    try {
      console.log(`🎤 Sending audio message to ${to}`);

      // For development, just log
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode - audio message logged instead of sent');
        return;
      }

      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'audio',
        audio: {
          link: audioUrl
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`WhatsApp API error: ${error}`);
      }

      console.log('✅ Audio message sent successfully');

    } catch (error) {
      console.error('❌ Failed to send WhatsApp audio message:', error);
      throw error;
    }
  }

  async getMediaUrl(mediaId: string): Promise<string> {
    try {
      console.log(`📥 Getting media URL for ID: ${mediaId}`);

      // For development, return mock URL
      if (process.env.NODE_ENV === 'development') {
        return `https://mock-media-url.com/${mediaId}`;
      }

      const mediaInfoUrl = `https://graph.facebook.com/v18.0/${mediaId}`;
      
      const response = await fetch(mediaInfoUrl, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get media info: ${response.statusText}`);
      }

      const mediaInfo = await response.json();
      const mediaUrl = mediaInfo.url;

      // Download the actual media file
      const mediaResponse = await fetch(mediaUrl, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!mediaResponse.ok) {
        throw new Error(`Failed to download media: ${mediaResponse.statusText}`);
      }

      // In a real implementation, you would save this to your storage
      // and return the URL to your stored file
      return mediaUrl;

    } catch (error) {
      console.error('❌ Failed to get media URL:', error);
      throw error;
    }
  }

  async sendTemplateMessage(to: string, templateName: string, parameters: string[]): Promise<void> {
    try {
      console.log(`📨 Sending template message to ${to}:`, templateName);

      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'pt_BR'
          },
          components: [
            {
              type: 'body',
              parameters: parameters.map(param => ({
                type: 'text',
                text: param
              }))
            }
          ]
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`WhatsApp API error: ${error}`);
      }

      console.log('✅ Template message sent successfully');

    } catch (error) {
      console.error('❌ Failed to send template message:', error);
      throw error;
    }
  }

  async markAsRead(messageId: string): Promise<void> {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Failed to mark message as read');
      }

    } catch (error) {
      console.error('❌ Failed to mark message as read:', error);
    }
  }

  // Utility method to format phone number
  formatPhoneNumber(phoneNumber: string): string {
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleanNumber.startsWith('55')) {
      return `55${cleanNumber}`;
    }
    
    return cleanNumber;
  }

  // Validate WhatsApp phone number format
  isValidWhatsAppNumber(phoneNumber: string): boolean {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Brazilian number with country code should be 13 digits (55 + 11 digits)
    // or 12 digits for landlines (55 + 10 digits)
    return cleanNumber.length >= 12 && cleanNumber.length <= 13 && cleanNumber.startsWith('55');
  }
} 