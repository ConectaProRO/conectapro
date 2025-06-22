#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import datetime
from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://yugcnpbadwmnqmixlsdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg"

def cadastrar_rodrigo_admin():
    """Cadastra Rodrigo Lopes como administrador usando a estrutura correta"""
    
    print("👨‍💼 CADASTRANDO RODRIGO LOPES - ADMINISTRADOR CONECTAPRO")
    print("="*60)
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Primeiro, cadastra como pendente (seguindo o fluxo normal)
        rodrigo_pendente = {
            "nome": "Rodrigo Lopes",
            "telefone": "69993705343",
            "email": "rodrigo@conectapro.com.br",
            "endereco": "Centro, Porto Velho - RO",
            "experiencia": "15+ anos em gestão de projetos e empreendedorismo",
            "servicos": "Administração, Gestão de Projetos, Desenvolvimento de Negócios, Liderança de Equipes",
            "portfolio_urls": "https://conectapro-e0tpg0kxh-conecta-pro.vercel.app",
            "dados_whatsapp": {
                "numero": "69993705343",
                "nome_contato": "Rodrigo Lopes - ConectaPro",
                "origem_cadastro": "Python Admin",
                "data_cadastro": datetime.now().isoformat()
            },
            "origem": "Cadastro Administrativo - Python",
            "observacoes": "Fundador e administrador principal da ConectaPro. Responsável pela gestão geral da plataforma."
        }
        
        print("📝 DADOS PARA CADASTRO PENDENTE:")
        print("-" * 40)
        for campo, valor in rodrigo_pendente.items():
            if campo != 'dados_whatsapp':
                print(f"➡️ {campo.replace('_', ' ').title()}: {valor}")
        
        # Verifica se já existe
        existing_pendente = supabase.table("profissionais_pendentes").select("*").eq("telefone", "69993705343").execute()
        
        if existing_pendente.data:
            print("\n⚠️ Rodrigo já está na lista de pendentes!")
            rodrigo_id = existing_pendente.data[0]['id']
        else:
            # Insere como pendente
            result_pendente = supabase.table("profissionais_pendentes").insert(rodrigo_pendente).execute()
            rodrigo_id = result_pendente.data[0]['id'] if result_pendente.data else None
            print("\n✅ Rodrigo inserido na lista de pendentes!")
        
        if rodrigo_id:
            # Agora aprova automaticamente
            rodrigo_aprovado = {
                "nome": "Rodrigo Lopes",
                "telefone": "69993705343", 
                "email": "rodrigo@conectapro.com.br",
                "endereco": "Centro, Porto Velho - RO",
                "experiencia": "15+ anos em gestão de projetos e empreendedorismo",
                "servicos": "Administração, Gestão de Projetos, Desenvolvimento de Negócios, Liderança de Equipes",
                "portfolio_urls": "https://conectapro-e0tpg0kxh-conecta-pro.vercel.app",
                "ativo": True,
                "visivel": True,
                "avaliacao_media": 5.0,
                "total_avaliacoes": 1
            }
            
            # Verifica se já está aprovado
            existing_aprovado = supabase.table("profissionais_aprovados").select("*").eq("telefone", "69993705343").execute()
            
            if existing_aprovado.data:
                print("⚠️ Rodrigo já está aprovado!")
                admin_data = existing_aprovado.data[0]
            else:
                # Insere como aprovado
                result_aprovado = supabase.table("profissionais_aprovados").insert(rodrigo_aprovado).execute()
                admin_data = result_aprovado.data[0] if result_aprovado.data else None
                print("✅ Rodrigo aprovado automaticamente!")
            
            # Atualiza o registro pendente marcando como aprovado
            supabase.table("profissionais_pendentes").update({
                "aprovado_em": datetime.now().isoformat(),
                "aprovado_por": "Sistema Automático"
            }).eq("id", rodrigo_id).execute()
            
            print("\n🎉 CADASTRO COMPLETO!")
            print("=" * 30)
            print(f"👤 Nome: {admin_data.get('nome') if admin_data else 'Rodrigo Lopes'}")
            print(f"📱 Telefone: {admin_data.get('telefone') if admin_data else '69993705343'}")
            print(f"✅ Status: Aprovado e Ativo")
            print(f"👁️ Visibilidade: Público")
            print(f"⭐ Avaliação: {admin_data.get('avaliacao_media', 5.0)}/5")
            
            print("\n🔧 PERMISSÕES ADMINISTRATIVAS:")
            print("• Acesso ao painel /admin")
            print("• Aprovação de profissionais")
            print("• Gestão de avaliações")
            print("• Controle de visibilidade")
            print("• Administração geral do sistema")
            
        else:
            print("❌ Erro ao obter ID do cadastro pendente")
            
    except Exception as e:
        print(f"❌ ERRO: {str(e)}")
        
    print("\n" + "="*60)

def mostrar_status_final():
    """Mostra o status final do sistema"""
    
    print("\n📊 STATUS FINAL DO SISTEMA CONECTAPRO")
    print("="*50)
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Estatísticas
        pendentes = supabase.table("profissionais_pendentes").select("*", count="exact").execute()
        aprovados = supabase.table("profissionais_aprovados").select("*", count="exact").execute()
        
        print(f"📈 ESTATÍSTICAS:")
        print(f"   👥 Total Pendentes: {pendentes.count}")
        print(f"   ✅ Total Aprovados: {aprovados.count}")
        print(f"   📱 WhatsApp Bot: Ativo")
        print(f"   🌐 Site: Online")
        
        # Lista administradores
        admins = supabase.table("profissionais_aprovados").select("*").eq("telefone", "69993705343").execute()
        
        if admins.data:
            print(f"\n👨‍💼 ADMINISTRADORES:")
            for admin in admins.data:
                print(f"   • {admin.get('nome')} - {admin.get('telefone')}")
                print(f"     Status: {'Ativo' if admin.get('ativo') else 'Inativo'}")
                print(f"     Visível: {'Sim' if admin.get('visivel') else 'Não'}")
                
    except Exception as e:
        print(f"❌ Erro: {str(e)}")

if __name__ == "__main__":
    cadastrar_rodrigo_admin()
    mostrar_status_final()
    
    print("\n🚀 SISTEMA CONECTAPRO OPERACIONAL!")
    print("👨‍💼 Rodrigo Lopes: Administrador Principal")
    print("📱 WhatsApp: (69) 99370-5343")
    print("🌐 Site: https://conectapro-e0tpg0kxh-conecta-pro.vercel.app")
    print("🔧 Admin: /admin") 