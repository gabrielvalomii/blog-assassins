import sqlite3

# Cria e conecta ao banco de dados local (arquivo será criado na mesma pasta do script)
conn = sqlite3.connect('models.db')
cursor = conn.cursor()

# Cria tabela de usuários
cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS postagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES usuarios (id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comentario TEXT NOT NULL,
    postagem_id INTEGER,
    autor_id INTEGER,
    FOREIGN KEY (postagem_id) REFERENCES postagens (id),
    FOREIGN KEY (autor_id) REFERENCES usuarios (id)
)
''')


conn.commit()
print('Tabelas criadas e conexão com o banco estabelecida com sucesso!')
conn.close()
