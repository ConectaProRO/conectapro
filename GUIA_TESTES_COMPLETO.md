# 🎯 Guia Completo de Testes - ConectaPro

## 📋 **Visão Geral do Sistema**

Sistema completo para conectar profissionais da construção civil com clientes em Porto Velho, com foco em profissionais semianalfabetos que preferem comunicação por áudio via WhatsApp.

---

## 🚀 **1. CONFIGURAÇÃO INICIAL**

### 1.1 Configurar Supabase

```bash
# 1. Acesse https://supabase.com
# 2. Crie uma conta gratuita
# 3. Crie um novo projeto
# 4. Vá em Settings > API
# 5. Copie URL e Anon Key
```

### 1.2 Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 1.3 Configurar Banco de Dados

```sql
-- Execute no Supabase SQL Editor:
-- Copie e cole todo o conteúdo do arquivo setup-database.sql
```

---

## 🎯 **2. TESTES DO SISTEMA WEB**

### 2.1 Criar Dados de Teste

```bash
# Na raiz do projeto:
node criar-dados-teste.js
```

**Resultado esperado:**
- 6 profissionais fictícios criados
- 3 do site, 3 do WhatsApp
- Dados variados (pedreiro, pintor, eletricista, etc.)

### 2.2 Testar Admin Page

**URL:** https://conectapro-b1vaje3bv-conecta-pro.vercel.app/admin

**Testes a realizar:**

✅ **Visualização:**
- [ ] Estatísticas aparecem corretamente
- [ ] Lista de profissionais pendentes carrega
- [ ] Filtros funcionam (Todos/Site/WhatsApp)
- [ ] Interface responsiva (desktop/mobile)

✅ **Funcionalidades:**
- [ ] Aprovar profissional + WhatsApp automático
- [ ] Rejeitar profissional + WhatsApp explicativo
- [ ] Enviar lembrete via WhatsApp
- [ ] Conversar diretamente (abre WhatsApp)
- [ ] Recarregar dados do Supabase

### 2.3 Testar Cadastro via Site

**URL:** https://conectapro-b1vaje3bv-conecta-pro.vercel.app/cadastro-profissional

**Fluxo de teste:**
1. Preencher formulário completo
2. Verificar se aparece no admin como "pendente"
3. Aprovar pelo admin
4. Verificar se move para "aprovados"

---

## 📱 **3. TESTES DO BOT WHATSAPP**

### 3.1 Configurar Bot

```bash
# Entrar na pasta do bot:
cd whatsapp-bot

# Instalar dependências:
npm install

# Criar arquivo .env:
cp env-bot-example.txt .env
# Editar .env com suas credenciais
```

### 3.2 Executar Bot

```bash
# Iniciar bot:
npm start

# Escanear QR Code com WhatsApp
# Bot ficará online
```

### 3.3 Testar Conversas

**Comandos para testar:**

1. **Iniciar cadastro:**
   - Envie: `oi` ou `cadastro`
   - Bot deve responder com boas-vindas

2. **Fluxo completo:**
   ```
   Você: cadastro
   Bot: Que bom! Você trabalha com quê?
   
   Você: pedreiro
   Bot: Há quanto tempo trabalha?
   
   Você: 5 anos
   Bot: Onde você trabalha?
   
   Você: porto velho centro
   Bot: Qual seu telefone?
   
   Você: 69999887766
   Bot: [Mostra resumo] Está correto?
   
   Você: sim
   Bot: Cadastro realizado!
   ```

3. **Comandos especiais:**
   - `ajuda` = mostrar ajuda
   - `admin` = informações administrativas

### 3.4 Testar Áudios (Simulado)

- Envie mensagem de áudio
- Bot deve responder "Áudio recebido! Processando..."
- Continue conversa normalmente

---

## 🔄 **4. FLUXO COMPLETO DE TESTE**

### Cenário: Profissional se cadastra via WhatsApp

1. **WhatsApp Bot:**
   - Profissional inicia conversa
   - Completa cadastro (pode usar áudios)
   - Recebe confirmação

2. **Admin recebe notificação:**
   - WhatsApp com novo cadastro
   - Acessa admin page

3. **Admin aprova:**
   - Vê profissional pendente
   - Clica "Aprovar + WhatsApp"
   - Sistema envia WhatsApp automático

4. **Profissional recebe aprovação:**
   - WhatsApp com parabéns
   - Link para acessar plataforma
   - Dicas de como usar

---

## 🎤 **5. TESTES ESPECÍFICOS PARA SEMIANALFABETOS**

### 5.1 Linguagem Simples

**Verificar se bot usa:**
- ✅ Frases curtas e diretas
- ✅ Emojis para facilitar compreensão
- ✅ Exemplos práticos
- ✅ Evita termos técnicos

### 5.2 Suporte a Áudios

**Testar:**
- [ ] Bot aceita mensagens de áudio
- [ ] Responde adequadamente
- [ ] Encoraja uso de áudios
- [ ] Não força digitação

### 5.3 Mensagens Motivacionais

**WhatsApp de aprovação deve ter:**
- ✅ Parabéns entusiasmados
- ✅ Explicação simples do que acontece
- ✅ Dicas práticas de uso
- ✅ Encorajamento profissional

---

## 📊 **6. MONITORAMENTO E LOGS**

### 6.1 Logs do Bot

```bash
# Verificar logs:
npm start

# Deve mostrar:
# - Mensagens recebidas
# - Processamento de cadastros
# - Erros (se houver)
```

### 6.2 Dados no Supabase

**Verificar tabelas:**
- `profissionais_pendentes` = novos cadastros
- `profissionais_aprovados` = aprovados pelo admin
- `avaliacoes` = avaliações de clientes

---

## 🛠️ **7. RESOLUÇÃO DE PROBLEMAS**

### 7.1 Bot não conecta

```bash
# Soluções:
1. Verificar internet
2. Reescanear QR Code
3. Reiniciar bot (Ctrl+C, npm start)
4. Verificar se WhatsApp Web está funcionando
```

### 7.2 Erro no Supabase

```bash
# Verificar:
1. Credenciais no .env.local
2. Tabelas criadas (setup-database.sql)
3. Permissões RLS desabilitadas
4. Quota não excedida
```

### 7.3 Admin page não carrega dados

```bash
# Soluções:
1. Verificar console do navegador
2. Testar conexão Supabase
3. Verificar se tabelas existem
4. Recarregar página
```

---

## 🎯 **8. CENÁRIOS DE TESTE AVANÇADOS**

### 8.1 Teste de Carga

- Criar 20+ profissionais fictícios
- Testar performance do admin
- Verificar filtros com muitos dados

### 8.2 Teste de Múltiplas Conversas

- Iniciar várias conversas simultâneas no bot
- Verificar se não há conflito
- Testar limpeza automática (2h)

### 8.3 Teste de Integração

- Cadastro via site → Admin → Aprovação
- Cadastro via WhatsApp → Admin → Rejeição
- Avaliações → Admin → Moderação

---

## 📱 **9. PREPARAÇÃO PARA PRODUÇÃO**

### 9.1 Configurar WhatsApp Business

- Usar número dedicado da ConectaPro
- Configurar perfil profissional
- Adicionar foto e descrição

### 9.2 Configurar Notificações Admin

```env
# No .env do bot:
ADMIN_WHATSAPP=556999887766  # Seu número
```

### 9.3 Backup e Segurança

- Supabase faz backup automático
- Configurar alertas de quota
- Monitorar logs de erro

---

## ✅ **10. CHECKLIST FINAL**

### Sistema Web:
- [ ] Admin page funcionando
- [ ] Cadastro via site funcionando
- [ ] Busca de profissionais funcionando
- [ ] Design responsivo OK

### Bot WhatsApp:
- [ ] Conecta e mostra QR Code
- [ ] Processa cadastros completos
- [ ] Salva no Supabase
- [ ] Envia notificações admin

### Integração:
- [ ] Dados fluem: Bot → Supabase → Admin
- [ ] WhatsApp automático funciona
- [ ] Aprovação/rejeição OK
- [ ] Estatísticas corretas

### UX para Semianalfabetos:
- [ ] Linguagem simples
- [ ] Suporte a áudios
- [ ] Mensagens motivacionais
- [ ] Processo intuitivo

---

## 🎉 **SISTEMA PRONTO PARA USAR!**

Com todos os testes aprovados, o sistema ConectaPro está pronto para conectar profissionais da construção civil com clientes em Porto Velho, oferecendo uma experiência acessível e profissional para todos os usuários.

**Próximo passo:** Divulgação e aquisição dos primeiros usuários reais! 🚀 