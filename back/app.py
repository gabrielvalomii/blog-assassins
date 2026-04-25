from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
from datetime import datetime

# Configuração do Flask para servir arquivos estáticos
app = Flask(__name__, static_folder='../main/', static_url_path='')
CORS(app)
DB_PATH = 'models.db'

def get_db_connection():
    """Cria conexão com o banco de dados"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Permite acessar colunas por nome
    return conn

def check_password(password, hashed):
    return make_password(password) == hashed

# Função para hash de senha
def make_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

#Serve a página inicial"""
@app.route('/')
def index():
    return app.send_static_file('cadastro/index.html')

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
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', (nome, email, senha_hash))
        conn.commit()
        conn.close()
        return jsonify({'mensagem': 'Usuário cadastrado com sucesso!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'erro': 'Email já cadastrado'}), 400   
    except  Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')
    if not email or not senha:
        return jsonify({'erro': 'Email e senha são obrigatórios'}), 400
    senha_hash = make_password(senha)
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', (email, senha_hash))
        user = cursor.fetchone()
        conn.close()
        if user:
            return jsonify({'mensagem': 'Login realizado com sucesso!',
                            'usuario': {
                                'id': user[0],
                                'email': user[1],
                                'senha': user[2]
                                        }
                            }), 200
        else:
            return jsonify({'erro': 'Email ou senha incorretos'}), 401
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route('/api/postagem', methods=['POST'])
def criar_postagem():
    data = request.json
    titulo = data.get('titulo')
    conteudo = data.get('conteudo')
    autor_id = data.get('autor_id')
    if not titulo or not conteudo or not autor_id:
        return jsonify({'erro': 'Todos os campos são obrigatorios'}), 400
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO postagens (titulo, conteudo, autor_id) VALUES (?, ?, ?)', (titulo, conteudo, autor_id))
        conn.commit()
        conn.close()
        return jsonify({'mensagem': 'Postagem criada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route('/api/comentario', methods=['GET', 'POST'])
def criar_comentario():
    data = request.json
    comentario = data.get('comentario')
    postagem_id = data.get('postagem_id')
    autor_id = data.get('autor_id')
    if not postagem_id or not autor_id or not comentario:
        return jsonify({'erro': 'Postagem, autor e comentário são obrigatórios'}), 400
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO comentarios (comentario, postagem_id, autor_id) VALUES (?, ?, ?)', (comentario, postagem_id, autor_id))
        conn.commit()
        conn.close()
        return jsonify({'mensagem': 'Comentário criado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
