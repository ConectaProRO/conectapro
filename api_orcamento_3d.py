#!/usr/bin/env python3
"""
API Flask - Sistema de Orçamento Inteligente 3D
Preparado para integração com Bubble e n8n
Baseado no orcamento_3d_ai.py
"""

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import json
import os
from dataclasses import asdict
from datetime import datetime
import logging

# Importar classes do sistema principal
from orcamento_3d_ai import SistemaOrcamento3D, OrcamentoCompleto

app = Flask(__name__)
CORS(app)  # Permitir requisições do Bubble/n8n

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Armazenar orçamentos processados (em produção, usar banco de dados)
orcamentos_cache = {}

@app.route('/', methods=['GET'])
def home():
    """Página inicial da API"""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Orçamento 3D - ConectaPro</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2563eb; text-align: center; }
            .endpoint { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }
            .method { background: #10b981; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px; }
            .status { text-align: center; padding: 20px; background: #dcfce7; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏗️ API Orçamento 3D - ConectaPro</h1>
            
            <div class="status">
                <h3>✅ API Online e Funcionando</h3>
                <p>Pronta para integração com Bubble e n8n</p>
            </div>
            
            <h2>📋 Endpoints Disponíveis:</h2>
            
            <div class="endpoint">
                <span class="method">POST</span>
                <strong>/api/processar</strong> - Processar modelo 3D/planta
                <br><small>Body: {"nome_projeto": "string", "url_modelo_3d": "string", "tipo": "sketchfab"}</small>
            </div>
            
            <div class="endpoint">
                <span class="method">GET</span>
                <strong>/api/orcamento/{id}</strong> - Buscar orçamento por ID
            </div>
            
            <div class="endpoint">
                <span class="method">GET</span>
                <strong>/api/orcamentos</strong> - Listar todos os orçamentos
            </div>
            
            <div class="endpoint">
                <span class="method">POST</span>
                <strong>/api/webhook/bubble</strong> - Webhook para Bubble
            </div>
            
            <div class="endpoint">
                <span class="method">POST</span>
                <strong>/api/webhook/n8n</strong> - Webhook para n8n
            </div>
            
            <div class="endpoint">
                <span class="method">GET</span>
                <strong>/api/relatorio/{id}</strong> - Gerar relatório HTML
            </div>
            
            <h2>🔗 Integração:</h2>
            <p><strong>Bubble:</strong> Use os webhooks para conectar workflows</p>
            <p><strong>n8n:</strong> Configure HTTP Request nodes para os endpoints</p>
            <p><strong>Sketchfab:</strong> Envie URLs de modelos 3D para análise automática</p>
            
            <div style="text-align: center; margin-top: 30px; color: #6b7280;">
                <p>Desenvolvido para ConectaPro | Integração Bubble + n8n</p>
            </div>
        </div>
    </body>
    </html>
    """
    return html

@app.route('/api/processar', methods=['POST'])
def processar_modelo():
    """
    Endpoint principal para processar modelos 3D
    Compatível com Bubble e n8n
    """
    try:
        data = request.get_json()
        
        # Validar dados obrigatórios
        if not data or 'nome_projeto' not in data:
            return jsonify({
                'error': 'Campo nome_projeto é obrigatório',
                'status': 'error'
            }), 400
        
        nome_projeto = data['nome_projeto']
        url_modelo_3d = data.get('url_modelo_3d')
        caminho_planta = data.get('caminho_planta')
        
        if not url_modelo_3d and not caminho_planta:
            return jsonify({
                'error': 'URL do modelo 3D ou caminho da planta é obrigatório',
                'status': 'error'
            }), 400
        
        logger.info(f"Processando projeto: {nome_projeto}")
        
        # Processar com o sistema principal
        sistema = SistemaOrcamento3D()
        orcamento = sistema.processar_projeto_completo(
            nome_projeto=nome_projeto,
            url_modelo_3d=url_modelo_3d,
            caminho_planta=caminho_planta
        )
        
        # Armazenar no cache (em produção, salvar no banco)
        orcamentos_cache[orcamento.projeto_id] = orcamento
        
        # Retornar resultado estruturado
        resultado = {
            'status': 'success',
            'projeto_id': orcamento.projeto_id,
            'nome_projeto': orcamento.nome_projeto,
            'area_total': orcamento.area_total,
            'total_geral': orcamento.total_geral,
            'custo_por_m2': round(orcamento.total_geral / orcamento.area_total, 2),
            'elementos_detectados': len(orcamento.elementos),
            'itens_orcamento': len(orcamento.itens),
            'data_criacao': orcamento.data_criacao,
            'resumo_categorias': orcamento.resumo_categorias,
            'observacoes': orcamento.observacoes,
            'detalhes_completos': asdict(orcamento)
        }
        
        logger.info(f"Projeto processado com sucesso: {orcamento.projeto_id}")
        return jsonify(resultado)
        
    except Exception as e:
        logger.error(f"Erro ao processar projeto: {str(e)}")
        return jsonify({
            'error': f'Erro interno: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/orcamento/<projeto_id>', methods=['GET'])
def buscar_orcamento(projeto_id):
    """Buscar orçamento específico por ID"""
    if projeto_id not in orcamentos_cache:
        return jsonify({
            'error': 'Orçamento não encontrado',
            'status': 'error'
        }), 404
    
    orcamento = orcamentos_cache[projeto_id]
    return jsonify({
        'status': 'success',
        'orcamento': asdict(orcamento)
    })

@app.route('/api/orcamentos', methods=['GET'])
def listar_orcamentos():
    """Listar todos os orçamentos processados"""
    lista = []
    for projeto_id, orcamento in orcamentos_cache.items():
        lista.append({
            'projeto_id': projeto_id,
            'nome_projeto': orcamento.nome_projeto,
            'area_total': orcamento.area_total,
            'total_geral': orcamento.total_geral,
            'data_criacao': orcamento.data_criacao
        })
    
    return jsonify({
        'status': 'success',
        'total': len(lista),
        'orcamentos': lista
    })

@app.route('/api/webhook/bubble', methods=['POST'])
def webhook_bubble():
    """
    Webhook específico para Bubble
    Formato otimizado para workflows Bubble
    """
    try:
        data = request.get_json()
        logger.info(f"Webhook Bubble recebido: {data}")
        
        # Processar dados do Bubble
        resultado = processar_modelo()
        
        # Formato específico para Bubble
        if isinstance(resultado, tuple):  # Erro
            return resultado
        
        bubble_response = {
            'bubble_status': 'success',
            'project_data': resultado.get_json(),
            'webhook_timestamp': datetime.now().isoformat(),
            'ready_for_bubble': True
        }
        
        return jsonify(bubble_response)
        
    except Exception as e:
        return jsonify({
            'bubble_status': 'error',
            'error_message': str(e),
            'webhook_timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/webhook/n8n', methods=['POST'])
def webhook_n8n():
    """
    Webhook específico para n8n
    Formato otimizado para workflows n8n
    """
    try:
        data = request.get_json()
        logger.info(f"Webhook n8n recebido: {data}")
        
        # Processar dados do n8n
        resultado = processar_modelo()
        
        # Formato específico para n8n
        if isinstance(resultado, tuple):  # Erro
            return resultado
        
        n8n_response = {
            'n8n_status': 'success',
            'workflow_data': resultado.get_json(),
            'next_node_ready': True,
            'timestamp': datetime.now().isoformat(),
            'metadata': {
                'source': 'orcamento_3d_api',
                'version': '1.0',
                'integration': 'n8n'
            }
        }
        
        return jsonify(n8n_response)
        
    except Exception as e:
        return jsonify({
            'n8n_status': 'error',
            'error_details': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/relatorio/<projeto_id>', methods=['GET'])
def gerar_relatorio(projeto_id):
    """Gerar relatório HTML do orçamento"""
    if projeto_id not in orcamentos_cache:
        return jsonify({
            'error': 'Orçamento não encontrado',
            'status': 'error'
        }), 404
    
    orcamento = orcamentos_cache[projeto_id]
    
    # Template HTML do relatório
    html_template = """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Orçamento - {{ nome_projeto }}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .resumo { background: #f8fafc; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .item { border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
            .total { background: #dcfce7; padding: 15px; font-size: 18px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏗️ {{ nome_projeto }}</h1>
            <p>Orçamento Inteligente 3D - ConectaPro</p>
        </div>
        
        <div class="resumo">
            <h2>📊 Resumo do Projeto</h2>
            <p><strong>ID:</strong> {{ projeto_id }}</p>
            <p><strong>Data:</strong> {{ data_criacao }}</p>
            <p><strong>Área Total:</strong> {{ area_total }} m²</p>
            <p><strong>Custo por m²:</strong> R$ {{ custo_m2 }}</p>
        </div>
        
        <h2>📋 Itens do Orçamento</h2>
        {% for item in itens %}
        <div class="item">
            <strong>{{ item.descricao }}</strong><br>
            Código: {{ item.codigo_sinapi }} | 
            Quantidade: {{ item.quantidade }} {{ item.unidade }} | 
            Preço Unit.: R$ {{ "%.2f"|format(item.preco_unitario) }} | 
            Total: R$ {{ "%.2f"|format(item.preco_total) }}
        </div>
        {% endfor %}
        
        <div class="total">
            💰 Total Geral: R$ {{ "%.2f"|format(total_geral) }}
        </div>
        
        <h2>📝 Observações</h2>
        {% for obs in observacoes %}
        <p>• {{ obs }}</p>
        {% endfor %}
    </body>
    </html>
    """
    
    # Renderizar template (simplificado)
    html = html_template.replace('{{ nome_projeto }}', orcamento.nome_projeto)
    html = html.replace('{{ projeto_id }}', orcamento.projeto_id)
    html = html.replace('{{ data_criacao }}', orcamento.data_criacao)
    html = html.replace('{{ area_total }}', str(orcamento.area_total))
    html = html.replace('{{ custo_m2 }}', f"{orcamento.total_geral/orcamento.area_total:.2f}")
    html = html.replace('{{ total_geral }}', str(orcamento.total_geral))
    
    return html

@app.route('/api/status', methods=['GET'])
def status_api():
    """Status da API"""
    return jsonify({
        'status': 'online',
        'version': '1.0',
        'orcamentos_processados': len(orcamentos_cache),
        'integracoes': ['bubble', 'n8n', 'sketchfab'],
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Iniciando API Orçamento 3D - ConectaPro")
    print("📍 Acesse: http://localhost:5000")
    print("🔗 Pronta para Bubble + n8n")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000) 