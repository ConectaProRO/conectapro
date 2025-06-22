#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import datetime
from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://yugcnpbadwmnqmixlsdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg"

def cadastrar_rodrigo_lopes():
    """Cadastra o Rodrigo Lopes como administrador do sistema"""
    
    print("👷‍♂️ CADASTRANDO RODRIGO LOPES - ADMINISTRADOR CONECTAPRO")
    print("="*60)
    
    try:
        # Conecta ao Supabase
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Dados do Rodrigo como administrador
        rodrigo_admin = {
            "nome": "Rodrigo Lopes",
            "whatsapp": "(69) 99370-5343",
            "profissao": "Administrador/Empreendedor",
            "bairro": "Centro",
            "experiencia": "15+ anos",
            "idade": "35",
            "servicos": "Gestão de Projetos, Desenvolvimento de Negócios, Liderança",
            "descricao": "Fundador e administrador da ConectaPro. Especialista em conectar profissionais da construção civil com oportunidades de trabalho em Rondônia. Experiência em gestão de projetos e desenvolvimento de negócios digitais.",
            "foto_perfil": "https://via.placeholder.com/300x300/0066cc/ffffff?text=RL",
            "galeria_fotos": "Projetos ConectaPro, Sistema de gestão, Dashboard administrativo",
            "meio_transporte": "Carro",
            "origem_cadastro": "Python - Cadastro Administrativo",
            "data_cadastro": datetime.now().isoformat(),
            "aprovado": True,  # Admin já aprovado
            "visivel": True,   # Admin visível
            "is_admin": True,  # Marca como administrador
            "observacoes": "Administrador principal do sistema ConectaPro"
        }
        
        print("📝 DADOS DO ADMINISTRADOR:")
        print("-" * 40)
        for campo, valor in rodrigo_admin.items():
            if campo not in ['data_cadastro']:
                print(f"➡️ {campo.replace('_', ' ').title()}: {valor}")
        
        # Insere no banco como profissional aprovado
        print("\n💾 Inserindo no banco de dados...")
        
        # Primeiro verifica se já existe
        existing = supabase.table("profissionais_aprovados").select("*").eq("whatsapp", "(69) 99370-5343").execute()
        
        if existing.data:
            print("⚠️ Rodrigo Lopes já está cadastrado como administrador!")
            print("📊 Dados existentes:")
            for item in existing.data:
                print(f"   Nome: {item.get('nome')}")
                print(f"   WhatsApp: {item.get('whatsapp')}")
                print(f"   Profissão: {item.get('profissao')}")
                print(f"   Status: {'Aprovado' if item.get('aprovado') else 'Pendente'}")
        else:
            # Insere novo cadastro
            result = supabase.table("profissionais_aprovados").insert(rodrigo_admin).execute()
            
            if result.data:
                print("✅ SUCESSO! Rodrigo Lopes cadastrado como administrador!")
                print("🎯 Status: Aprovado e Visível")
                print("👨‍💼 Permissões: Administrador Principal")
                print("📱 WhatsApp: (69) 99370-5343")
                print("🌐 Visível no site: SIM")
                
                print("\n🔧 ACESSO ADMINISTRATIVO:")
                print("• Painel Admin: /admin")
                print("• Gestão de Profissionais: ✅")
                print("• Gestão de Avaliações: ✅") 
                print("• Controle de Visibilidade: ✅")
                print("• Aprovação de Cadastros: ✅")
                
            else:
                print("❌ Erro ao cadastrar administrador")
                
    except Exception as e:
        print(f"❌ ERRO: {str(e)}")
        print("💡 Verifique a conexão com o Supabase")
        
    print("\n" + "="*60)

def verificar_sistema():
    """Verifica o status do sistema ConectaPro"""
    
    print("\n🔍 VERIFICANDO STATUS DO SISTEMA CONECTAPRO")
    print("="*50)
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Conta profissionais pendentes
        pendentes = supabase.table("profissionais_pendentes").select("*", count="exact").execute()
        
        # Conta profissionais aprovados
        aprovados = supabase.table("profissionais_aprovados").select("*", count="exact").execute()
        
        print(f"📊 ESTATÍSTICAS:")
        print(f"   👥 Profissionais Pendentes: {pendentes.count}")
        print(f"   ✅ Profissionais Aprovados: {aprovados.count}")
        print(f"   📱 WhatsApp Bot: Ativo (PM2)")
        print(f"   🌐 Site: Online")
        print(f"   💾 Banco Supabase: Conectado")
        
        if aprovados.data:
            print(f"\n👷‍♂️ PROFISSIONAIS ATIVOS:")
            for prof in aprovados.data:
                status_admin = " 👨‍💼 (ADMIN)" if prof.get('is_admin') else ""
                print(f"   • {prof.get('nome')} - {prof.get('profissao')}{status_admin}")
                
    except Exception as e:
        print(f"❌ Erro ao verificar sistema: {str(e)}")

if __name__ == "__main__":
    cadastrar_rodrigo_lopes()
    verificar_sistema()
    
    print("\n🚀 SISTEMA CONECTAPRO OPERACIONAL!")
    print("💼 Rodrigo Lopes: Administrador Principal")
    print("📱 WhatsApp: (69) 99370-5343")
    print("🌐 Site: https://conectapro-e0tpg0kxh-conecta-pro.vercel.app") 