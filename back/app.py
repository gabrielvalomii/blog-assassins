from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib, check_password

app = Flask(__name__)
CORS(app)
DB_PATH = 'models.db'

# Configuração do Flask para servir arquivos estáticos
app = Flask(__name__, static_folder='../main', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# Função para hash de senha
def make_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def home(request):
    if request.method == 'POST':
        username = request.POST.get('nome')
        password = request.POST.get('senha')
        if not username or not check_password(password, cadastrar_usuario.senha):
            return jsonify({'error': 'Nome e senha são obrigatórios'}), 400
        request.session['user_id'] = cadastrar_usuario.id
        request.session['username'] = cadastrar_usuario.nome
        return jsonify({'message': 'Login realizado com sucesso!'}), 200
    return jsonify({'message': 'Bem-vindo à página inicial!'}), 200

# Rota para cadastrar usuário
@app.route('/api/usuarios', methods=['POST'])
def cadastrar_usuario():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    if not nome or not senha or not email:
        return jsonify({'erro': 'Nome, email e senha são obrigatórios'}), 400
    senha_hash = make_password(senha)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', (nome, email, senha_hash))
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
    senha_hash = make_password(senha)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', (nome, senha_hash))
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