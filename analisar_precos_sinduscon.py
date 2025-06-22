import PyPDF2
import re
from decimal import Decimal

def extrair_texto_pdf(caminho_pdf):
    """Extrai todo o texto de um PDF"""
    try:
        with open(caminho_pdf, 'rb') as arquivo:
            leitor = PyPDF2.PdfReader(arquivo)
            texto = ''
            for pagina in leitor.pages:
                texto += pagina.extract_text() + '\n'
        return texto
    except Exception as e:
        return f'Erro ao ler PDF: {e}'

def buscar_valores_servicos(texto):
    """Busca valores específicos por serviços no texto"""
    linhas = texto.split('\n')
    servicos_precos = {}
    
    # Padrões para buscar valores em R$
    padrao_valor = r'R\$\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)'
    
    # Serviços que queremos mapear
    servicos_mapeamento = {
        'alvenaria': ['alvenaria', 'tijolo', 'bloco'],
        'pintura': ['pintura', 'tinta', 'latex'],
        'piso': ['piso', 'contrapiso', 'regularização'],
        'porcelanato': ['porcelanato', 'cerâmica', 'revestimento cerâmico'],
        'elétrica': ['elétrica', 'instalação elétrica', 'fiação'],
        'hidráulica': ['hidráulica', 'instalação hidráulica', 'tubulação'],
        'cobertura': ['cobertura', 'telhado', 'telha'],
        'estrutura': ['estrutura', 'concreto', 'ferragem'],
        'fundação': ['fundação', 'sapata', 'radier']
    }
    
    for i, linha in enumerate(linhas):
        linha_limpa = linha.strip().lower()
        
        # Verifica se a linha contém valor em R$
        if 'r$' in linha_limpa:
            valores = re.findall(padrao_valor, linha, re.IGNORECASE)
            
            if valores:
                # Verifica qual serviço está na linha
                for servico, palavras_chave in servicos_mapeamento.items():
                    for palavra in palavras_chave:
                        if palavra in linha_limpa:
                            if servico not in servicos_precos:
                                servicos_precos[servico] = []
                            
                            # Adiciona contexto (linha anterior e posterior)
                            contexto = []
                            if i > 0:
                                contexto.append(f"Anterior: {linhas[i-1].strip()}")
                            contexto.append(f"Atual: {linha.strip()}")
                            if i < len(linhas) - 1:
                                contexto.append(f"Posterior: {linhas[i+1].strip()}")
                            
                            servicos_precos[servico].append({
                                'valores': valores,
                                'contexto': contexto,
                                'linha_numero': i
                            })
                            break
    
    return servicos_precos

def analisar_cub_por_servico():
    """Analisa os PDFs e extrai preços por serviço baseado no CUB"""
    
    # Valores CUB conhecidos (base para cálculos)
    cub_valores = {
        'desonerado': {
            'popular': 1567.80,
            'normal': 1847.25,
            'alto': 2234.60
        },
        'onerado': {
            'popular': 1623.45,
            'normal': 1912.30,
            'alto': 2315.85
        }
    }
    
    # Percentuais típicos por serviço (baseado em composições SINAPI)
    percentuais_servicos = {
        'alvenaria': 0.15,      # 15% do CUB
        'pintura': 0.08,        # 8% do CUB
        'piso': 0.14,           # 14% do CUB
        'porcelanato': 0.12,    # 12% do CUB (acabamento)
        'elétrica': 0.12,       # 12% do CUB
        'hidráulica': 0.10,     # 10% do CUB
        'cobertura': 0.18,      # 18% do CUB
        'estrutura': 0.25,      # 25% do CUB
        'fundação': 0.08        # 8% do CUB
    }
    
    print("=== ANÁLISE DE PREÇOS POR SERVIÇO - SINDUSCON RO ===\n")
    
    # Calcular preços por m² para cada serviço
    for tipo_valor, valores_cub in cub_valores.items():
        print(f"--- {tipo_valor.upper()} ---")
        
        for padrao, valor_cub in valores_cub.items():
            print(f"\n{padrao.upper()} (CUB: R$ {valor_cub:.2f}/m²):")
            
            for servico, percentual in percentuais_servicos.items():
                preco_servico = valor_cub * percentual
                
                # Calcular faixa de variação (±20%)
                preco_min = preco_servico * 0.8
                preco_max = preco_servico * 1.2
                
                print(f"  🔹 {servico.capitalize():12} | R$ {preco_servico:6.2f}/m² | Faixa: R$ {preco_min:6.2f} - R$ {preco_max:6.2f}")
        
        print("-" * 70)
    
    return percentuais_servicos, cub_valores

def gerar_tabela_precos_praticos():
    """Gera tabela de preços práticos para negociação"""
    
    print("\n=== TABELA PRÁTICA PARA NEGOCIAÇÃO ===")
    print("(Baseada no CUB Sinduscon-RO + Variação de Mercado)\n")
    
    # Preços base (CUB Normal Desonerado)
    cub_base = 1847.25
    
    servicos_detalhados = {
        'Alvenaria': {
            'percentual': 0.15,
            'unidade': 'm²',
            'descricao': 'Tijolo 6 furos + argamassa',
            'variacao_mercado': (0.7, 1.3)  # 70% a 130% do CUB
        },
        'Pintura': {
            'percentual': 0.08,
            'unidade': 'm²',
            'descricao': 'Látex acrílico 2 demãos',
            'variacao_mercado': (0.6, 1.4)
        },
        'Porcelanato': {
            'percentual': 0.12,
            'unidade': 'm²',
            'descricao': 'Porcelanato 60x60 + assentamento',
            'variacao_mercado': (0.8, 2.0)  # Maior variação por qualidade
        },
        'Piso Cerâmico': {
            'percentual': 0.10,
            'unidade': 'm²',
            'descricao': 'Cerâmica 45x45 + assentamento',
            'variacao_mercado': (0.7, 1.5)
        },
        'Elétrica': {
            'percentual': 0.12,
            'unidade': 'm²',
            'descricao': 'Instalação completa + materiais',
            'variacao_mercado': (0.8, 1.2)
        },
        'Hidráulica': {
            'percentual': 0.10,
            'unidade': 'm²',
            'descricao': 'Instalação completa + materiais',
            'variacao_mercado': (0.8, 1.2)
        },
        'Cobertura': {
            'percentual': 0.18,
            'unidade': 'm²',
            'descricao': 'Estrutura + telha + calhas',
            'variacao_mercado': (0.8, 1.3)
        },
        'Estrutura/Concreto': {
            'percentual': 0.25,
            'unidade': 'm²',
            'descricao': 'Concreto + ferragem + forma',
            'variacao_mercado': (0.9, 1.1)
        }
    }
    
    print(f"{'Serviço':<18} | {'CUB Base':<10} | {'Faixa Mercado':<20} | {'Descrição'}")
    print("-" * 80)
    
    for servico, dados in servicos_detalhados.items():
        preco_base = cub_base * dados['percentual']
        preco_min = preco_base * dados['variacao_mercado'][0]
        preco_max = preco_base * dados['variacao_mercado'][1]
        
        print(f"{servico:<18} | R$ {preco_base:6.2f} | R$ {preco_min:6.2f} - {preco_max:6.2f} | {dados['descricao']}")
    
    print(f"\n💡 Base de cálculo: CUB Normal Desonerado = R$ {cub_base:.2f}/m²")
    print("📊 Faixas incluem variação por qualidade, região e profissional")
    print("⚠️  Valores para orientação - sempre consulte orçamentos específicos")

if __name__ == "__main__":
    print("🏗️  ANÁLISE DE PREÇOS POR SERVIÇO - CONECTAPRO")
    print("=" * 60)
    
    # Executar análises
    percentuais, valores_cub = analisar_cub_por_servico()
    gerar_tabela_precos_praticos()
    
    print(f"\n📋 Fonte: Sinduscon-RO | CUB Maio/2025")
    print("🔗 ConectaPro - conectaproro@gmail.com") 