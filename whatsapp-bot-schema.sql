-- WhatsApp Audio Registration Bot Database Schema
-- This extends the existing ConnectaPro database

-- Table to store WhatsApp conversation states
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    current_step VARCHAR(50) NOT NULL DEFAULT 'greeting',
    user_data JSONB DEFAULT '{}',
    is_complete BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Indexes for performance
    CONSTRAINT unique_active_conversation UNIQUE (phone_number, is_active) 
    DEFERRABLE INITIALLY DEFERRED
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_phone ON whatsapp_conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_active ON whatsapp_conversations(is_active);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_step ON whatsapp_conversations(current_step);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_created ON whatsapp_conversations(created_at);

-- Table to store message logs for debugging and analytics
CREATE TABLE IF NOT EXISTS whatsapp_message_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    message_type VARCHAR(20) NOT NULL, -- 'text', 'audio', 'image', 'outbound'
    message_content TEXT,
    media_url TEXT,
    transcription TEXT, -- For audio messages
    direction VARCHAR(10) NOT NULL, -- 'inbound' or 'outbound'
    whatsapp_message_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for message logs
CREATE INDEX IF NOT EXISTS idx_message_logs_conversation ON whatsapp_message_logs(conversation_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_phone ON whatsapp_message_logs(phone_number);
CREATE INDEX IF NOT EXISTS idx_message_logs_created ON whatsapp_message_logs(created_at);

-- Table to store media files (photos, audio)
CREATE TABLE IF NOT EXISTS whatsapp_media_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    media_type VARCHAR(20) NOT NULL, -- 'profile_photo', 'portfolio_photo', 'audio'
    original_url TEXT,
    stored_url TEXT,
    file_size INTEGER,
    mime_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for media files
CREATE INDEX IF NOT EXISTS idx_media_files_conversation ON whatsapp_media_files(conversation_id);
CREATE INDEX IF NOT EXISTS idx_media_files_type ON whatsapp_media_files(media_type);

-- Add new columns to existing profissionais_pendentes table for WhatsApp integration
DO $$ 
BEGIN
    -- Add origem column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profissionais_pendentes' 
                   AND column_name = 'origem') THEN
        ALTER TABLE profissionais_pendentes ADD COLUMN origem VARCHAR(50) DEFAULT 'site';
    END IF;
    
    -- Add whatsapp_phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profissionais_pendentes' 
                   AND column_name = 'whatsapp_phone') THEN
        ALTER TABLE profissionais_pendentes ADD COLUMN whatsapp_phone VARCHAR(20);
    END IF;
    
    -- Add foto_perfil column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profissionais_pendentes' 
                   AND column_name = 'foto_perfil') THEN
        ALTER TABLE profissionais_pendentes ADD COLUMN foto_perfil TEXT;
    END IF;
    
    -- Add fotos_portfolio column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profissionais_pendentes' 
                   AND column_name = 'fotos_portfolio') THEN
        ALTER TABLE profissionais_pendentes ADD COLUMN fotos_portfolio TEXT[];
    END IF;
    
    -- Add conversation_id column to link with WhatsApp conversations
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profissionais_pendentes' 
                   AND column_name = 'conversation_id') THEN
        ALTER TABLE profissionais_pendentes ADD COLUMN conversation_id UUID REFERENCES whatsapp_conversations(id);
    END IF;
END $$;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for whatsapp_conversations
DROP TRIGGER IF EXISTS update_whatsapp_conversations_updated_at ON whatsapp_conversations;
CREATE TRIGGER update_whatsapp_conversations_updated_at
    BEFORE UPDATE ON whatsapp_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for active conversations with user data
CREATE OR REPLACE VIEW active_whatsapp_conversations AS
SELECT 
    c.id,
    c.phone_number,
    c.current_step,
    c.user_data,
    c.created_at,
    c.updated_at,
    c.user_data->>'nome' as nome,
    c.user_data->>'tipoTrabalho' as tipo_trabalho,
    c.user_data->>'cidade' as cidade,
    EXTRACT(EPOCH FROM (NOW() - c.updated_at))/60 as minutes_since_last_activity
FROM whatsapp_conversations c
WHERE c.is_active = true
ORDER BY c.updated_at DESC;

-- Create view for conversation statistics
CREATE OR REPLACE VIEW whatsapp_conversation_stats AS
SELECT 
    COUNT(*) as total_conversations,
    COUNT(*) FILTER (WHERE is_active = true) as active_conversations,
    COUNT(*) FILTER (WHERE is_complete = true) as completed_conversations,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_conversations,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_conversations,
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at))/60) FILTER (WHERE is_complete = true) as avg_completion_time_minutes
FROM whatsapp_conversations;

-- Insert sample data for testing (optional)
-- INSERT INTO whatsapp_conversations (phone_number, current_step, user_data) VALUES
-- ('5569999887766', 'greeting', '{}'),
-- ('5569888776655', 'name', '{"nome": "João Silva"}');

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON whatsapp_conversations TO your_app_user;
-- GRANT ALL PRIVILEGES ON whatsapp_message_logs TO your_app_user;
-- GRANT ALL PRIVILEGES ON whatsapp_media_files TO your_app_user;

-- Comments for documentation
COMMENT ON TABLE whatsapp_conversations IS 'Stores the state of ongoing WhatsApp registration conversations';
COMMENT ON TABLE whatsapp_message_logs IS 'Logs all WhatsApp messages for debugging and analytics';
COMMENT ON TABLE whatsapp_media_files IS 'Stores references to media files (photos, audio) uploaded via WhatsApp';
COMMENT ON VIEW active_whatsapp_conversations IS 'Shows currently active conversations with extracted user data';
COMMENT ON VIEW whatsapp_conversation_stats IS 'Provides statistics about WhatsApp conversations'; 