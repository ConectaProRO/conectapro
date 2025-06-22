// Figma API Integration for ConectaPro
// Use this script to fetch design data from Figma

const fetch = require('node-fetch');
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE'; // Token do Figma
const FIGMA_FILE_ID = '2bbmTKz55tygQsxCpDrK9c'; // ID do arquivo ConectaPro

class FigmaIntegration {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  async getFile(fileId) {
    try {
      const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
        headers: {
          'X-Figma-Token': this.token
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar arquivo do Figma:', error);
      return null;
    }
  }

  async getFileNodes(fileId, nodeIds) {
    try {
      const response = await fetch(`${this.baseUrl}/files/${fileId}/nodes?ids=${nodeIds.join(',')}`, {
        headers: {
          'X-Figma-Token': this.token
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar nós do Figma:', error);
      return null;
    }
  }

  async exportImages(fileId, nodeIds, format = 'png', scale = 2) {
    try {
      const response = await fetch(`${this.baseUrl}/images/${fileId}?ids=${nodeIds.join(',')}&format=${format}&scale=${scale}`, {
        headers: {
          'X-Figma-Token': this.token
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao exportar imagens do Figma:', error);
      return null;
    }
  }

  // Extrair cores do design
  extractColors(figmaData) {
    const colors = new Set();
    
    function traverseNodes(node) {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b } = fill.color;
            const hex = '#' + [r, g, b].map(x => 
              Math.round(x * 255).toString(16).padStart(2, '0')
            ).join('');
            colors.add(hex);
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    }
    
    traverseNodes(figmaData.document);
    return Array.from(colors);
  }

  // Extrair tipografia
  extractTypography(figmaData) {
    const fonts = new Set();
    
    function traverseNodes(node) {
      if (node.type === 'TEXT' && node.style) {
        fonts.add({
          fontFamily: node.style.fontFamily,
          fontSize: node.style.fontSize,
          fontWeight: node.style.fontWeight
        });
      }
      
      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    }
    
    traverseNodes(figmaData.document);
    return Array.from(fonts);
  }
}

// Exemplo de uso
async function integrateFigmaDesign() {
  const figma = new FigmaIntegration(FIGMA_TOKEN);
  
  // Buscar arquivo do Figma
  const fileData = await figma.getFile(FIGMA_FILE_ID);
  
  if (fileData) {
    console.log('✅ Conectado ao Figma!');
    
    // Extrair cores
    const colors = figma.extractColors(fileData);
    console.log('🎨 Cores encontradas:', colors);
    
    // Extrair tipografia
    const fonts = figma.extractTypography(fileData);
    console.log('📝 Fontes encontradas:', fonts);
    
    return { colors, fonts, fileData };
  }
}

module.exports = { FigmaIntegration, integrateFigmaDesign }; 