// Conversor Avançado: Figma Design → React Components
const { FigmaIntegration } = require('./figma-integration');
const fs = require('fs');

class FigmaToReactConverter {
  constructor(token, fileId) {
    this.figma = new FigmaIntegration(token);
    this.fileId = fileId;
  }

  async convertFigmaToReact() {
    console.log('⚛️ Convertendo designs do Figma para React...\n');
    
    const fileData = await this.figma.getFile(this.fileId);
    if (!fileData) return;

    // Analisar páginas do Figma
    const pages = fileData.document.children;
    
    for (const page of pages) {
      console.log(`📄 Processando página: ${page.name}`);
      
      if (page.name === 'Homepage') {
        await this.generateHomepageComponent(page);
      } else if (page.name === 'Buscar Profissionais') {
        await this.generateSearchComponent(page);
      } else if (page.name === 'Design System') {
        await this.generateDesignTokens(page);
      }
    }
  }

  async generateHomepageComponent(page) {
    console.log('🏠 Gerando componente Homepage...');
    
    const sections = this.analyzeSections(page);
    const component = this.buildReactComponent('Homepage', sections);
    
    fs.writeFileSync('src/components/FigmaHomepage.tsx', component);
    console.log('✅ Homepage React gerada!');
  }

  analyzeSections(page) {
    const sections = [];
    
    page.children?.forEach(node => {
      if (node.type === 'FRAME') {
        sections.push({
          name: node.name,
          type: this.identifySectionType(node.name),
          styles: this.extractStyles(node),
          content: this.extractContent(node)
        });
      }
    });
    
    return sections;
  }

  identifySectionType(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('hero')) return 'hero';
    if (lowerName.includes('feature')) return 'features';
    if (lowerName.includes('card')) return 'card';
    if (lowerName.includes('button')) return 'button';
    return 'section';
  }

  extractStyles(node) {
    const styles = {};
    
    // Background
    if (node.fills && node.fills[0]) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID') {
        const { r, g, b } = fill.color;
        styles.backgroundColor = `rgb(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)})`;
      } else if (fill.type === 'GRADIENT_LINEAR') {
        styles.background = this.parseGradient(fill);
      }
    }
    
    // Dimensões
    styles.width = node.absoluteBoundingBox?.width;
    styles.height = node.absoluteBoundingBox?.height;
    
    // Border Radius
    if (node.cornerRadius) {
      styles.borderRadius = `${node.cornerRadius}px`;
    }
    
    return styles;
  }

  parseGradient(fill) {
    const stops = fill.gradientStops.map(stop => {
      const { r, g, b } = stop.color;
      return `rgb(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}) ${Math.round(stop.position*100)}%`;
    });
    
    return `linear-gradient(135deg, ${stops.join(', ')})`;
  }

  extractContent(node) {
    const content = {
      texts: [],
      images: [],
      buttons: []
    };
    
    function traverse(n) {
      if (n.type === 'TEXT') {
        content.texts.push({
          text: n.characters || 'Sample Text',
          style: n.style
        });
      } else if (n.type === 'RECTANGLE' && n.fills?.[0]?.type === 'IMAGE') {
        content.images.push({
          src: 'placeholder.jpg',
          alt: n.name
        });
      }
      
      if (n.children) {
        n.children.forEach(traverse);
      }
    }
    
    traverse(node);
    return content;
  }

  buildReactComponent(name, sections) {
    const imports = `import React from 'react';
import Link from 'next/link';

`;

    const component = `export default function Figma${name}() {
  return (
    <div className="figma-${name.toLowerCase()}">
${sections.map(section => this.generateSectionJSX(section)).join('\n')}
    </div>
  );
}`;

    const styles = this.generateComponentStyles(sections);
    
    return imports + component + '\n\n' + styles;
  }

  generateSectionJSX(section) {
    switch (section.type) {
      case 'hero':
        return this.generateHeroSection(section);
      case 'features':
        return this.generateFeaturesSection(section);
      case 'button':
        return this.generateButton(section);
      default:
        return this.generateGenericSection(section);
    }
  }

  generateHeroSection(section) {
    const texts = section.content.texts;
    const title = texts.find(t => t.style?.fontSize > 30)?.text || 'Hero Title';
    const subtitle = texts.find(t => t.style?.fontSize <= 30)?.text || 'Hero subtitle';
    
    return `      {/* Hero Section - Generated from Figma */}
      <section className="figma-hero" style={${JSON.stringify(section.styles)}}>
        <div className="container">
          <h1 className="hero-title">${title}</h1>
          <p className="hero-subtitle">${subtitle}</p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>`;
  }

  generateFeaturesSection(section) {
    return `      {/* Features Section - Generated from Figma */}
      <section className="figma-features" style={${JSON.stringify(section.styles)}}>
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            {/* Feature cards would go here */}
          </div>
        </div>
      </section>`;
  }

  generateGenericSection(section) {
    return `      {/* ${section.name} - Generated from Figma */}
      <section className="figma-section" style={${JSON.stringify(section.styles)}}>
        <div className="container">
          {/* Content for ${section.name} */}
        </div>
      </section>`;
  }

  generateComponentStyles(sections) {
    return `
/* Styles Generated from Figma */
.figma-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--figma-color-1);
  color: white;
}

.btn-secondary {
  background: transparent;
  color: var(--figma-color-1);
  border: 2px solid var(--figma-color-1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`;
  }

  // Método para gerar componentes específicos
  async generateAdvancedComponents() {
    console.log('🧩 Gerando componentes avançados...');
    
    // Button Component
    this.generateButtonComponent();
    
    // Card Component  
    this.generateCardComponent();
    
    // Input Component
    this.generateInputComponent();
    
    console.log('✅ Componentes avançados gerados!');
  }

  generateButtonComponent() {
    const buttonComponent = `import React from 'react';

interface FigmaButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export const FigmaButton: React.FC<FigmaButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}) => {
  const baseClasses = 'figma-btn transition-all duration-300 font-semibold rounded-xl';
  const variantClasses = {
    primary: 'bg-figma-primary text-white hover:scale-105',
    secondary: 'bg-figma-secondary text-figma-primary',
    outline: 'border-2 border-figma-primary text-figma-primary hover:bg-figma-primary hover:text-white'
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: variant === 'primary' ? 'var(--figma-color-1)' : undefined,
        borderColor: variant === 'outline' ? 'var(--figma-color-1)' : undefined,
        color: variant === 'outline' ? 'var(--figma-color-1)' : undefined
      }}
    >
      {children}
    </button>
  );
};

export default FigmaButton;`;

    fs.writeFileSync('src/components/FigmaButton.tsx', buttonComponent);
  }

  generateCardComponent() {
    const cardComponent = `import React from 'react';

interface FigmaCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const FigmaCard: React.FC<FigmaCardProps> = ({
  children,
  className = '',
  hover = true
}) => {
  return (
    <div 
      className={\`figma-card \${hover ? 'hover:shadow-2xl hover:-translate-y-2' : ''} \${className}\`}
      style={{
        background: 'var(--figma-color-4)',
        borderColor: 'var(--figma-color-2)',
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)'
      }}
    >
      {children}
    </div>
  );
};

export default FigmaCard;`;

    fs.writeFileSync('src/components/FigmaCard.tsx', cardComponent);
  }

  generateInputComponent() {
    const inputComponent = `import React from 'react';

interface FigmaInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const FigmaInput: React.FC<FigmaInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label
}) => {
  return (
    <div className="figma-input-wrapper">
      {label && (
        <label className="figma-label" style={{ color: 'var(--figma-color-3)' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="figma-input"
        style={{
          borderColor: 'var(--figma-color-2)',
          background: 'var(--figma-color-4)',
          color: 'var(--figma-color-3)'
        }}
      />
    </div>
  );
};

export default FigmaInput;`;

    fs.writeFileSync('src/components/FigmaInput.tsx', inputComponent);
  }
}

// Executar conversão
const converter = new FigmaToReactConverter(
  process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE',
  '2bbmTKz55tygQsxCpDrK9c'
);

async function runConversion() {
  await converter.convertFigmaToReact();
  await converter.generateAdvancedComponents();
}

runConversion(); 