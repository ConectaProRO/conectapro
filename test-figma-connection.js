// Teste de Conexão com Figma ConectaPro
const { FigmaIntegration } = require('./figma-integration');

async function testFigmaConnection() {
  console.log('🚀 Testando conexão com Figma ConectaPro...\n');
  
  const figma = new FigmaIntegration(process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE');
  const fileId = '2bbmTKz55tygQsxCpDrK9c';
  
  try {
    // Buscar dados do arquivo
    console.log('📡 Conectando ao Figma...');
    const fileData = await figma.getFile(fileId);
    
    if (fileData && fileData.document) {
      console.log('✅ Conexão bem-sucedida!\n');
      
      // Informações básicas do arquivo
      console.log('📊 INFORMAÇÕES DO PROJETO:');
      console.log(`📝 Nome: ${fileData.name || 'ConectaPro'}`);
      console.log(`📅 Última modificação: ${new Date(fileData.lastModified).toLocaleString('pt-BR')}`);
      console.log(`👤 Versão: ${fileData.version || 'N/A'}\n`);
      
      // Páginas disponíveis
      if (fileData.document.children) {
        console.log('📄 PÁGINAS ENCONTRADAS:');
        fileData.document.children.forEach((page, index) => {
          console.log(`${index + 1}. ${page.name} (${page.children?.length || 0} elementos)`);
        });
        console.log('');
      }
      
      // Extrair cores do design
      console.log('🎨 EXTRAINDO CORES DO DESIGN...');
      const colors = figma.extractColors(fileData);
      if (colors.length > 0) {
        console.log('Cores encontradas:');
        colors.forEach((color, index) => {
          console.log(`  ${index + 1}. ${color}`);
        });
      } else {
        console.log('Nenhuma cor sólida encontrada.');
      }
      console.log('');
      
      // Extrair tipografia
      console.log('📝 EXTRAINDO TIPOGRAFIA...');
      const fonts = figma.extractTypography(fileData);
      if (fonts.length > 0) {
        console.log('Fontes encontradas:');
        fonts.forEach((font, index) => {
          console.log(`  ${index + 1}. ${font.fontFamily} - ${font.fontSize}px (${font.fontWeight})`);
        });
      } else {
        console.log('Nenhuma tipografia encontrada.');
      }
      console.log('');
      
      // Gerar CSS baseado no design
      console.log('🎯 GERANDO CSS PERSONALIZADO...');
      generateCSSFromFigma(colors, fonts);
      
    } else {
      console.log('❌ Erro: Não foi possível acessar o arquivo do Figma');
      console.log('Verifique se o token e o ID do arquivo estão corretos.');
    }
    
  } catch (error) {
    console.log('❌ Erro na conexão:');
    console.log(error.message);
    
    if (error.message.includes('403')) {
      console.log('\n💡 Dica: Verifique se o token tem as permissões corretas.');
    } else if (error.message.includes('404')) {
      console.log('\n💡 Dica: Verifique se o ID do arquivo está correto.');
    }
  }
}

function generateCSSFromFigma(colors, fonts) {
  console.log('/* CSS Gerado automaticamente do Figma ConectaPro */');
  console.log(':root {');
  
  // Variáveis de cores
  if (colors.length > 0) {
    console.log('  /* Cores do Design */');
    colors.forEach((color, index) => {
      const varName = `--figma-color-${index + 1}`;
      console.log(`  ${varName}: ${color};`);
    });
  }
  
  // Variáveis de tipografia
  if (fonts.length > 0) {
    console.log('\n  /* Tipografia do Design */');
    fonts.forEach((font, index) => {
      console.log(`  --figma-font-${index + 1}: "${font.fontFamily}";`);
      console.log(`  --figma-size-${index + 1}: ${font.fontSize}px;`);
      console.log(`  --figma-weight-${index + 1}: ${font.fontWeight};`);
    });
  }
  
  console.log('}\n');
  
  console.log('/* Exemplo de uso nas classes */');
  console.log('.hero-title { color: var(--figma-color-1); }');
  console.log('.primary-button { background: var(--figma-color-2); }');
  console.log('');
}

// Executar teste
testFigmaConnection(); 