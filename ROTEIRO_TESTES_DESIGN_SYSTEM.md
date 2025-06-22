# 🧪 Roteiro de Testes: Design System ConectaPro

## 🎯 Objetivo dos Testes
Validar se o design system foi aplicado corretamente em todas as páginas e se a integração com Figma está funcionando.

## 🌐 Servidor de Testes
**URL Base:** http://localhost:3005

---

## 📋 CHECKLIST DE TESTES

### ✅ **Teste 1: Páginas Principais (100% Implementadas)**

#### **1.1 Homepage** 
🔗 **URL:** http://localhost:3005/
- [ ] Badge verde "🎨 Cores do Figma Ativadas" aparece no canto superior direito
- [ ] Header hero com gradiente azul
- [ ] Cards com bordas arredondadas e sombras
- [ ] Botões com cores do Figma (azul/laranja)
- [ ] Layout responsivo (testar mobile/desktop)
- [ ] Animações suaves de hover nos elementos

#### **1.2 Sobre**
🔗 **URL:** http://localhost:3005/sobre
- [ ] PageLayout aplicado corretamente
- [ ] Título "🏗️ Sobre o ConectaPro" no header hero
- [ ] Cards modernos com ícones
- [ ] Gradiente de cores do Figma
- [ ] Navegação funcionando

#### **1.3 Buscar Profissional**
🔗 **URL:** http://localhost:3005/buscar-profissional
- [ ] Design system aplicado
- [ ] Funcionalidade de busca mantida
- [ ] Cards de profissionais com novo estilo
- [ ] Mapa funcionando corretamente

#### **1.4 Calculadoras**
🔗 **URL:** http://localhost:3005/calculadoras
- [ ] Grid moderno de calculadoras
- [ ] Cards com hover effects
- [ ] Ícones e badges funcionando
- [ ] Links para calculadoras específicas

#### **1.5 Blog** 🆕
🔗 **URL:** http://localhost:3005/blog
- [ ] Design completamente novo implementado
- [ ] Filtros de categoria funcionando
- [ ] Grid responsivo de posts
- [ ] Cards com hover effects
- [ ] Newsletter signup
- [ ] Call-to-action final

---

### 🔄 **Teste 2: Páginas com Template (Script Aplicado)**

#### **2.1 Cadastro Profissional**
🔗 **URL:** http://localhost:3005/cadastro-profissional
- [ ] Funcionalidade original mantida (formulário, upload, etc.)
- [ ] Layout original preservado
- [ ] Todos os recursos funcionando normalmente

#### **2.2 Preços CUB Principal**
🔗 **URL:** http://localhost:3005/precos-cub
- [ ] PageLayout aplicado
- [ ] Título "💰 Preços CUB Sinduscon"
- [ ] Template básico ou conteúdo personalizado
- [ ] Badge Figma presente

#### **2.3 CUB Residencial**
🔗 **URL:** http://localhost:3005/precos-cub/residencial
- [ ] Template aplicado
- [ ] Título correto
- [ ] Navegação funcionando

#### **2.4 CUB Comercial**
🔗 **URL:** http://localhost:3005/precos-cub/comercial
- [ ] Template aplicado
- [ ] Design consistente

#### **2.5 CUB Detalhados**
🔗 **URL:** http://localhost:3005/precos-cub/detalhados
- [ ] Template aplicado
- [ ] Layout responsivo

#### **2.6 Orçamento 3D**
🔗 **URL:** http://localhost:3005/orcamento-3d
- [ ] PageLayout aplicado
- [ ] Título "🏗️ Orçamento 3D"
- [ ] Template básico funcionando

#### **2.7 Gerador de Contratos**
🔗 **URL:** http://localhost:3005/gerador-contrato
- [ ] Template aplicado
- [ ] Design consistente

#### **2.8 Admin**
🔗 **URL:** http://localhost:3005/admin
- [ ] Template aplicado
- [ ] Título "⚙️ Painel Administrativo"

---

## 🎨 **Teste 3: Integração Figma**

### **3.1 Sincronização de Cores**
```bash
# Execute este comando e teste
node sync-figma-to-css.js
```
- [ ] Comando executa sem erros
- [ ] Cores atualizadas no CSS
- [ ] Badge verde continua aparecendo

### **3.2 Cores Ativas**
Verificar se estas cores estão sendo usadas:
- [ ] `#1e40af` - Azul principal (headers, botões primários)
- [ ] `#f97316` - Laranja energia (CTAs, destaques)  
- [ ] `#374151` - Cinza profissional (textos)
- [ ] `#f8fafc` - Branco limpo (backgrounds)
- [ ] `#3b82f6` - Azul secundário (links, botões secundários)

### **3.3 Teste de Conexão**
```bash
# Teste a conexão com Figma
node test-figma-connection.js
```
- [ ] Conexão bem-sucedida
- [ ] Dados extraídos corretamente

---

## 📱 **Teste 4: Responsividade**

### **4.1 Mobile (375px)**
Testar em cada página principal:
- [ ] Layout se adapta corretamente
- [ ] Textos legíveis
- [ ] Botões clicáveis
- [ ] Cards empilham verticalmente
- [ ] Menu mobile funcionando

### **4.2 Tablet (768px)**
- [ ] Grid de 2 colunas onde apropriado
- [ ] Espaçamentos adequados
- [ ] Navegação funcionando

### **4.3 Desktop (1200px+)**
- [ ] Layout completo
- [ ] Máximo de largura respeitado
- [ ] Todos os elementos visíveis

---

## ⚡ **Teste 5: Performance**

### **5.1 Carregamento**
- [ ] Páginas carregam em menos de 3 segundos
- [ ] Imagens otimizadas
- [ ] CSS não está duplicado

### **5.2 Animações**
- [ ] Hover effects suaves
- [ ] Transições não travadas
- [ ] Animações não excessivas

---

## 🔧 **Teste 6: Navegação**

### **6.1 Menu Principal**
- [ ] Todos os links funcionando
- [ ] Logo clicável (volta para home)
- [ ] Menu mobile responsivo

### **6.2 Links Internos**
- [ ] Navegação entre páginas fluida
- [ ] Breadcrumbs onde necessário
- [ ] Botões "Voltar" funcionando

### **6.3 Call-to-Actions**
- [ ] Botões levam para páginas corretas
- [ ] Links externos abrem em nova aba
- [ ] CTAs visualmente destacados

---

## 🚨 **Teste 7: Problemas Comuns**

### **7.1 Erros de Console**
Abrir DevTools (F12) e verificar:
- [ ] Sem erros JavaScript
- [ ] Sem erros de CSS
- [ ] Imagens carregando corretamente

### **7.2 Layout Quebrado**
- [ ] Elementos não sobrepostos
- [ ] Textos não cortados
- [ ] Cards alinhados corretamente

### **7.3 Funcionalidades**
- [ ] Formulários funcionando
- [ ] Uploads de imagem (se aplicável)
- [ ] Filtros e buscas

---

## 📊 **Relatório de Testes**

### **Template de Resultado:**
```
✅ PÁGINA TESTADA: [Nome da página]
🔗 URL: http://localhost:3005/[caminho]
📅 Data: [Data do teste]
👤 Testador: [Seu nome]

RESULTADOS:
✅ Design System: OK/Problema
✅ Figma Integration: OK/Problema  
✅ Responsividade: OK/Problema
✅ Performance: OK/Problema
✅ Navegação: OK/Problema

OBSERVAÇÕES:
- [Problemas encontrados]
- [Sugestões de melhoria]
```

---

## 🎯 **Comandos de Teste Rápido**

### **Teste Completo (5 minutos):**
```bash
# 1. Sincronizar Figma
node sync-figma-to-css.js

# 2. Testar conexão
node test-figma-connection.js

# 3. Verificar servidor
echo "Teste em: http://localhost:3005"

# 4. Abrir páginas principais:
# - http://localhost:3005/ (Home)
# - http://localhost:3005/blog (Blog novo)
# - http://localhost:3005/sobre (Sobre)
# - http://localhost:3005/calculadoras (Calculadoras)
```

### **Teste de Desenvolvimento:**
```bash
# Verificar se há erros
npm run build

# Reiniciar servidor se necessário
npm run dev
```

---

## 🏆 **Critérios de Sucesso**

### **✅ Teste APROVADO se:**
- 90%+ das páginas carregam corretamente
- Badge Figma aparece em todas as páginas
- Navegação funciona sem erros
- Layout responsivo em mobile/desktop
- Cores do Figma aplicadas corretamente

### **⚠️ Necessita CORREÇÃO se:**
- Páginas com erros de carregamento
- Layout quebrado em mobile
- Cores inconsistentes
- Navegação com problemas

---

**🧪 Roteiro de Testes ConectaPro Design System v2.0**  
*Validação completa da implementação* 