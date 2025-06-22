import os
from datetime import datetime
from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://yugcnpbadwmnqmixlsdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def validar_telefone_brasil(telefone):
    """Valida se o telefone está no formato brasileiro"""
    import re
    # Remove caracteres especiais
    telefone_limpo = re.sub(r'[^\d]', '', telefone)
    
    # Verifica se tem 10 ou 11 dígitos (com DDD)
    if len(telefone_limpo) not in [10, 11]:
        return False
    
    # Lista de DDDs válidos de Rondônia e principais do Brasil
    ddds_validos = ['69', '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99']
    
    ddd = telefone_limpo[:2]
    return ddd in ddds_validos

def cadastrar_profissional():
    print("👷‍♂️ Fala meu amigo! Bora te cadastrar no ConectaPro pra você pegar trampo!")
    print("🔥 Seus dados vão direto pro sistema e você já fica disponível para trabalhar!\n")

    # Coleta de dados
    nome = input("➡️ Como você gosta de ser chamado? (Pode ser nome ou apelido): ").strip()
    
    while True:
        whatsapp = input("➡️ Me fala seu número de WhatsApp com DDD. Ex.: (69) 9XXXX-XXXX: ").strip()
        if validar_telefone_brasil(whatsapp):
            break
        print("❌ Número inválido! Use o formato com DDD, exemplo: (69) 99999-9999")

    profissao = input("➡️ Qual é seu serviço? (Pedreiro, Pintor, Eletricista, Ajudante, outro...): ").strip()

    bairro = input("➡️ Qual é o bairro onde você mora?: ").strip()

    experiencia = input("➡️ Há quantos anos você trabalha nesse serviço?: ").strip()

    idade = input("➡️ Quantos anos você tem?: ").strip()

    foto_perfil = input("➡️ Quer colocar uma foto sua? (S/N): ").strip()
    if foto_perfil.lower() == "s":
        foto_perfil_link = input("📸 Me manda o link da sua foto ou descreve qual foto você quer usar: ").strip()
    else:
        foto_perfil_link = "Sem foto"

    print("\n➡️ Agora me fala quais desses serviços você faz. Digite separados por vírgula se for mais de um:")
    print("- Forma e Concretagem")
    print("- Contra-Piso") 
    print("- Cerâmica e Porcelanato")
    print("- Alvenaria")
    print("- Reboco")
    print("- Instalações Hidrosanitárias")
    print("- Instalações Elétricas")
    print("- Forro de Gesso")

    servicos = input("➡️ Digite aqui seus serviços: ").strip()

    transporte = input("➡️ Como você vai pro serviço? (A pé, bicicleta, moto, carro ou ônibus): ").strip()

    galeria = input("➡️ Quer colocar fotos dos seus trabalhos? (S/N): ").strip()
    if galeria.lower() == "s":
        galeria_fotos = input("📸 Me manda os links ou nomes das fotos, separados por vírgula: ").strip()
    else:
        galeria_fotos = "Sem fotos"

    # Monta descrição completa
    descricao = f"Profissional com {experiencia} anos de experiência em {profissao}. "
    descricao += f"Atende na região de {bairro}. "
    descricao += f"Serviços: {servicos}. "
    descricao += f"Transporte: {transporte}."

    # Dados para inserir no Supabase
    dados_cadastro = {
        "nome": nome,
        "whatsapp": whatsapp,
        "profissao": profissao,
        "bairro": bairro,
        "experiencia": f"{experiencia} anos",
        "idade": idade,
        "servicos": servicos,
        "descricao": descricao,
        "foto_perfil": foto_perfil_link if foto_perfil_link != "Sem foto" else None,
        "galeria_fotos": galeria_fotos if galeria_fotos != "Sem fotos" else None,
        "meio_transporte": transporte,
        "origem_cadastro": "Terminal Python",
        "data_cadastro": datetime.now().isoformat(),
        "aprovado": False,
        "visivel": False
    }

    print("\n📝 Dados do Cadastro:")
    for chave, valor in dados_cadastro.items():
        if valor:
            print(f"{chave.replace('_', ' ').title()}: {valor}")

    # Confirma antes de salvar
    confirmar = input("\n✅ Confirma o cadastro? (S/N): ").strip().lower()
    
    if confirmar == 's':
        try:
            # Insere no Supabase
            result = supabase.table("profissionais_pendentes").insert(dados_cadastro).execute()
            
            print("\n🎉 SUCESSO! Seu cadastro foi enviado!")
            print("📋 Agora é só aguardar a aprovação do administrador.")
            print("📱 Você receberá uma mensagem no WhatsApp quando for aprovado!")
            print("🚀 Em breve você estará disponível no ConectaPro para receber trabalhos!")
            
            return dados_cadastro
            
        except Exception as e:
            print(f"\n❌ Erro ao salvar cadastro: {str(e)}")
            print("💾 Seus dados foram salvos localmente como backup.")
            
            # Salva backup local
            with open(f"backup_cadastro_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt", "w", encoding="utf-8") as f:
                f.write("CADASTRO PROFISSIONAL - CONECTAPRO\n")
                f.write("=" * 40 + "\n\n")
                for chave, valor in dados_cadastro.items():
                    f.write(f"{chave.replace('_', ' ').title()}: {valor}\n")
            
            return dados_cadastro
    else:
        print("\n❌ Cadastro cancelado.")
        return None

def main():
    print("🏗️ CONECTAPRO - CADASTRO DE PROFISSIONAIS")
    print("=" * 50)
    print("Sistema de cadastro para profissionais da construção civil")
    print("Conectando trabalhadores com oportunidades em Rondônia\n")
    
    cadastrar_profissional()
    
    print("\n" + "=" * 50)
    print("Obrigado por usar o ConectaPro! 💪")

if __name__ == "__main__":
    main() 