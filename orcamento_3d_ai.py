#!/usr/bin/env python3
"""
Sistema de Orçamento Inteligente 3D - ConectaPro
Integra análise de modelos 3D com orçamentos SINAPI automáticos
Autor: ConectaPro Team
Data: Janeiro 2025
"""

import json
import os
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Tuple
import pandas as pd
import numpy as np
from datetime import datetime
import base64
import requests

@dataclass
class ElementoConstrutivo:
    """Representa um elemento construtivo identificado no modelo 3D"""
    tipo: str  # alvenaria, piso, cobertura, etc.
    area: float  # m²
    volume: float  # m³ (quando aplicável)
    dimensoes: Dict[str, float]  # largura, altura, comprimento
    material: str  # cerâmica, concreto, etc.
    acabamento: str  # simples, médio, alto
    localizacao: str  # interno, externo, molhado
    complexidade: str  # simples, média, alta

@dataclass
class ItemOrcamento:
    """Item individual do orçamento"""
    codigo_sinapi: str
    descricao: str
    unidade: str
    quantidade: float
    preco_unitario: float
    preco_total: float
    categoria: str
    elemento_origem: str

@dataclass
class OrcamentoCompleto:
    """Orçamento completo do projeto"""
    projeto_id: str
    nome_projeto: str
    data_criacao: str
    area_total: float
    elementos: List[ElementoConstrutivo]
    itens: List[ItemOrcamento]
    resumo_categorias: Dict[str, float]
    total_geral: float
    observacoes: List[str]

class AnalisadorModelo3D:
    """Analisa modelos 3D e extrai dados para orçamento"""
    
    def __init__(self):
        self.elementos_detectados = []
        
    def analisar_modelo_sketchfab(self, url_modelo: str) -> List[ElementoConstrutivo]:
        """
        Analisa modelo do Sketchfab e extrai elementos construtivos
        Por enquanto simula análise - pode integrar com APIs de visão computacional
        """
        print(f"🔍 Analisando modelo 3D: {url_modelo}")
        
        # Simulação de análise de modelo 3D
        # Na implementação real, usaria OpenCV, Three.js ou APIs de IA
        elementos_exemplo = [
            ElementoConstrutivo(
                tipo="alvenaria",
                area=120.5,
                volume=0,
                dimensoes={"altura": 2.8, "comprimento": 43.0, "espessura": 0.14},
                material="ceramico",
                acabamento="medio",
                localizacao="interno",
                complexidade="simples"
            ),
            ElementoConstrutivo(
                tipo="piso",
                area=85.0,
                volume=0,
                dimensoes={"largura": 10.0, "comprimento": 8.5, "espessura": 0.03},
                material="ceramica",
                acabamento="medio",
                localizacao="interno",
                complexidade="simples"
            ),
            ElementoConstrutivo(
                tipo="cobertura",
                area=95.0,
                volume=0,
                dimensoes={"largura": 10.5, "comprimento": 9.0, "inclinacao": 30},
                material="telha_ceramica",
                acabamento="medio",
                localizacao="externo",
                complexidade="media"
            )
        ]
        
        self.elementos_detectados = elementos_exemplo
        print(f"✅ Detectados {len(elementos_exemplo)} elementos construtivos")
        return elementos_exemplo

    def analisar_imagem_planta(self, caminho_imagem: str) -> List[ElementoConstrutivo]:
        """
        Analisa planta baixa usando IA para detectar elementos
        Pode usar OpenCV + Machine Learning
        """
        print(f"📐 Analisando planta baixa: {caminho_imagem}")
        
        # Simulação de análise de imagem
        # Na implementação real, usaria YOLO, OpenCV ou APIs como Google Vision
        return self.elementos_detectados

class GeradorOrcamentoSINAPI:
    """Gera orçamentos baseados nos dados SINAPI existentes"""
    
    def __init__(self):
        self.dados_sinapi = self._carregar_dados_sinapi()
        self.dados_cub = self._carregar_dados_cub()
        
    def _carregar_dados_sinapi(self) -> Dict:
        """Carrega dados SINAPI das calculadoras existentes"""
        return {
            "alvenaria": {
                "ceramica_14cm": {
                    "codigo": "73915/001",
                    "descricao": "ALVENARIA DE VEDAÇÃO DE BLOCOS CERÂMICOS FURADOS 9X14X19CM",
                    "unidade": "m²",
                    "preco_desonerado": 87.45,
                    "preco_onerado": 89.18,
                    "composicao": {
                        "mao_obra": 60.37,
                        "materiais": 27.08,
                        "equipamentos": 0.08
                    }
                }
            },
            "piso": {
                "ceramica_comum": {
                    "codigo": "87254",
                    "descricao": "REVESTIMENTO CERÂMICO PARA PISO 45X45CM",
                    "unidade": "m²",
                    "preco_desonerado": 65.80,
                    "preco_onerado": 67.25,
                    "composicao": {
                        "mao_obra": 28.50,
                        "materiais": 37.30,
                        "equipamentos": 0
                    }
                }
            },
            "cobertura": {
                "telha_ceramica": {
                    "codigo": "74139/001",
                    "descricao": "TELHAMENTO COM TELHA CERÂMICA TIPO FRANCESA",
                    "unidade": "m²",
                    "preco_desonerado": 45.80,
                    "preco_onerado": 47.20,
                    "composicao": {
                        "mao_obra": 18.50,
                        "materiais": 27.30,
                        "equipamentos": 0
                    }
                }
            }
        }
    
    def _carregar_dados_cub(self) -> Dict:
        """Carrega dados CUB do Sinduscon"""
        return {
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
    
    def calcular_item_elemento(self, elemento: ElementoConstrutivo) -> List[ItemOrcamento]:
        """Calcula itens de orçamento para um elemento construtivo"""
        itens = []
        
        if elemento.tipo == "alvenaria":
            dados = self.dados_sinapi["alvenaria"]["ceramica_14cm"]
            
            # Fator de complexidade
            fator_complexidade = {
                "simples": 1.0,
                "media": 1.15,
                "alta": 1.30
            }.get(elemento.complexidade, 1.0)
            
            preco_final = dados["preco_desonerado"] * fator_complexidade
            
            item = ItemOrcamento(
                codigo_sinapi=dados["codigo"],
                descricao=dados["descricao"],
                unidade=dados["unidade"],
                quantidade=elemento.area,
                preco_unitario=preco_final,
                preco_total=elemento.area * preco_final,
                categoria="Vedações",
                elemento_origem=f"Alvenaria - {elemento.localizacao}"
            )
            itens.append(item)
            
        elif elemento.tipo == "piso":
            dados = self.dados_sinapi["piso"]["ceramica_comum"]
            
            # Ajuste por acabamento
            fator_acabamento = {
                "simples": 0.85,
                "medio": 1.0,
                "alto": 1.35
            }.get(elemento.acabamento, 1.0)
            
            preco_final = dados["preco_desonerado"] * fator_acabamento
            
            item = ItemOrcamento(
                codigo_sinapi=dados["codigo"],
                descricao=dados["descricao"],
                unidade=dados["unidade"],
                quantidade=elemento.area,
                preco_unitario=preco_final,
                preco_total=elemento.area * preco_final,
                categoria="Pisos e Revestimentos",
                elemento_origem=f"Piso - {elemento.material}"
            )
            itens.append(item)
            
        elif elemento.tipo == "cobertura":
            dados = self.dados_sinapi["cobertura"]["telha_ceramica"]
            
            preco_final = dados["preco_desonerado"]
            
            item = ItemOrcamento(
                codigo_sinapi=dados["codigo"],
                descricao=dados["descricao"],
                unidade=dados["unidade"],
                quantidade=elemento.area,
                preco_unitario=preco_final,
                preco_total=elemento.area * preco_final,
                categoria="Cobertura",
                elemento_origem="Telhamento"
            )
            itens.append(item)
        
        return itens

class SistemaOrcamento3D:
    """Sistema principal que integra análise 3D com orçamento SINAPI"""
    
    def __init__(self):
        self.analisador_3d = AnalisadorModelo3D()
        self.gerador_orcamento = GeradorOrcamentoSINAPI()
        
    def processar_projeto_completo(self, 
                                   nome_projeto: str,
                                   url_modelo_3d: Optional[str] = None,
                                   caminho_planta: Optional[str] = None) -> OrcamentoCompleto:
        """
        Processa projeto completo: 3D → Análise → Orçamento → Relatório
        """
        print(f"🚀 Iniciando processamento do projeto: {nome_projeto}")
        
        # 1. Análise do modelo 3D
        elementos = []
        if url_modelo_3d:
            elementos.extend(self.analisador_3d.analisar_modelo_sketchfab(url_modelo_3d))
        elif caminho_planta:
            elementos.extend(self.analisador_3d.analisar_imagem_planta(caminho_planta))
        
        # 2. Gerar itens de orçamento
        todos_itens = []
        for elemento in elementos:
            itens_elemento = self.gerador_orcamento.calcular_item_elemento(elemento)
            todos_itens.extend(itens_elemento)
        
        # 3. Calcular resumos
        resumo_categorias = {}
        for item in todos_itens:
            if item.categoria not in resumo_categorias:
                resumo_categorias[item.categoria] = 0
            resumo_categorias[item.categoria] += item.preco_total
        
        total_geral = sum(item.preco_total for item in todos_itens)
        area_total = sum(elem.area for elem in elementos if elem.area > 0)
        
        # 4. Observações automáticas
        observacoes = [
            "Orçamento baseado em análise automatizada de modelo 3D",
            "Preços baseados na tabela SINAPI oficial e CUB Sinduscon-RO",
            "Valores podem variar conforme especificações técnicas detalhadas",
            "Recomenda-se validação com profissional especializado",
            f"Custo por m²: R$ {total_geral/area_total:.2f} (referência CUB: R$ 1.847,25)"
        ]
        
        # 5. Criar orçamento completo
        orcamento = OrcamentoCompleto(
            projeto_id=f"PROJ_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            nome_projeto=nome_projeto,
            data_criacao=datetime.now().strftime("%d/%m/%Y %H:%M"),
            area_total=area_total,
            elementos=elementos,
            itens=todos_itens,
            resumo_categorias=resumo_categorias,
            total_geral=total_geral,
            observacoes=observacoes
        )
        
        print(f"✅ Projeto processado: {len(elementos)} elementos, R$ {total_geral:,.2f}")
        return orcamento

def demo_sistema():
    """Demonstração do sistema completo"""
    print("🏗️ DEMO - Sistema de Orçamento Inteligente 3D ConectaPro")
    print("=" * 60)
    
    # Inicializar sistema
    sistema = SistemaOrcamento3D()
    
    # Processar projeto exemplo
    orcamento = sistema.processar_projeto_completo(
        nome_projeto="Casa Residencial - 85m²",
        url_modelo_3d="https://sketchfab.com/3d-models/casa-exemplo"
    )
    
    print(f"\n📊 RESUMO DO ORÇAMENTO:")
    print(f"• Área Total: {orcamento.area_total:.2f} m²")
    print(f"• Total Geral: R$ {orcamento.total_geral:,.2f}")
    print(f"• Custo por m²: R$ {orcamento.total_geral/orcamento.area_total:.2f}")
    print(f"• Elementos: {len(orcamento.elementos)}")
    print(f"• Itens: {len(orcamento.itens)}")
    
    return orcamento

if __name__ == "__main__":
    # Executar demonstração
    demo_sistema() 