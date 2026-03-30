import sqlite3

# Cria e conecta ao banco de dados local (arquivo será criado na mesma pasta do script)
conn = sqlite3.connect('meu_banco.db')
cursor = conn.cursor()

# Cria tabela de usuários
cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL
)
''')


conn.commit()
print('Tabelas criadas e conexão com o banco estabelecida com sucesso!')
conn.close()
