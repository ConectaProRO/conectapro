-- 🛡️ ConectaPro - Setup do Banco de Dados
-- Execute este SQL no Supabase SQL Editor

-- 1. Tabela de profissionais pendentes (aguardando aprovação)
CREATE TABLE IF NOT EXISTS profissionais_pendentes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    servicos TEXT[] NOT NULL,
    experiencia TEXT NOT NULL,
    portfolio_urls TEXT[],
    endereco JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    origem VARCHAR(20) DEFAULT 'site' CHECK (origem IN ('site', 'whatsapp')),
    dados_whatsapp JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    aprovado_por VARCHAR(255),
    aprovado_em TIMESTAMP WITH TIME ZONE,
    observacoes TEXT
);

-- 2. Tabela de profissionais aprovados (aparecem na busca pública)
CREATE TABLE IF NOT EXISTS profissionais_aprovados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    servicos TEXT[] NOT NULL,
    experiencia TEXT NOT NULL,
    portfolio_urls TEXT[],
    endereco JSONB NOT NULL,
    avaliacao_media DECIMAL(3,2) DEFAULT 5.0,
    total_avaliacoes INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    visivel BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profissional_id UUID REFERENCES profissionais_aprovados(id) ON DELETE CASCADE,
    cliente_nome VARCHAR(255) NOT NULL,
    cliente_telefone VARCHAR(20),
    nota INTEGER CHECK (nota >= 1 AND nota <= 5) NOT NULL,
    comentario TEXT,
    servico_realizado VARCHAR(255),
    data_servico DATE,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada', 'rejeitada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Índices para performance
CREATE INDEX IF NOT EXISTS idx_profissionais_pendentes_status ON profissionais_pendentes(status);
CREATE INDEX IF NOT EXISTS idx_profissionais_pendentes_origem ON profissionais_pendentes(origem);
CREATE INDEX IF NOT EXISTS idx_profissionais_pendentes_created_at ON profissionais_pendentes(created_at);
CREATE INDEX IF NOT EXISTS idx_profissionais_aprovados_ativo ON profissionais_aprovados(ativo);
CREATE INDEX IF NOT EXISTS idx_profissionais_aprovados_visivel ON profissionais_aprovados(visivel);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_profissional ON avaliacoes(profissional_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_status ON avaliacoes(status);

-- 5. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profissionais_pendentes_updated_at 
    BEFORE UPDATE ON profissionais_pendentes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profissionais_aprovados_updated_at 
    BEFORE UPDATE ON profissionais_aprovados 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_avaliacoes_updated_at 
    BEFORE UPDATE ON avaliacoes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Inserir dados de exemplo para teste
INSERT INTO profissionais_pendentes (nome, telefone, email, servicos, experiencia, endereco, origem) VALUES
('João Silva', '69999887766', 'joao@email.com', ARRAY['Pedreiro', 'Construção Geral'], '15 anos de experiência', '{"rua": "Rua das Flores, 123", "bairro": "Centro", "cidade": "Porto Velho", "estado": "RO"}', 'site'),
('Maria Santos', '69888776655', null, ARRAY['Pintor'], '8 anos pintando casas e comércios', '{"rua": "Av. Jorge Teixeira, 456", "bairro": "Liberdade", "cidade": "Porto Velho", "estado": "RO"}', 'whatsapp'),
('Carlos Oliveira', '69777665544', 'carlos@email.com', ARRAY['Eletricista', 'Instalações'], '12 anos na área elétrica', '{"rua": "Rua Almirante Barroso, 789", "bairro": "São João Bosco", "cidade": "Porto Velho", "estado": "RO"}', 'site');

-- 7. Configurar RLS (Row Level Security) - Opcional para mais segurança
-- ALTER TABLE profissionais_pendentes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profissionais_aprovados ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;

-- 8. Criar view para estatísticas do admin
CREATE OR REPLACE VIEW admin_stats AS
SELECT 
    (SELECT COUNT(*) FROM profissionais_pendentes WHERE status = 'pendente') as pendentes,
    (SELECT COUNT(*) FROM profissionais_aprovados WHERE ativo = true) as aprovados,
    (SELECT COUNT(*) FROM profissionais_pendentes WHERE origem = 'whatsapp' AND status = 'pendente') as pendentes_whatsapp,
    (SELECT COUNT(*) FROM profissionais_pendentes WHERE origem = 'site' AND status = 'pendente') as pendentes_site,
    (SELECT COUNT(*) FROM profissionais_pendentes WHERE DATE(created_at) = CURRENT_DATE) as cadastros_hoje,
    (SELECT COUNT(*) FROM avaliacoes WHERE status = 'pendente') as avaliacoes_pendentes;

-- ✅ Banco de dados configurado com sucesso!
-- Agora você pode usar o painel admin em /admin/cadastros 