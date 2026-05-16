# 🚀 Guia Rápido de Teste

## Acessar a Aplicação

### 1️⃣ **COMEÇAR** - Ir para Cadastro
📍 **URL**: `main/cadastro/index.html`

**Passo a passo:**
1. Clique em "Cadastro" ou acesse diretamente
2. Preencha os campos:
   - Nome: Seu nome completo
   - Email: seu@email.com
   - Usuário: @seu_usuario (o @ é adicionado automaticamente)
   - Senha: Senha123 (mín. 8 caracteres, letras + números)
   - Confirme a senha
3. Marque "Concordo com os Termos de Serviço"
4. Clique em "Criar Conta"
5. ✅ Será redirecionado automaticamente para **Home**

---

## 🏠 **HOME** - Tela Principal (Estilo Facebook)

Após o login/cadastro, você estará na página principal com:

### Esquerda (Sidebar):
- 👤 **Perfil**: Seu avatar, nome, estatísticas
- 📋 **Menu**: Início, Perfil, Postagens, Comentários, Favoritos, Salvos
- 🤝 **Comunidade**: Amigos, Tendências, Configurações
- 🚪 **Sair**: Logout

### Centro (Feed):
- ✍️ **Criar Post**: "No que você está pensando?"
  - Escreva seu texto
  - Clique em "Postar"
  - Opções: Foto/Vídeo, Sentimento, Local
- 📰 **Posts**: Veja posts do feed
  - ❤️ **Curtir**: Clique no coração
  - 💬 **Comentar**: Clique em comentar
  - 🔗 **Compartilhar**: Clique em compartilhar
  - 📊 **Visualizar**: Curtidas, comentários, compartilhamentos

### Direita (Sidebar):
- 🔥 **Tendências**: Tópicos populares
- 👥 **Sugestões**: Pessoas para seguir

---

## 🔐 **LOGIN** - Se já tem conta

📍 **URL**: `main/login/login.html`

1. Insira email e senha
2. ✅ Marque "Lembrar-me" (opcional)
3. Clique em "Entrar"
4. 🏠 Será redirecionado para Home

---

## 🧪 **Dados de Teste Padrão**

Se quiser testar rápido:

```
Nome: João Silva
Email: joao@example.com
Usuário: @joao_silva
Senha: Senha123
```

Após cadastrar, você verá posts de exemplo que já vêm carregados.

---

## ✨ **Recursos Principais**

| Recurso | Localização | Como Usar |
|---------|------------|----------|
| Criar Post | Centro do Feed | Digite + Clique "Postar" |
| Curtir Post | Abaixo de cada post | Clique no ❤️ |
| Comentar | Clique "Comentar" | Escreva + Enter |
| Ver Perfil | Sidebar Esquerda | Clique "Ver Perfil Completo" |
| Sair | Sidebar Esquerda | Clique "Sair" |
| Pesquisar | Navbar Top | Digite na barra de busca |

---

## 🎨 **O Que Foi Criado**

### ✅ Telas Implementadas:
1. **Cadastro** - Registro de novos usuários
2. **Login** - Autenticação de usuários
3. **Home/Feed** - Rede social estilo Facebook

### ✅ Funcionalidades:
- ✓ Validação completa de formulários
- ✓ Armazenamento local (localStorage)
- ✓ Menu lateral com perfil
- ✓ Feed com posts
- ✓ Curtidas, comentários, compartilhamentos
- ✓ Responsivo para mobile/tablet/desktop
- ✓ Notificações visuais
- ✓ Design moderno e limpo

---

## 💡 **Dicas**

✨ **Dica 1**: Os dados são salvos no navegador (localStorage). Limpar histórico apagará tudo!

✨ **Dica 2**: Você pode criar vários usuários e fazer login com qualquer um deles.

✨ **Dica 3**: Passe o mouse sobre os elementos para ver efeitos hover.

✨ **Dica 4**: A página é responsiva - teste em diferentes tamanhos de tela.

---

## 🔧 **Próximos Passos (Para Desenvolvimento)**

Para conectar com o backend:

1. **Criar API em Flask/Node.js** com:
   - POST `/api/cadastro` - Criar usuário
   - POST `/api/login` - Autenticar
   - POST `/api/posts` - Criar post
   - GET `/api/posts` - Listar posts
   - Etc.

2. **Adicionar CORS** na API

3. **Substituir fetch calls** nos scripts:
   ```javascript
   // No lugar de localStorage, fazer requisição:
   fetch('http://localhost:5000/api/login', {
       method: 'POST',
       body: JSON.stringify({email, senha})
   })
   ```

4. **Usar JWT** para autenticação segura

5. **Implementar banco de dados** (MongoDB, PostgreSQL, etc.)

---

## 📱 **Testando Responsividade**

Abra o **Developer Tools** (F12) e teste:

- 📱 **Mobile**: 375px width
- 📱 **Tablet**: 768px width  
- 💻 **Desktop**: 1200px+ width

A aplicação se adapta automaticamente!

---

**Criado por Gabriel Valomi**
