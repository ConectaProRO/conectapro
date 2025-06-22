#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def demo_cadastro_rodrigo():
    """Demonstração do cadastro do Rodrigo Lopes"""
    
    print("👷‍♂️ Fala meu amigo! Bora te cadastrar no ConectaPro pra você pegar trampo!")
    print("🔥 DEMO - Cadastro do Rodrigo Lopes\n")

    # Dados de exemplo do Rodrigo
    cadastro_rodrigo = {
        "nome": "Rodrigo Lopes",
        "whatsapp": "(69) 99370-5343",
        "profissao": "Pedreiro",
        "bairro": "Centro",
        "experiencia": "15 anos",
        "idade": "35",
        "foto_perfil": "Foto profissional",
        "servicos": "Alvenaria, Reboco, Forma e Concretagem",
        "transporte": "Moto",
        "galeria": "Fotos de casas construídas, muros, calçadas"
    }

    print("📝 DADOS COLETADOS:")
    print("=" * 40)
    
    for campo, valor in cadastro_rodrigo.items():
        print(f"➡️ {campo.replace('_', ' ').title()}: {valor}")
    
    print("\n✅ Fechou, tá tudo certo!")
    print("🎯 Rodrigo Lopes cadastrado com sucesso!")
    print("📱 WhatsApp: (69) 99370-5343")
    print("🏗️ Especialidade: Pedreiro com 15 anos de experiência")
    print("📍 Localização: Centro, Porto Velho - RO")
    
    print("\n🚀 PRÓXIMOS PASSOS:")
    print("1. ⏳ Aguardar aprovação do administrador")
    print("2. 📲 Receber confirmação via WhatsApp")
    print("3. 💼 Ficar disponível para receber trabalhos")
    print("4. 💰 Começar a ganhar dinheiro!")
    
    return cadastro_rodrigo

def mostrar_integracao_sistema():
    """Mostra como o cadastro se integra ao sistema ConectaPro"""
    
    print("\n" + "="*50)
    print("🔗 INTEGRAÇÃO COM SISTEMA CONECTAPRO")
    print("="*50)
    
    print("\n📊 FLUXO COMPLETO:")
    print("1. 📝 Cadastro via Python/WhatsApp/Site")
    print("2. 💾 Dados salvos no Supabase")
    print("3. 👨‍💼 Admin recebe notificação")
    print("4. ✅ Aprovação pelo painel admin")
    print("5. 📲 Notificação automática via WhatsApp")
    print("6. 🌐 Profissional fica visível no site")
    print("7. 💼 Clientes podem encontrar e contratar")
    
    print("\n🛠️ FERRAMENTAS ATIVAS:")
    print("✅ Site: https://conectapro-e0tpg0kxh-conecta-pro.vercel.app")
    print("✅ Bot WhatsApp: Rodando via PM2")
    print("✅ Admin Panel: /admin")
    print("✅ Banco Supabase: Configurado")
    print("✅ Menu Flutuante: WhatsApp integrado")

if __name__ == "__main__":
    print("🏗️ CONECTAPRO - DEMO CADASTRO RODRIGO LOPES")
    print("="*60)
    
    cadastro = demo_cadastro_rodrigo()
    mostrar_integracao_sistema()
    
    print("\n" + "="*60)
    print("💪 Sistema ConectaPro funcionando 100%!")
    print("🎯 Pronto para conectar profissionais com oportunidades!") 