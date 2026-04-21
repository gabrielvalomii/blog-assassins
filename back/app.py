from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DB_PATH = 'models.db'

# Configuração do Flask para servir arquivos estáticos
app = Flask(__name__, static_folder='../main', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# Rota para cadastrar usuário
@app.route('/api/usuarios', methods=['POST'])
def cadastrar_usuario():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    if not nome or not senha:
        return jsonify({'erro': 'Nome e senha são obrigatórios'}), 400
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', (nome, senha))
    conn.commit()
    conn.close()
    return jsonify({'mensagem': 'Usuário cadastrado com sucesso!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    if not nome or not senha:
        return jsonify({'erro': 'Nome e senha são obrigatórios'}), 400
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', (nome, senha))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({'mensagem': 'Login realizado com sucesso!'}), 200
    else:
        return jsonify({'erro': 'Nome ou senha incorretos'}), 401

@app.route('/api/postagem', methods=['POST'])
def postagem():
    data = request.json
    titulo = data.get('titulo')
    conteudo = data.get('conteudo')
    autor = data.get('autor')
    if not titulo or not conteudo or not autor:
        return jsonify({'erro': 'Todos os campos são obrigatorios'}), 400
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO postagens (titulo, conteudo, autor) VALUES (?, ?, ?)', (titulo, conteudo, autor))
    conn.commit()
    conn.close()
    return jsonify({'mensagem': 'Postagem criada com sucesso!'}), 201

@app.route('/api/comentario', methods=['GET'])
def comentario():
    data = request.json
    comentario = data.get('comentario')
    if not comentario:
        return jsonify({'erro': 'Comentario é obrigatorio'}), 400
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM comentarios')
    comentarios = cursor.fetchall()
    conn.close()
    return jsonify(comentarios), 200 