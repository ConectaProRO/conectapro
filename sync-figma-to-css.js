// Script para sincronizar cores do Figma com o CSS do ConectaPro
const fs = require('fs');
const path = require('path');
const { FigmaIntegration } = require('./figma-integration');

async function syncFigmaToCSS() {
  console.log('🎨 Sincronizando cores do Figma com CSS...\n');
  
  const figma = new FigmaIntegration(process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE');
  const fileId = '2bbmTKz55tygQsxCpDrK9c';
  
  try {
    // Buscar dados do Figma
    const fileData = await figma.getFile(fileId);
    if (!fileData) {
      console.log('❌ Erro ao conectar com Figma');
      return;
    }
    
    // Extrair cores
    const colors = figma.extractColors(fileData);
    console.log(`🎯 ${colors.length} cores extraídas do Figma`);
    
    // Ler arquivo CSS atual
    const cssPath = path.join(__dirname, 'src/app/globals.css');
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Criar seção de variáveis do Figma
    const figmaSection = generateFigmaVariables(colors);
    
    // Procurar onde inserir ou atualizar
    const figmaCommentStart = '/* === CORES DO FIGMA - AUTO GERADAS === */';
    const figmaCommentEnd = '/* === FIM CORES DO FIGMA === */';
    
    if (cssContent.includes(figmaCommentStart)) {
      // Substituir seção existente
      const regex = new RegExp(`${figmaCommentStart}[\\s\\S]*?${figmaCommentEnd}`, 'g');
      cssContent = cssContent.replace(regex, `${figmaCommentStart}\n${figmaSection}\n${figmaCommentEnd}`);
    } else {
      // Adicionar no final das variáveis root
      const rootEnd = cssContent.indexOf('}');
      const beforeRoot = cssContent.substring(0, rootEnd);
      const afterRoot = cssContent.substring(rootEnd);
      
      cssContent = beforeRoot + 
                   `\n  ${figmaCommentStart}\n${figmaSection}\n  ${figmaCommentEnd}\n` + 
                   afterRoot;
    }
    
    // Salvar arquivo CSS atualizado
    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ CSS atualizado com cores do Figma!');
    
    // Mostrar resultado
    console.log('\n🎨 Variáveis CSS criadas:');
    colors.forEach((color, index) => {
      console.log(`  --figma-color-${index + 1}: ${color};`);
    });
    
    console.log('\n💡 Use essas variáveis no seu CSS:');
    console.log('  .meu-elemento { background: var(--figma-color-1); }');
    console.log('  .outro-elemento { color: var(--figma-color-2); }');
    
  } catch (error) {
    console.log('❌ Erro na sincronização:', error.message);
  }
}

function generateFigmaVariables(colors) {
  let variables = '  /* Cores extraídas automaticamente do Figma */\n';
  
  colors.forEach((color, index) => {
    const varName = `--figma-color-${index + 1}`;
    variables += `  ${varName}: ${color};\n`;
  });
  
  return variables;
}

// Executar sincronização
syncFigmaToCSS(); 