# 🚀 Guia de Integração: API Orçamento 3D + Bubble + n8n

## 📋 **Preparação Completa**

Agora você tem tudo pronto para quando dominar Bubble e n8n:

### 📂 **Arquivos Criados:**
- ✅ `api_orcamento_3d.py` - API Flask completa
- ✅ `orcamento_3d_ai.py` - Sistema principal (já existia)
- ✅ `requirements_api.txt` - Dependências da API
- ✅ `arquitetura_bubble_n8n.md` - Arquitetura detalhada

---

## 🏗️ **1. Executar a API (Quando Pronto)**

### **Instalar Dependências:**
```bash
pip install -r requirements_api.txt
```

### **Iniciar API:**
```bash
python api_orcamento_3d.py
```

### **Acessar Interface:**
- 🌐 **Interface:** http://localhost:5000
- 📊 **Status:** http://localhost:5000/api/status
- 📋 **Documentação:** Página inicial mostra todos endpoints

---

## 🔗 **2. Integração com Bubble**

### **Setup Inicial Bubble:**
1. **Criar App** no Bubble.io
2. **Configurar API Connector:**
   - Name: `OrcamentoAPI`
   - Type: `Action`
   - Authentication: `None` (por enquanto)

### **Endpoint Principal:**
```
URL: http://localhost:5000/api/webhook/bubble
Method: POST
Headers: Content-Type: application/json
Body: {
  "nome_projeto": "Casa Cliente X",
  "url_modelo_3d": "https://sketchfab.com/modelo-url"
}
```

### **Workflow Bubble:**
```
1. User Input (nome_projeto, url_sketchfab)
2. API Workflow → Call API Connector
3. When API returns → Create Database Thing
4. Display results → Show to user
5. Send notification → Email/SMS
```

### **Data Types Bubble:**
```
Project:
- nome_projeto (text)
- projeto_id (text)
- area_total (number)
- total_geral (number)
- custo_por_m2 (number)
- data_criacao (text)
- status (text)

Budget_Item:
- project (Project)
- codigo_sinapi (text)
- descricao (text)
- quantidade (number)
- preco_unitario (number)
- preco_total (number)
```

---

## 🤖 **3. Integração com n8n**

### **Workflow n8n Exemplo:**

```json
{
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "orcamento-3d",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process 3D Model",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://localhost:5000/api/webhook/n8n",
        "method": "POST",
        "body": "json",
        "jsonBody": "={{ $json }}"
      }
    },
    {
      "name": "Save to Database",
      "type": "n8n-nodes-base.postgres",
      "parameters": {
        "operation": "insert",
        "table": "orcamentos"
      }
    },
    {
      "name": "Send WhatsApp",
      "type": "n8n-nodes-base.whatsApp",
      "parameters": {
        "message": "Orçamento pronto! Total: R$ {{ $json.total_geral }}"
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "subject": "Orçamento {{ $json.nome_projeto }}",
        "html": "Seu orçamento está pronto!"
      }
    }
  ]
}
```

### **Configuração n8n:**
1. **Webhook URL:** `http://your-n8n.com/webhook/orcamento-3d`
2. **HTTP Request:** Aponta para sua API
3. **Conditional:** Verifica se processamento foi sucesso
4. **Notifications:** WhatsApp + Email automáticos

---

## 📱 **4. Workflows Avançados**

### **Bubble → n8n → API → Cliente:**
```
1. Cliente submete no Bubble
2. Bubble chama webhook n8n
3. n8n processa via API Python
4. n8n salva no banco
5. n8n notifica cliente
6. n8n atualiza Bubble
```

### **Sketchfab → Automação Completa:**
```
1. URL Sketchfab → API análise
2. Elementos detectados → Cálculo SINAPI
3. Orçamento gerado → PDF automático
4. Cliente notificado → WhatsApp/Email
5. Pagamento → Stripe/PayPal
6. Contrato → DocuSign automático
```

---

## 🔧 **5. Endpoints da API**

### **📤 Processar Modelo:**
```bash
POST /api/processar
{
  "nome_projeto": "Casa 120m²",
  "url_modelo_3d": "https://sketchfab.com/modelo"
}
```

### **📊 Buscar Orçamento:**
```bash
GET /api/orcamento/PROJ_20250101_123456
```

### **📋 Listar Todos:**
```bash
GET /api/orcamentos
```

### **🔔 Webhooks Específicos:**
```bash
POST /api/webhook/bubble    # Otimizado para Bubble
POST /api/webhook/n8n       # Otimizado para n8n
```

### **📄 Relatório HTML:**
```bash
GET /api/relatorio/PROJ_20250101_123456
```

---

## 💡 **6. Casos de Uso Práticos**

### **🏠 Arquiteto Freelancer:**
```
Bubble App → Upload Sketchfab → API processa → 
Cliente vê orçamento → Aprova → Pagamento → 
Contrato automático
```

### **🏢 Construtora:**
```
n8n monitora pasta → Novos projetos → 
API processa lote → Relatórios → 
Equipe notificada → Dashboard atualizado
```

### **💼 Consultoria:**
```
White-label Bubble → Múltiplos clientes → 
n8n distribui processamento → APIs paralelas → 
Resultados consolidados
```

---

## 🚀 **7. Próximos Passos (Quando Dominar)**

### **Fase 1 - Básico:**
1. ✅ Testar API local
2. ✅ Criar app Bubble simples
3. ✅ Configurar workflow n8n básico
4. ✅ Integrar com webhook

### **Fase 2 - Avançado:**
1. 🔄 Deploy API na nuvem (Heroku/Railway)
2. 🗄️ Banco de dados real (PostgreSQL)
3. 🔐 Autenticação (JWT/OAuth)
4. 📊 Dashboard analytics

### **Fase 3 - Produção:**
1. 💳 Pagamentos (Stripe)
2. 📱 Notificações (WhatsApp Business)
3. 📄 Contratos (DocuSign)
4. 🌐 Multi-tenant

---

## 📚 **8. Recursos para Estudo**

### **Bubble:**
- 🎓 **Bubble Academy:** bubble.io/academy
- 📹 **YouTube:** "Bubble no-code tutorials"
- 💬 **Comunidade:** forum.bubble.io

### **n8n:**
- 📖 **Documentação:** docs.n8n.io
- 🎯 **Workflows:** n8n.io/workflows
- 💬 **Comunidade:** community.n8n.io

### **APIs & Webhooks:**
- 🔗 **Postman:** Para testar endpoints
- 📡 **Ngrok:** Para expor API local
- 🛠️ **Insomnia:** Alternativa ao Postman

---

## ✅ **Status Atual**

🎯 **Pronto para Integração:**
- ✅ API Flask funcional
- ✅ Sistema Python completo  
- ✅ Webhooks específicos
- ✅ Documentação completa
- ✅ Exemplos de uso

**Quando você dominar Bubble + n8n, é só seguir este guia e tudo se conecta automaticamente!** 🚀

---

*Desenvolvido para ConectaPro | Sistema de Orçamento Inteligente 3D* 