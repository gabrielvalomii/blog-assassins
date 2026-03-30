from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DB_PATH = 'meu_banco.db'

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

# Rota para cadastrar produto
@app.route('/api/produtos', methods=['POST'])
def cadastrar_produto():
    data = request.json
    nome = data.get('nome')
    preco = data.get('preco')
    if not nome or preco is None:
        return jsonify({'erro': 'Nome e preço são obrigatórios'}), 400
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO produtos (nome, preco) VALUES (?, ?)', (nome, preco))
    conn.commit()
    conn.close()
    return jsonify({'mensagem': 'Produto cadastrado com sucesso!'}), 201

if __name__ == '__main__':
    app.run(debug=True)
