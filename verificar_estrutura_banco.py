#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://yugcnpbadwmnqmixlsdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2NucGJhZHdtbnFtaXhsc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUxNDAsImV4cCI6MjA2NjE5MTE0MH0.UY0bEcYUzy4n0De2DJmQWcHAYigs_drTq17uIo2LxZg"

def verificar_tabelas():
    """Verifica a estrutura das tabelas no Supabase"""
    
    print("🔍 VERIFICANDO ESTRUTURA DO BANCO SUPABASE")
    print("="*50)
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print("\n📋 TABELA: profissionais_pendentes")
        print("-" * 30)
        pendentes = supabase.table("profissionais_pendentes").select("*").limit(1).execute()
        if pendentes.data:
            campos_pendentes = list(pendentes.data[0].keys())
            for campo in sorted(campos_pendentes):
                print(f"  • {campo}")
        else:
            print("  (Tabela vazia)")
            
        print("\n📋 TABELA: profissionais_aprovados")  
        print("-" * 30)
        aprovados = supabase.table("profissionais_aprovados").select("*").limit(1).execute()
        if aprovados.data:
            campos_aprovados = list(aprovados.data[0].keys())
            for campo in sorted(campos_aprovados):
                print(f"  • {campo}")
        else:
            print("  (Tabela vazia)")
            
        print("\n📋 DADOS EXISTENTES:")
        print("-" * 20)
        
        # Mostra dados pendentes
        pendentes_all = supabase.table("profissionais_pendentes").select("*").execute()
        print(f"👥 Profissionais Pendentes ({len(pendentes_all.data)}):")
        for i, prof in enumerate(pendentes_all.data, 1):
            nome = prof.get('nome', 'N/A')
            telefone = prof.get('telefone', prof.get('whatsapp', 'N/A'))
            profissao = prof.get('profissao', 'N/A')
            print(f"  {i}. {nome} - {profissao} - {telefone}")
            
        # Mostra dados aprovados
        aprovados_all = supabase.table("profissionais_aprovados").select("*").execute()
        print(f"\n✅ Profissionais Aprovados ({len(aprovados_all.data)}):")
        for i, prof in enumerate(aprovados_all.data, 1):
            nome = prof.get('nome', 'N/A')
            telefone = prof.get('telefone', prof.get('whatsapp', 'N/A'))
            profissao = prof.get('profissao', 'N/A')
            print(f"  {i}. {nome} - {profissao} - {telefone}")
            
    except Exception as e:
        print(f"❌ ERRO: {str(e)}")

if __name__ == "__main__":
    verificar_tabelas() 