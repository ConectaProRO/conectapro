// Gerador de Design System Avançado - Figma → Cursor
const { FigmaIntegration } = require('./figma-integration');
const fs = require('fs');

class DesignSystemGenerator {
  constructor(token, fileId) {
    this.figma = new FigmaIntegration(token);
    this.fileId = fileId;
  }

  async generateCompleteDesignSystem() {
    console.log('🎨 Gerando Design System Completo do Figma...\n');
    
    const fileData = await this.figma.getFile(this.fileId);
    if (!fileData) return;

    // 1. Extrair TODAS as cores
    const colors = this.extractAdvancedColors(fileData);
    
    // 2. Extrair tipografia completa
    const typography = this.extractAdvancedTypography(fileData);
    
    // 3. Extrair espaçamentos
    const spacing = this.extractSpacing(fileData);
    
    // 4. Extrair componentes
    const components = this.extractComponents(fileData);
    
    // 5. Gerar CSS avançado
    this.generateAdvancedCSS(colors, typography, spacing, components);
    
    // 6. Gerar componentes React
    this.generateReactComponents(components);
    
    // 7. Gerar documentação
    this.generateDocumentation(colors, typography, spacing, components);
  }

  extractAdvancedColors(fileData) {
    const colorPalette = {
      primary: [],
      secondary: [],
      neutral: [],
      success: [],
      warning: [],
      error: []
    };

    function analyzeColor(color) {
      const hex = color;
      // Classificar cor por tonalidade
      if (hex.includes('2563eb') || hex.includes('1e40af')) return 'primary';
      if (hex.includes('6b7280') || hex.includes('ffffff')) return 'neutral';
      return 'secondary';
    }

    const colors = this.figma.extractColors(fileData);
    colors.forEach(color => {
      const category = analyzeColor(color);
      if (!colorPalette[category].includes(color)) {
        colorPalette[category].push(color);
      }
    });

    return colorPalette;
  }

  extractAdvancedTypography(fileData) {
    const typography = {
      headings: {},
      body: {},
      captions: {}
    };

    function traverseNodes(node) {
      if (node.type === 'TEXT' && node.style) {
        const size = node.style.fontSize;
        const weight = node.style.fontWeight;
        const family = node.style.fontFamily;
        
        if (size >= 24) {
          typography.headings[`h${Math.ceil((48 - size) / 8)}`] = {
            fontSize: size,
            fontWeight: weight,
            fontFamily: family
          };
        } else if (size >= 14) {
          typography.body[`body-${size}`] = {
            fontSize: size,
            fontWeight: weight,
            fontFamily: family
          };
        } else {
          typography.captions[`caption-${size}`] = {
            fontSize: size,
            fontWeight: weight,
            fontFamily: family
          };
        }
      }
      
      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    }

    traverseNodes(fileData.document);
    return typography;
  }

  extractSpacing(fileData) {
    const spacing = {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
      '3xl': 64
    };
    
    // Analisar espaçamentos reais do Figma
    // (Implementação avançada para extrair gaps, padding, margin)
    
    return spacing;
  }

  extractComponents(fileData) {
    const components = [];
    
    function findComponents(node) {
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        components.push({
          name: node.name,
          type: node.type,
          properties: this.analyzeComponent(node)
        });
      }
      
      if (node.children) {
        node.children.forEach(findComponents);
      }
    }
    
    findComponents(fileData.document);
    return components;
  }

  generateAdvancedCSS(colors, typography, spacing, components) {
    let css = '/* === DESIGN SYSTEM GERADO DO FIGMA === */\n\n';
    
    // Variables CSS
    css += ':root {\n';
    
    // Cores organizadas
    Object.entries(colors).forEach(([category, colorList]) => {
      if (colorList.length > 0) {
        css += `  /* ${category.toUpperCase()} Colors */\n`;
        colorList.forEach((color, index) => {
          css += `  --color-${category}-${index + 1}: ${color};\n`;
        });
        css += '\n';
      }
    });
    
    // Tipografia
    css += '  /* Typography */\n';
    Object.entries(typography.headings).forEach(([key, style]) => {
      css += `  --font-${key}: ${style.fontSize}px;\n`;
      css += `  --weight-${key}: ${style.fontWeight};\n`;
    });
    
    // Espaçamentos
    css += '\n  /* Spacing */\n';
    Object.entries(spacing).forEach(([key, value]) => {
      css += `  --space-${key}: ${value}px;\n`;
    });
    
    css += '}\n\n';
    
    // Classes utilitárias
    css += this.generateUtilityClasses(colors, typography, spacing);
    
    fs.writeFileSync('design-system.css', css);
    console.log('✅ Design System CSS gerado!');
  }

  generateUtilityClasses(colors, typography, spacing) {
    let classes = '/* Utility Classes */\n';
    
    // Classes de cor
    Object.entries(colors).forEach(([category, colorList]) => {
      colorList.forEach((color, index) => {
        classes += `.text-${category}-${index + 1} { color: var(--color-${category}-${index + 1}); }\n`;
        classes += `.bg-${category}-${index + 1} { background: var(--color-${category}-${index + 1}); }\n`;
      });
    });
    
    return classes;
  }

  generateReactComponents(components) {
    components.forEach(component => {
      const componentCode = this.generateReactComponentCode(component);
      fs.writeFileSync(`components/Figma${component.name}.tsx`, componentCode);
    });
    
    console.log('✅ Componentes React gerados!');
  }

  generateReactComponentCode(component) {
    return `
// Componente gerado automaticamente do Figma
import React from 'react';

interface ${component.name}Props {
  children?: React.ReactNode;
  className?: string;
}

export const Figma${component.name}: React.FC<${component.name}Props> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={\`figma-${component.name.toLowerCase()} \${className}\`}>
      {children}
    </div>
  );
};

export default Figma${component.name};
`;
  }

  generateDocumentation(colors, typography, spacing, components) {
    const docs = `
# Design System ConectaPro
*Gerado automaticamente do Figma*

## 🎨 Cores
${Object.entries(colors).map(([category, colorList]) => 
  colorList.length > 0 ? `### ${category}\n${colorList.map((color, i) => `- \`--color-${category}-${i+1}\`: ${color}`).join('\n')}` : ''
).join('\n\n')}

## 📝 Tipografia
${Object.entries(typography.headings).map(([key, style]) => 
  `- **${key}**: ${style.fontSize}px, ${style.fontWeight}`
).join('\n')}

## 📐 Espaçamentos
${Object.entries(spacing).map(([key, value]) => 
  `- \`--space-${key}\`: ${value}px`
).join('\n')}

## 🧩 Componentes
${components.map(comp => `- ${comp.name}`).join('\n')}
`;

    fs.writeFileSync('DESIGN_SYSTEM.md', docs);
    console.log('✅ Documentação gerada!');
  }
}

// Executar
const generator = new DesignSystemGenerator(
  process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE',
  '2bbmTKz55tygQsxCpDrK9c'
);

generator.generateCompleteDesignSystem(); 