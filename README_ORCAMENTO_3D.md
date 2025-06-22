# 🚀 Sistema de Orçamento Inteligente 3D - ConectaPro

## 💡 Conceito Revolucionário

Combine **Python + IA + Cursor** para criar orçamentos automáticos a partir de modelos 3D e plantas baixas, superando soluções como PowerBI com tecnologia de ponta.

## 🎯 O que Este Sistema Faz

### **Entrada:**
- 📐 Modelos 3D (Sketchfab, arquivos .obj, .fbx)
- 🗺️ Plantas baixas (PNG, JPG, PDF)
- 📋 Informações básicas do projeto

### **Processamento Inteligente:**
- 🤖 **IA identifica elementos**: Alvenaria, pisos, coberturas, etc.
- 📊 **Cálculos SINAPI automáticos**: Preços oficiais aplicados
- 📈 **Análise CUB**: Baseado no Sinduscon-RO
- 🔍 **Fatores de complexidade**: Ajustes automáticos

### **Saída:**
- 📄 **Relatório HTML profissional** com gráficos
- 💰 **Planilha detalhada** com códigos SINAPI
- 📊 **Análise por categorias** e elementos
- 🎯 **Próximos passos** integrados ao ConectaPro

## 🛠️ Instalação Rápida

### 1. **Instalar Dependências**
```bash
# Método 1: Script automático
python instalar_dependencias.py

# Método 2: Manual
pip install -r requirements.txt
```

### 2. **Testar Sistema Python**
```bash
python orcamento_3d_ai.py
```

### 3. **Usar Interface Web**
```bash
npm run dev
# Acesse: http://localhost:3000/orcamento-3d
```

## 🏗️ Arquitetura do Sistema

### **Backend Python (`orcamento_3d_ai.py`)**
```python
📦 Sistema Principal
├── 🔍 AnalisadorModelo3D
│   ├── analisar_modelo_sketchfab()
│   └── analisar_imagem_planta()
├── 💰 GeradorOrcamentoSINAPI  
│   ├── _carregar_dados_sinapi()
│   └── calcular_item_elemento()
└── 🚀 SistemaOrcamento3D
    ├── processar_projeto_completo()
    └── gerar_relatorio_completo()
```

### **Frontend Next.js (`/orcamento-3d`)**
```typescript
🌐 Interface Web
├── 📤 Upload de arquivos
├── 🤖 Processamento com IA
├── 📊 Visualização de resultados
└── 📄 Download de relatórios
```

## 📊 Dados e Preços

### **Base de Dados SINAPI Integrada**
- ✅ Alvenaria: `73915/001` - R$ 87,45/m²
- ✅ Pisos: `87254` - R$ 65,80/m²  
- ✅ Cobertura: `74139/001` - R$ 45,80/m²
- ✅ Fundação: `AF_01/2024` - R$ 180,21/m²
- ✅ Vigas: `AF_09/2020` - R$ 174,74/m²

### **CUB Sinduscon-RO (Mai/2025)**
- 🏠 **Popular**: R$ 1.567,80/m² (desonerado)
- 🏠 **Normal**: R$ 1.847,25/m² (desonerado)  
- 🏠 **Alto**: R$ 2.234,60/m² (desonerado)

## 🤖 Tecnologias de IA Utilizadas

### **Análise de Modelos 3D**
- 📐 **OpenCV**: Processamento de imagens
- 🧠 **Computer Vision**: Detecção de elementos
- 📊 **NumPy/Pandas**: Análise de dados
- 🎯 **Pattern Recognition**: Identificação automática

### **Processamento de Plantas**
- 🔍 **OCR**: Extração de textos e medidas
- 📏 **Dimensionamento**: Cálculo automático de áreas
- 🏗️ **Element Detection**: Identificação de ambientes
- 📋 **Auto-classification**: Categorização inteligente

## 📈 Exemplo de Uso Real

### **Input:**
```
🏠 Projeto: Casa Residencial 120m²
📐 Modelo 3D: https://sketchfab.com/3d-models/casa-exemplo
```

### **Processamento IA:**
```
🔍 Analisando modelo 3D...
✅ Detectados 3 elementos construtivos:
   • Alvenaria: 120.5 m² (cerâmico, interno, simples)
   • Piso: 85.0 m² (cerâmica, interno, simples)  
   • Cobertura: 95.0 m² (telha cerâmica, externo, média)
```

### **Output:**
```
📊 RESUMO DO ORÇAMENTO:
• Área Total: 300.50 m²
• Total Geral: R$ 20.481,72
• Custo por m²: R$ 68,16
• Elementos: 3 | Itens: 3
```

## 🎯 Vantagens vs PowerBI

| Aspecto | PowerBI | Sistema ConectaPro |
|---------|---------|-------------------|
| **Análise 3D** | ❌ Manual | ✅ **IA Automática** |
| **Dados SINAPI** | ❌ Importação | ✅ **Integrado** |
| **Preços CUB** | ❌ Manual | ✅ **Automático** |
| **Relatórios** | 📊 Básicos | 🎨 **HTML Profissional** |
| **Integração** | ❌ Isolado | ✅ **Sistema Completo** |
| **Custo** | 💰 Pago | 🆓 **Gratuito** |
| **Customização** | ⚠️ Limitada | 🚀 **Total** |

## 🔮 Próximas Funcionalidades

### **IA Avançada**
- 🎯 **Reconhecimento de materiais** por foto
- 📐 **Medição automática** via laser/câmera
- 🏗️ **Detecção de patologias** estruturais
- 💡 **Sugestões de otimização** de custos

### **Integração 3D**
- 🌐 **API Sketchfab** nativa
- 📱 **Upload via celular** com AR
- 🎮 **Viewer 3D** integrado
- 🔄 **Sincronização** tempo real

### **Relatórios Avançados**
- 📈 **Gráficos interativos** (Chart.js)
- 📊 **Dashboards** personalizados
- 📱 **Versão mobile** responsiva
- 🎨 **Temas** customizáveis

## 🚀 Deploy e Produção

### **Preparação:**
```bash
# 1. Instalar dependências
python instalar_dependencias.py

# 2. Testar localmente
python orcamento_3d_ai.py

# 3. Build Next.js
npm run build

# 4. Deploy
npm run start
```

### **Estrutura de Arquivos:**
```
ConectaPro/
├── 🐍 orcamento_3d_ai.py          # Sistema principal Python
├── 📦 requirements.txt            # Dependências Python  
├── 🔧 instalar_dependencias.py    # Script de instalação
├── 🌐 src/app/orcamento-3d/       # Interface web
├── 📊 Sinduscon/                  # PDFs CUB oficiais
└── 📁 projetos/                   # Orçamentos gerados
```

## 💼 Casos de Uso

### **Para Profissionais:**
- 🏗️ **Orçamentos rápidos** para clientes
- 📊 **Análise de viabilidade** de projetos
- 💰 **Precificação precisa** baseada em SINAPI
- 🎯 **Diferencial competitivo** no mercado

### **Para Clientes:**
- 💡 **Orçamento preliminar** antes de contratar
- 🔍 **Comparação** entre profissionais
- 📋 **Planejamento financeiro** detalhado
- ✅ **Validação** de propostas recebidas

### **Para Construtoras:**
- 🏢 **Orçamentos em escala** para múltiplos projetos
- 📈 **Análise de margem** automática
- 🎯 **Padronização** de processos
- 📊 **Relatórios gerenciais** completos

## 📞 Suporte e Contato

- 🌐 **Site**: [conectapro.app](https://conectapro.app)
- 📧 **E-mail**: conectaproro@gmail.com  
- 📱 **WhatsApp**: (69) 99256-1830
- 📍 **Local**: Porto Velho - RO

## 🏆 Conclusão

Este sistema representa um **salto tecnológico** na área de orçamentos de construção, combinando:

- 🤖 **Inteligência Artificial** para análise automática
- 📊 **Dados oficiais** SINAPI + CUB atualizados
- 🎨 **Interface moderna** e intuitiva
- 🔗 **Integração completa** com marketplace de profissionais
- 💰 **Economia** e **agilidade** para todos os usuários

**Resultado**: Orçamentos que antes levavam horas, agora são gerados em **minutos** com **precisão profissional**.

---

*Desenvolvido com ❤️ pela equipe ConectaPro para revolucionar a construção civil em Porto Velho - RO* 