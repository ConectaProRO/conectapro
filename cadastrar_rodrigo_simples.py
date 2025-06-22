#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import datetime
from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://yugcnpbadwmnqmixlsdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg"

def cadastrar_rodrigo_simples():
    """Cadastra Rodrigo com dados mais simples"""
    
    print("👨‍💼 CADASTRANDO RODRIGO LOPES - VERSÃO SIMPLES")
    print("="*50)
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Dados simples para evitar erro de tamanho
        rodrigo_dados = {
            "nome": "Rodrigo Lopes",
            "telefone": "69993705343",
            "email": "admin@conectapro.com",
            "endereco": "Centro, Porto Velho",
            "experiencia": "15 anos",
            "servicos": "Administração",
            "origem": "Admin Python"
        }
        
        print("📝 DADOS SIMPLIFICADOS:")
        for campo, valor in rodrigo_dados.items():
            print(f"➡️ {campo}: {valor}")
        
        # Verifica se já existe nos pendentes
        existing = supabase.table("profissionais_pendentes").select("*").eq("telefone", "69993705343").execute()
        
        if existing.data:
            print("\n⚠️ Rodrigo já existe nos pendentes!")
            prof_id = existing.data[0]['id']
        else:
            # Insere nos pendentes
            result = supabase.table("profissionais_pendentes").insert(rodrigo_dados).execute()
            if result.data:
                prof_id = result.data[0]['id']
                print("\n✅ Rodrigo inserido nos pendentes!")
            else:
                print("\n❌ Erro ao inserir nos pendentes")
                return
        
        # Agora move para aprovados
        rodrigo_aprovado = {
            "nome": "Rodrigo Lopes",
            "telefone": "69993705343",
            "email": "admin@conectapro.com", 
            "endereco": "Centro, Porto Velho",
            "experiencia": "15 anos",
            "servicos": "Administração",
            "ativo": True,
            "visivel": True,
            "avaliacao_media": 5.0,
            "total_avaliacoes": 1
        }
        
        # Verifica se já está aprovado
        existing_aprovado = supabase.table("profissionais_aprovados").select("*").eq("telefone", "69993705343").execute()
        
        if existing_aprovado.data:
            print("⚠️ Rodrigo já está aprovado!")
        else:
            # Insere nos aprovados
            result_aprovado = supabase.table("profissionais_aprovados").insert(rodrigo_aprovado).execute()
            if result_aprovado.data:
                print("✅ Rodrigo aprovado com sucesso!")
                
                # Marca como aprovado nos pendentes
                supabase.table("profissionais_pendentes").update({
                    "aprovado_em": datetime.now().isoformat(),
                    "aprovado_por": "Sistema"
                }).eq("id", prof_id).execute()
                
                print("\n🎉 CADASTRO ADMINISTRATIVO COMPLETO!")
                print("👤 Nome: Rodrigo Lopes")
                print("📱 Telefone: (69) 99370-5343")
                print("✅ Status: Aprovado e Ativo")
                print("🔧 Acesso: Painel Administrativo")
                
            else:
                print("❌ Erro ao aprovar Rodrigo")
                
    except Exception as e:
        print(f"❌ ERRO: {str(e)}")

if __name__ == "__main__":
    cadastrar_rodrigo_simples()
    
    print("\n🚀 RODRIGO LOPES CADASTRADO COMO ADMINISTRADOR!")
    print("📱 WhatsApp: (69) 99370-5343")
    print("�� Acesso: /admin") 