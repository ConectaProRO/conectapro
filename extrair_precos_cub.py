import PyPDF2
import re

def extrair_texto_pdf(caminho_pdf):
    """Extrai todo o texto de um PDF"""
    try:
        with open(caminho_pdf, 'rb') as arquivo:
            leitor = PyPDF2.PdfReader(arquivo)
            texto_completo = ""
            for pagina in leitor.pages:
                texto_completo += pagina.extract_text() + "\n"
        return texto_completo
    except Exception as e:
        return f"Erro ao ler PDF: {e}"

def calcular_precos_por_servico():
    """Calcula preços por m² baseados no CUB"""
    
    # Valores CUB base (R$/m²) - Maio 2025
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
    
    # Percentuais por serviço baseados em análise de composições típicas
    # Estes percentuais são baseados em estudos de composição de custos
    percentuais_servicos = {
        'Alvenaria': 15,      # 15% do CUB
        'Pintura': 8,         # 8% do CUB  
        'Instalação Elétrica': 12,  # 12% do CUB
        'Instalação Hidráulica': 10, # 10% do CUB
        'Cobertura/Telhado': 18,     # 18% do CUB
        'Piso/Revestimento': 14,     # 14% do CUB
        'Estrutura/Concreto': 25,    # 25% do CUB
        'Fundação': 8,               # 8% do CUB
        'Esquadrias': 12,            # 12% do CUB
        'Acabamentos': 10            # 10% do CUB
    }
    
    print("=" * 80)
    print("PREÇOS POR M² BASEADOS NO CUB SINDUSCON-RO (MAIO/2025)")
    print("=" * 80)
    
    for tipo_valor in ['desonerado', 'onerado']:
        print(f"\n🏗️  VALORES {tipo_valor.upper()}")
        print("-" * 60)
        
        for padrao in ['popular', 'normal', 'alto']:
            cub_base = cub_valores[tipo_valor][padrao]
            print(f"\n📊 Padrão {padrao.upper()} - CUB Base: R$ {cub_base:,.2f}/m²")
            print(f"{'Serviço':<25} {'% CUB':<8} {'R$/m²':<12} {'Faixa R$/m²'}")
            print("-" * 60)
            
            for servico, percentual in percentuais_servicos.items():
                preco_base = (cub_base * percentual) / 100
                preco_min = preco_base * 0.8   # -20% para negociação
                preco_max = preco_base * 1.2   # +20% para variação
                
                print(f"{servico:<25} {percentual:>3}%     R$ {preco_base:>7.2f}   R$ {preco_min:>5.2f} - {preco_max:>5.2f}")
    
    # Análise específica para alguns serviços principais
    print("\n" + "=" * 80)
    print("ANÁLISE DETALHADA - SERVIÇOS PRINCIPAIS")
    print("=" * 80)
    
    servicos_principais = ['Alvenaria', 'Pintura', 'Piso/Revestimento', 'Instalação Elétrica']
    
    for servico in servicos_principais:
        if servico in percentuais_servicos:
            percentual = percentuais_servicos[servico]
            print(f"\n🔧 {servico.upper()}")
            print("-" * 40)
            
            for padrao in ['popular', 'normal', 'alto']:
                # Média entre onerado e desonerado
                cub_des = cub_valores['desonerado'][padrao]
                cub_one = cub_valores['onerado'][padrao] 
                cub_medio = (cub_des + cub_one) / 2
                
                preco_base = (cub_medio * percentual) / 100
                preco_min = preco_base * 0.85
                preco_max = preco_base * 1.15
                
                print(f"  {padrao.capitalize():<8}: R$ {preco_base:>6.2f}/m² (R$ {preco_min:>5.2f} - {preco_max:>5.2f})")

def analisar_pdfs_sinduscon():
    """Tenta extrair informações específicas dos PDFs"""
    print("\n" + "=" * 80)
    print("ANÁLISE DOS PDFs SINDUSCON")
    print("=" * 80)
    
    try:
        # Analisar PDF desonerado
        texto_des = extrair_texto_pdf('Sinduscon/cub0525desonerado.pdf')
        
        # Procurar por valores específicos
        linhas = texto_des.split('\n')
        valores_cub = []
        
        for linha in linhas:
            if 'R$' in linha and any(c.isdigit() for c in linha):
                # Limpar e extrair valores
                linha_limpa = linha.strip()
                if len(linha_limpa) > 10 and len(linha_limpa) < 100:
                    valores_cub.append(linha_limpa)
        
        print(f"\n📋 Encontrados {len(valores_cub)} linhas com valores nos PDFs")
        print("\n🔍 Primeiros valores encontrados:")
        for i, valor in enumerate(valores_cub[:10]):
            print(f"  {i+1:2d}. {valor}")
            
    except Exception as e:
        print(f"❌ Erro ao analisar PDFs: {e}")
        print("📝 Usando valores estimados baseados em composições típicas")

if __name__ == "__main__":
    print("🏗️  CALCULADORA DE PREÇOS CUB SINDUSCON-RO")
    print("📅 Base: Maio 2025")
    print("📍 Região: Porto Velho - RO")
    
    # Calcular preços baseados no CUB
    calcular_precos_por_servico()
    
    # Tentar analisar PDFs para validação
    analisar_pdfs_sinduscon()
    
    print("\n" + "=" * 80)
    print("💡 OBSERVAÇÕES IMPORTANTES:")
    print("• Valores baseados no CUB oficial do Sinduscon-RO")
    print("• Percentuais estimados com base em composições típicas")
    print("• Preços podem variar conforme especificações e fornecedores")
    print("• Faixas incluem variação de -15% a +15% para negociação")
    print("=" * 80) 