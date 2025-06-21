# 🏗️ ConectaPro - Porto Velho
> Conectando profissionais da construção civil com oportunidades em Rondônia

## 🚀 Sobre o Projeto

ConectaPro é uma plataforma web gratuita que conecta profissionais da construção civil (pedreiros, pintores, eletricistas, encanadores) com clientes em Porto Velho - RO.

### ✨ Diferenciais
- **100% Gratuito** - Sem taxas ou comissões
- **Contato Direto** - Via WhatsApp, sem intermediários  
- **Calculadoras SINAPI** - Orçamentos técnicos precisos
- **Avaliações Reais** - Sistema de feedback dos clientes
- **Foco Local** - Especializado em Porto Velho-RO

## 🔧 Tecnologias

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Icons**: React Icons
- **Maps**: Leaflet + React Leaflet
- **PWA**: Service Worker, Manifest, Offline-first
- **PDF**: jsPDF para geração de contratos
- **Deploy**: Vercel
- **Analytics**: Vercel Analytics

## 📊 Funcionalidades

- [x] Cadastro de profissionais com portfólio
- [x] Sistema de upload de fotos (perfil + galeria)
- [x] Busca por especialidade e localização
- [x] Sistema de avaliações e notas (1-5 estrelas)
- [x] Calculadoras de orçamento baseadas em SINAPI
- [x] Painel administrativo completo
- [x] Blog educativo sobre construção civil
- [x] Gerador de contratos em PDF
- [x] PWA - Funciona offline
- [x] Interface responsiva (mobile-first)
- [ ] Sistema de pagamentos
- [ ] App mobile nativo
- [ ] Notificações push
- [ ] Chat integrado

## 🏗️ Serviços Disponíveis

### Profissionais Cadastrados:
- **Forma e Concretagem** - Estruturas de concreto
- **Contra-Piso** - Nivelamento de pisos
- **Cerâmica e Porcelanato** - Revestimentos
- **Alvenaria** - Construção de paredes
- **Reboco** - Acabamentos em argamassa
- **Instalações Hidrosanitárias** - Água e esgoto
- **Instalações Elétricas** - Fiação e pontos elétricos
- **Forro de Gesso** - Acabamentos de teto

### Calculadoras Disponíveis:
- **Concreto** - Cálculo de materiais para estruturas
- **Piso** - Área e materiais para pisos
- **Parede** - Área e materiais para alvenaria
- **Pintura** - Tinta e materiais para pintura
- **Instalações** - Materiais elétricos e hidráulicos
- **Forro de Gesso** - Materiais e mão de obra

## 🌟 Como Usar

### Para Profissionais
1. Acesse `/cadastro-profissional`
2. Preencha seus dados pessoais e especialidades
3. Adicione foto de perfil e galeria de trabalhos
4. Descreva sua experiência e métodos de trabalho
5. Aguarde aprovação no painel administrativo
6. Receba contatos diretos via WhatsApp

### Para Clientes
1. Acesse `/buscar-profissional` 
2. Escolha o tipo de serviço desejado
3. Veja profissionais disponíveis na sua região
4. Analise avaliações e portfólio
5. Entre em contato direto via WhatsApp
6. Deixe sua avaliação após o serviço

### Ferramentas Auxiliares
- **Calculadora de Orçamento**: Estime custos baseados em SINAPI
- **Gerador de Contratos**: Crie contratos profissionais em PDF
- **Blog**: Dicas e informações sobre construção civil

## 🛠️ Instalação e Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/usuario/conectapro.git

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Comandos Disponíveis
```bash
npm run dev        # Servidor de desenvolvimento com Turbopack
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # Verificação de código
```

## 📱 PWA (Progressive Web App)

O ConectaPro é uma PWA completa:
- **Instalável** - Pode ser instalado como aplicativo
- **Offline** - Funciona sem conexão (páginas visitadas)
- **Rápido** - Cache inteligente e otimizações
- **Nativo** - Experiência similar a app nativo

## 🗂️ Estrutura do Projeto

```
ConectaPro/
├── src/app/                     # Pages e componentes Next.js
│   ├── admin/                   # Painel administrativo
│   ├── api/                     # API Routes (backend)
│   ├── blog/                    # Artigos e conteúdo
│   ├── buscar-profissional/     # Busca de profissionais
│   ├── cadastro-profissional/   # Cadastro de profissionais
│   ├── calculadoras/            # Calculadoras SINAPI
│   ├── components/              # Componentes reutilizáveis
│   └── gerador-contrato/        # Geração de contratos PDF
├── data/                        # Arquivos de dados (JSON)
├── public/                      # Assets estáticos
├── Sinduscon/                   # Documentos técnicos (CUB, etc.)
└── package.json
```

## 📊 Dados e Armazenamento

- **Arquivos JSON locais** - Cadastros e avaliações
- **Sistema de backup automático** - Múltiplas cópias de segurança
- **Cache em memória** - Performance otimizada
- **Validação de dados** - TypeScript + validações customizadas

## 🔐 Painel Administrativo

Acesso em `/admin` com funcionalidades:
- **Aprovar/Rejeitar** profissionais
- **Gerenciar avaliações** - Aprovar, rejeitar, responder
- **Controlar visibilidade** - Tornar visível/invisível
- **Estatísticas em tempo real**
- **Backup e restauração de dados**
- **Exclusão de registros**

## 📈 Analytics e Monitoramento

- **Vercel Analytics** - Métricas de performance e uso
- **Logs detalhados** - Sistema de debug avançado
- **Monitoramento de erros** - Tratamento de exceções
- **Estatísticas de cadastros** - Painel com métricas

## 🌐 Integração com Terceiros

- **WhatsApp Business** - Contato direto profissional-cliente
- **Leaflet Maps** - Visualização geográfica
- **SINAPI** - Base de dados oficial para orçamentos
- **Vercel** - Deploy e hosting automático

## 📞 Contato

- **WhatsApp**: (69) 99256-1830
- **Email**: conectaproro@gmail.com
- **Região**: Porto Velho - RO
- **Site**: [conectapro.app](https://conectapro.app)

## 🤝 Contribuindo

Interessado em melhorar a plataforma? 

### Como Contribuir:
1. **Fork** o repositório
2. **Clone** sua fork localmente
3. **Crie** uma branch para sua feature
4. **Faça** suas modificações
5. **Teste** localmente
6. **Commit** com mensagens claras
7. **Push** para sua fork
8. **Abra** um Pull Request

### Tipos de Contribuição:
- 🐛 **Bug fixes** - Correção de problemas
- ✨ **Features** - Novas funcionalidades
- 📝 **Documentação** - Melhorias na documentação
- 🎨 **UI/UX** - Melhorias na interface
- ⚡ **Performance** - Otimizações de código

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🏆 Status do Projeto

- **Versão**: 0.1.0
- **Status**: ✅ Ativo e em desenvolvimento
- **Última atualização**: Janeiro 2025
- **Próximas features**: Chat integrado, sistema de pagamentos

---

⭐ **Gostou do projeto?** Dê uma estrela para apoiar o desenvolvimento!

💼 **É profissional da construção em Porto Velho?** [Cadastre-se já!](https://conectapro.app/cadastro-profissional)

🔍 **Precisa de um profissional?** [Encontre aqui!](https://conectapro.app/buscar-profissional)
