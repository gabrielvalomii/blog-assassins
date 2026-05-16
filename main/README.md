# 📖 Blog Assassins Cred - Aplicação Web

Uma aplicação web estilo **Facebook** construída com HTML5, CSS3 e JavaScript Vanilla, permitindo que usuários criem contas, façam login e compartilhem posts em um feed social.

## 🎨 Estrutura do Projeto

```
main/
├── index.html              # Tela principal (Home/Feed) - Estilo Facebook
├── style.css               # Estilos para a tela principal
├── script.js               # Lógica da tela principal
│
├── login/
│   ├── login.html         # Tela de Login
│   ├── style.css          # Estilos do Login
│   └── script.js          # Lógica do Login
│
└── cadastro/
    ├── index.html         # Tela de Cadastro
    ├── style.css          # Estilos do Cadastro
    └── script.js          # Lógica do Cadastro
```

## 🚀 Funcionalidades

### 📝 Cadastro
- Validação completa de formulário
- Senha com requisitos de segurança (8+ caracteres, letras e números)
- Avatar automático gerado via UI Avatars
- Armazenamento seguro em localStorage
- Redirecionamento automático para Home após cadastro

### 🔐 Login
- Validação de email e senha
- Opção "Lembrar-me" (salva email)
- Redefinição de senha
- Redirecionamento para Home após login

### 📱 Tela Principal (Home)
- **Menu Lateral Esquerdo**: Perfil do usuário, menu de navegação, tendências
- **Feed Central**: Criar posts, visualizar feed, curtir, comentar
- **Sidebar Direito**: Tendências, sugestões de seguir
- **Navbar Fixa**: Busca, notificações, menu do usuário

#### Recursos do Feed:
- ✍️ Criar novos posts
- ❤️ Curtir/Descurtir posts
- 💬 Comentar em posts
- 🔗 Compartilhar posts
- 👤 Visualizar perfil do autor
- 📊 Contadores de curtidas, comentários e compartilhamentos

## 🎯 Como Usar

### 1. Acessar o Cadastro
- Acesse `main/cadastro/index.html`
- Preencha todos os campos (Nome, Email, Usuário, Senha)
- Concorde com os Termos de Serviço
- Clique em "Criar Conta"

**Dados de Exemplo para Teste:**
```
Nome: João Silva
Email: joao@example.com
Usuário: @joao_silva
Senha: Senha123
```

### 2. Acessar o Login
- Acesse `main/login/login.html`
- Insira email e senha cadastrados
- Clique em "Entrar"
- Opcionalmente, marque "Lembrar-me" para manter email salvo

### 3. Explorar a Tela Principal
- Visualize seu perfil no menu lateral
- Crie um novo post na caixa "No que você está pensando?"
- Interaja com posts (curtir, comentar, compartilhar)
- Navegue pelo menu lateral (Início, Perfil, Postagens, etc.)

## 💾 Armazenamento de Dados

A aplicação utiliza **localStorage** do navegador para persistir dados:

### Chaves LocalStorage:
- `current_user`: Dados do usuário logado
- `usuarios`: Lista de todos os usuários cadastrados
- `blog_posts`: Posts do feed
- `remember_email`: Email salvo para login

## 🎨 Paleta de Cores

| Elemento | Cor | Código |
|----------|-----|--------|
| Primário | Azul | #1DA1F2 |
| Secundário | Verde | #17BF63 |
| Fundo | Cinza Claro | #F7F9FA |
| Erro | Vermelho | #F41F3D |

## 📱 Responsividade

A aplicação é **totalmente responsiva**:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (até 480px)

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Animações
- **JavaScript (Vanilla)**: Sem dependências externas
- **Font Awesome 6**: Ícones
- **UI Avatars**: Geração de avatares dinâmicos
- **LocalStorage**: Persistência de dados

## ⚙️ Instalação e Execução

1. **Clone ou baixe o projeto**
```bash
cd c:\servucehub\blog-assassins\main
```

2. **Abra em um navegador**
   - Pode abrir diretamente os arquivos HTML
   - Ou use um servidor local (recomendado)

**Com Python:**
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Com Node.js (http-server):**
```bash
npx http-server
# Acesse: http://localhost:8080
```

## 🚨 Notas Importantes

### Segurança
⚠️ **Em Produção:**
- ❌ NUNCA salve senhas em texto plano
- ✅ Use hash (bcrypt, PBKDF2, etc.)
- ✅ Implemente backend com autenticação segura
- ✅ Use HTTPS
- ✅ Valide dados no servidor

### Funcionalidades Futuras
- [ ] Integração com Backend (Node.js/Flask/Django)
- [ ] Autenticação com JWT
- [ ] Banco de dados (MongoDB/PostgreSQL)
- [ ] Upload de imagens/avatares
- [ ] Sistema de mensagens diretas
- [ ] Notificações em tempo real
- [ ] Followers/Following
- [ ] Busca avançada
- [ ] Dark Mode
- [ ] Temas personalizáveis

## 📋 Validações Implementadas

### Cadastro:
- ✓ Nome com 3+ caracteres
- ✓ Email válido
- ✓ Usuário com 3+ caracteres
- ✓ Senha com 8+ caracteres, letras e números
- ✓ Confirmação de senha
- ✓ Termos aceitos
- ✓ Verificação de email/usuário duplicados

### Login:
- ✓ Email válido
- ✓ Verificação de credenciais
- ✓ Mensagens de erro claras

### Posts:
- ✓ Conteúdo não vazio
- ✓ Limite de caracteres (opcional)
- ✓ Validação de comentários

## 🐛 Troubleshooting

### Problemas Comuns

**1. Página em branco após cadastro**
- Verifique se os arquivos estão no lugar correto
- Abra o console (F12) para ver erros

**2. Dados não persistem após atualizar**
- Confirme que JavaScript está habilitado
- Verifique as permissões do localStorage

**3. Avatares não carregam**
- Verifique conexão com internet (UI Avatars requer acesso online)
- Podem usar URLs de imagem alternativos

## 📞 Suporte

Desenvolvido por **Gabriel Valomi**

Para dúvidas ou sugestões, abra uma issue no repositório.

## 📄 Licença

Este projeto é fornecido como está, para fins educacionais.

---

**Última atualização:** 16 de Maio de 2026
