#!/usr/bin/env python3
"""
Script de instalação das dependências para o Sistema de Orçamento 3D
ConectaPro - Porto Velho/RO
"""

import subprocess
import sys
import os

def instalar_dependencias():
    """Instala todas as dependências necessárias"""
    print("🚀 Instalando dependências para o Sistema de Orçamento 3D ConectaPro")
    print("=" * 60)
    
    # Lista de dependências
    dependencias = [
        "pandas>=2.0.0",
        "numpy>=1.24.0", 
        "PyPDF2>=3.0.0",
        "requests>=2.31.0",
        "opencv-python>=4.8.0",
        "Pillow>=10.0.0",
        "matplotlib>=3.7.0",
        "openpyxl>=3.1.0"
    ]
    
    print(f"📦 Instalando {len(dependencias)} dependências...")
    
    for i, dependencia in enumerate(dependencias, 1):
        print(f"\n[{i}/{len(dependencias)}] Instalando {dependencia}...")
        
        try:
            subprocess.check_call([
                sys.executable, "-m", "pip", "install", dependencia
            ])
            print(f"✅ {dependencia} instalado com sucesso!")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Erro ao instalar {dependencia}: {e}")
            return False
    
    print("\n" + "=" * 60)
    print("✅ Todas as dependências foram instaladas com sucesso!")
    print("\n🎯 Próximos passos:")
    print("1. Execute: python orcamento_3d_ai.py")
    print("2. Ou acesse o sistema web em: /orcamento-3d")
    print("3. Faça upload de modelos 3D ou plantas baixas")
    print("4. Receba orçamentos automáticos com IA + SINAPI")
    
    return True

def verificar_instalacao():
    """Verifica se as dependências estão instaladas"""
    print("\n🔍 Verificando instalação...")
    
    modulos_teste = [
        ("pandas", "pd"),
        ("numpy", "np"),
        ("PyPDF2", "PyPDF2"),
        ("requests", "requests"),
        ("cv2", "cv2"),
        ("PIL", "PIL"),
        ("matplotlib", "matplotlib"),
        ("openpyxl", "openpyxl")
    ]
    
    todos_ok = True
    
    for modulo, alias in modulos_teste:
        try:
            __import__(modulo)
            print(f"✅ {modulo} - OK")
        except ImportError:
            print(f"❌ {modulo} - FALTANDO")
            todos_ok = False
    
    if todos_ok:
        print("\n🎉 Todas as dependências estão funcionando!")
        print("🚀 Sistema pronto para uso!")
    else:
        print("\n⚠️  Algumas dependências estão faltando.")
        print("Execute novamente a instalação.")
    
    return todos_ok

if __name__ == "__main__":
    print("🏗️ ConectaPro - Sistema de Orçamento Inteligente 3D")
    print("📍 Porto Velho - RO")
    print("📧 conectaproro@gmail.com")
    print("📱 WhatsApp: (69) 99256-1830")
    
    if instalar_dependencias():
        verificar_instalacao()
        
        print("\n" + "=" * 60)
        print("🎯 SISTEMA PRONTO PARA USO!")
        print("=" * 60)
        print("📚 Documentação:")
        print("• Upload modelos 3D do Sketchfab")
        print("• Upload plantas baixas (PNG, JPG, PDF)")
        print("• IA identifica elementos automaticamente")
        print("• Preços baseados em SINAPI + CUB Sinduscon-RO")
        print("• Relatórios HTML profissionais")
        print("• Integração com sistema de profissionais")
        
    else:
        print("\n❌ Instalação falhou. Verifique sua conexão e tente novamente.")
        sys.exit(1) 