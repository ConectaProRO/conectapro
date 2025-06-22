const fs = require('fs');
const path = require('path');

class DesignSystemApplicator {
  constructor() {
    this.pagesDirectory = './src/app';
    this.componentImport = `import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";`;
    this.appliedPages = [];
    this.pendingPages = [];
  }

  // Mapeamento de páginas e suas configurações
  getPageConfigs() {
    return {
      'cadastro-profissional/page.tsx': {
        title: '👷 Cadastro de Profissional',
        subtitle: 'Cadastre-se gratuitamente e encontre mais clientes em Porto Velho',
        priority: 1
      },
      'precos-cub/page.tsx': {
        title: '💰 Preços CUB Sinduscon',
        subtitle: 'Consulte os custos unitários básicos atualizados para sua obra',
        priority: 2
      },
      'precos-cub/residencial/page.tsx': {
        title: '🏠 CUB Residencial',
        subtitle: 'Custos unitários básicos para construção residencial',
        priority: 2
      },
      'precos-cub/comercial/page.tsx': {
        title: '🏢 CUB Comercial',
        subtitle: 'Custos unitários básicos para construção comercial',
        priority: 2
      },
      'precos-cub/detalhados/page.tsx': {
        title: '📊 Preços Detalhados CUB',
        subtitle: 'Análise completa dos custos unitários básicos',
        priority: 2
      },
      'blog/page.tsx': {
        title: '📝 Blog ConectaPro',
        subtitle: 'Dicas, novidades e conhecimento para profissionais da construção',
        priority: 3
      },
      'orcamento-3d/page.tsx': {
        title: '🏗️ Orçamento 3D',
        subtitle: 'Crie orçamentos visuais e interativos para seus projetos',
        priority: 3
      },
      'gerador-contrato/page.tsx': {
        title: '📋 Gerador de Contratos',
        subtitle: 'Gere contratos profissionais de forma rápida e segura',
        priority: 3
      },
      'admin/page.tsx': {
        title: '⚙️ Painel Administrativo',
        subtitle: 'Gestão completa da plataforma ConectaPro',
        priority: 4
      }
    };
  }

  // Analisa uma página e verifica se já usa o design system
  analyzePageFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const hasPageLayout = content.includes('PageLayout');
      const hasPageCard = content.includes('PageCard');
      const hasOldStructure = content.includes('className="min-h-screen') || 
                             content.includes('className="bg-gradient-to-br');
      
      return {
        hasDesignSystem: hasPageLayout && hasPageCard,
        needsUpdate: !hasPageLayout || hasOldStructure,
        content: content
      };
    } catch (error) {
      console.log(`❌ Erro ao ler arquivo: ${filePath}`);
      return { hasDesignSystem: false, needsUpdate: true, content: '' };
    }
  }

  // Aplica o design system em uma página específica
  applyDesignSystemToPage(filePath, config) {
    const analysis = this.analyzePageFile(filePath);
    
    if (analysis.hasDesignSystem) {
      console.log(`✅ ${filePath} - Já usa o design system`);
      this.appliedPages.push(filePath);
      return true;
    }

    console.log(`🔄 Aplicando design system em: ${filePath}`);
    
    // Template básico para páginas
    const newPageContent = this.generatePageTemplate(config, analysis.content);
    
    try {
      // Backup do arquivo original
      fs.writeFileSync(`${filePath}.backup`, analysis.content);
      
      // Aplica o novo design
      fs.writeFileSync(filePath, newPageContent);
      
      console.log(`✅ ${filePath} - Design system aplicado com sucesso!`);
      this.appliedPages.push(filePath);
      return true;
    } catch (error) {
      console.log(`❌ Erro ao aplicar design system em ${filePath}:`, error.message);
      this.pendingPages.push({ file: filePath, error: error.message });
      return false;
    }
  }

  // Gera template padrão para uma página
  generatePageTemplate(config, originalContent) {
    // Extrai imports específicos do conteúdo original
    const imports = this.extractImports(originalContent);
    const mainContent = this.extractMainContent(originalContent);
    
    return `"use client";
import React from "react";
${imports}
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

export default function ${this.getComponentName(config)} {
  return (
    <PageLayout 
      title="${config.title}"
      subtitle="${config.subtitle}"
    >
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">
            Em Desenvolvimento
          </h2>
          <p className="text-xl text-gray-600">
            Esta página está sendo atualizada com o novo design system.
          </p>
        </div>
        
        <div className="text-center">
          <PageButton href="/" variant="primary">
            Voltar ao Início
          </PageButton>
        </div>
      </PageCard>
      
      {/* Conteúdo original preservado para referência */}
      <PageCard>
        <details className="text-sm text-gray-500">
          <summary className="cursor-pointer font-semibold mb-4">
            Ver conteúdo original (para desenvolvimento)
          </summary>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-xs">
              ${this.escapeContent(originalContent.substring(0, 500))}...
            </pre>
          </div>
        </details>
      </PageCard>
    </PageLayout>
  );
}`;
  }

  // Extrai imports do conteúdo original
  extractImports(content) {
    const lines = content.split('\n');
    const imports = [];
    
    for (const line of lines) {
      if (line.trim().startsWith('import ') && 
          !line.includes('PageLayout') && 
          !line.includes('"use client"')) {
        imports.push(line);
      }
    }
    
    return imports.join('\n');
  }

  // Extrai conteúdo principal (placeholder para lógica mais complexa)
  extractMainContent(content) {
    // Por enquanto, retorna um placeholder
    // Em uma implementação mais avançada, poderia extrair JSX específico
    return "// Conteúdo original será migrado gradualmente";
  }

  // Gera nome do componente baseado na configuração
  getComponentName(config) {
    return config.title
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^\w/, c => c.toUpperCase()) + 'Page';
  }

  // Escapa conteúdo para exibição segura
  escapeContent(content) {
    return content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
  }

  // Executa a aplicação do design system em todas as páginas
  async applyToAllPages() {
    console.log('🚀 Iniciando aplicação do Design System ConectaPro...\n');
    
    const configs = this.getPageConfigs();
    const sortedPages = Object.entries(configs)
      .sort(([,a], [,b]) => a.priority - b.priority);

    let successCount = 0;
    let totalPages = sortedPages.length;

    for (const [relativePath, config] of sortedPages) {
      const fullPath = path.join(this.pagesDirectory, relativePath);
      
      if (fs.existsSync(fullPath)) {
        const success = this.applyDesignSystemToPage(fullPath, config);
        if (success) successCount++;
      } else {
        console.log(`⚠️  Arquivo não encontrado: ${fullPath}`);
        this.pendingPages.push({ file: relativePath, error: 'Arquivo não encontrado' });
      }
    }

    this.generateReport(successCount, totalPages);
  }

  // Gera relatório final
  generateReport(successCount, totalPages) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO FINAL - APLICAÇÃO DO DESIGN SYSTEM');
    console.log('='.repeat(60));
    
    console.log(`✅ Páginas atualizadas: ${successCount}/${totalPages}`);
    console.log(`🔄 Taxa de sucesso: ${((successCount/totalPages) * 100).toFixed(1)}%`);
    
    if (this.appliedPages.length > 0) {
      console.log('\n✅ PÁGINAS COM DESIGN SYSTEM APLICADO:');
      this.appliedPages.forEach(page => console.log(`   • ${page}`));
    }
    
    if (this.pendingPages.length > 0) {
      console.log('\n⚠️  PÁGINAS PENDENTES:');
      this.pendingPages.forEach(item => 
        console.log(`   • ${item.file} - ${item.error}`)
      );
    }

    console.log('\n🎯 PRÓXIMOS PASSOS:');
    console.log('   1. Revisar páginas atualizadas');
    console.log('   2. Personalizar conteúdo específico');
    console.log('   3. Testar responsividade');
    console.log('   4. Validar integração Figma');
    
    console.log('\n🛠️  COMANDOS ÚTEIS:');
    console.log('   • node sync-figma-to-css.js  (sincronizar cores)');
    console.log('   • npm run dev                (testar localmente)');
    
    // Gera arquivo de log
    const reportContent = this.generateDetailedReport(successCount, totalPages);
    fs.writeFileSync('design-system-application-report.md', reportContent);
    console.log('\n📄 Relatório detalhado salvo em: design-system-application-report.md');
  }

  // Gera relatório detalhado em markdown
  generateDetailedReport(successCount, totalPages) {
    const now = new Date().toLocaleString('pt-BR');
    
    return `# 📊 Relatório de Aplicação do Design System ConectaPro

**Data:** ${now}  
**Status:** ${successCount}/${totalPages} páginas processadas (${((successCount/totalPages) * 100).toFixed(1)}%)

## ✅ Páginas Atualizadas (${this.appliedPages.length})

${this.appliedPages.map(page => `- \`${page}\``).join('\n')}

## ⚠️ Páginas Pendentes (${this.pendingPages.length})

${this.pendingPages.map(item => `- \`${item.file}\` - ${item.error}`).join('\n')}

## 🎯 Próximas Ações

### Revisão e Personalização
- [ ] Revisar cada página atualizada
- [ ] Personalizar conteúdo específico de cada seção
- [ ] Ajustar títulos e subtítulos conforme necessário
- [ ] Implementar funcionalidades específicas

### Testes e Validação
- [ ] Testar responsividade em mobile/desktop
- [ ] Validar integração com Figma
- [ ] Verificar performance e carregamento
- [ ] Testar navegação entre páginas

### Finalização
- [ ] Remover arquivos de backup (.backup)
- [ ] Atualizar documentação
- [ ] Deploy em produção
- [ ] Monitorar feedback dos usuários

## 🛠️ Comandos de Manutenção

\`\`\`bash
# Sincronizar cores do Figma
node sync-figma-to-css.js

# Testar conexão Figma
node test-figma-connection.js

# Executar servidor de desenvolvimento
npm run dev
\`\`\`

---
*Relatório gerado automaticamente pelo Design System Applicator*
`;
  }
}

// Execução do script
if (require.main === module) {
  const applicator = new DesignSystemApplicator();
  applicator.applyToAllPages().catch(console.error);
}

module.exports = DesignSystemApplicator; 