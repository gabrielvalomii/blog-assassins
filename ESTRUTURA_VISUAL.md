# 🎨 Estrutura Visual da Aplicação

## 📱 Tela de Cadastro

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  [LEFT PANEL]                      [RIGHT PANEL]                    │
│  ═════════════                      ══════════════                   │
│                                                                       │
│  📖                              Criar Conta                         │
│  Blog                            Comece sua jornada agora            │
│  Assassins                                                           │
│  Cred                            [Nome Completo      ]               │
│                                  [Email              ]               │
│  Junte-se à nossa               [Usuário @          ]               │
│  comunidade de                  [Senha ••••• 👁️    ]               │
│  desenvolvedores                [Confirmar ••••• 👁️]               │
│                                                                       │
│  ❤️  Comunidade                  ☑️ Termos de Serviço               │
│  💡 Conhecimento                                                     │
│  🚀 Crescimento                  [  CRIAR CONTA  →  ]               │
│                                                                       │
│                                  ─────── ou ───────                  │
│  💻 Gabriel Valomi               [🔍 GOOGLE LOGIN   ]               │
│                                                                       │
│                                  Já tem conta?                       │
│                                  🔐 Fazer Login                      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔐 Tela de Login

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  [LEFT PANEL]                      [RIGHT PANEL]                    │
│  ═════════════                      ══════════════                   │
│                                                                       │
│  📖                              Bem-vindo de volta!                 │
│  Blog                            Faça login em sua conta             │
│  Assassins                                                           │
│  Cred                            [Email              ]               │
│                                  [Senha ••••• 👁️    ]               │
│  Conecte-se com a               ☑️ Lembrar-me                       │
│  comunidade e                                                        │
│  compartilhe                     [  ENTRAR  →  ]                    │
│  conhecimento                                                        │
│                                  ─────── ou ───────                  │
│  ✅ Comunidade Ativa             [🔍 GOOGLE LOGIN  ]               │
│  🔄 Compartilhe Ideias                                              │
│  ⭐ Destaque Conteúdo            🔑 Redefinir Senha                 │
│                                  📝 Criar Conta                      │
│  💻 Gabriel Valomi                                                   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## 📱 Tela Principal (Home) - Desktop

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          🔍 Blog Assassins 🔔 ✉️  👤▼                           │
├──────────┬──────────────────────────────────────┬──────────────────┐
│          │                                       │                   │
│ SIDEBAR  │         FEED PRINCIPAL                │  SIDEBAR DIREITO │
│ ESQUERDO │         ═════════════════             │  ════════════════│
│          │                                       │                   │
│ [Avatar] │ ┌─────────────────────────────────┐  │ Tendências:      │
│ Gabriel  │ │ 👤 No que você está pensando? │  │ ─────────────    │
│ @gabriel │ │ [Foto] [😊] [📍] [POSTAR]      │  │ #WebDevelopment  │
│          │ └─────────────────────────────────┘  │ 1.2M posts       │
│ 1.2K     │                                       │                   │
│ Seg.     │ ┌─────────────────────────────────┐  │ #Python          │
│ 342      │ │ João Silva há 2h                 │  │ 890K posts       │
│ Seguindo │ │ "Descobri um framework..."      │  │                   │
│          │ │ [Imagem]                        │  │ #UX/UI           │
│          │ │ ❤️ 234  💬 45  🔗 12            │  │ 654K posts       │
│ [Menu]   │ │ [❤️ Curtir] [💬 Comentar]    │  │                   │
│ 🏠 Início│ │ ┌────────────────────────────┐ │  │ Sugestões:       │
│ 👤 Perfil│ │ │ Maria: Muito bom mesmo! 😊│ │  │ ─────────────   │
│ ✍️ Posts │ │ └────────────────────────────┘ │  │ 👤 Lucas M.      │
│ 💬 Com.  │ └─────────────────────────────────┘  │ Seguido por João │
│ ❤️ Fav.  │                                       │ [SEGUIR]         │
│ 🔖 Salvos│ ┌─────────────────────────────────┐  │                   │
│          │ │ Ana Paula há 5h                  │  │ 👤 Juliana      │
│ 👥 Amigos│ │ "Finalizamos o sprint inteiro!"│  │ Seguido por Maria│
│ 🔥 Tend. │ │ ❤️ 189  💬 28  🔗 8             │  │ [SEGUIR]         │
│ ⚙️ Config│ │ [❤️ Curtir] [💬 Comentar]    │  │                   │
│          │ └─────────────────────────────────┘  │ 👤 Felipe       │
│ 🚪 Sair  │                                       │ Seguido por Ana  │
│          │ ┌─────────────────────────────────┐  │ [SEGUIR]         │
│          │ │ Carlos há 8h                     │  │                   │
│          │ │ "Sempre façam backup! 😅"      │  │                   │
│          │ │ ❤️ 412  💬 67  🔗 23            │  │                   │
│          │ │ [❤️ Curtir] [💬 Comentar]    │  │                   │
│          │ └─────────────────────────────────┘  │                   │
│          │                                       │                   │
└──────────┴──────────────────────────────────────┴──────────────────┘
```

## 📱 Tela Principal - Mobile

```
┌───────────────────┐
│ [≡] Blog 🔔 ✉️ 👤│  ← Navbar
├───────────────────┤
│                   │
│ 👤 Gabriel        │  ← Perfil Card
│ @gabriel          │
│ 1.2K Seg.         │
│ [Ver Perfil]      │
│                   │
├───────────────────┤
│                   │
│ [Menu Items]      │  ← Menu (colapsável)
│ 🏠 Início         │
│ 👤 Perfil         │
│ ✍️ Posts          │
│ ...               │
│                   │
├───────────────────┤
│                   │
│ 👤 "No que você   │  ← Feed
│    está..."       │
│ [Postar]          │
│                   │
│ João Silva 2h     │
│ "Descobri um..."  │
│ [Imagem]          │
│ ❤️ 234  💬 45     │
│ [❤️] [💬]         │
│                   │
│ Ana Paula 5h      │
│ "Finalizamos..."  │
│ ❤️ 189  💬 28     │
│ [❤️] [💬]         │
│                   │
└───────────────────┘
```

## 🔄 Fluxo de Navegação

```
                    ┌─────────────────────────────────┐
                    │                                   │
                    │    PÁGINA INICIAL                │
                    │                                   │
                    └────────────┬───────────────────────┘
                                 │
                    ┌────────────┴─────────────┐
                    │                          │
              "Criar Conta"              "Fazer Login"
                    │                          │
                    ▼                          ▼
           ┌──────────────────┐      ┌──────────────────┐
           │                  │      │                  │
           │   CADASTRO       │      │      LOGIN       │
           │   ═════════      │      │      ══════      │
           │                  │      │                  │
           │ • Nome           │      │ • Email          │
           │ • Email          │      │ • Senha          │
           │ • Usuário        │      │ • Lembrar        │
           │ • Senha          │      │                  │
           │ • Confirmar      │      └────────┬─────────┘
           │ • Termos         │               │
           │                  │               │
           └────────┬─────────┘               │
                    │                         │
                    └────────────┬────────────┘
                                 │
                       ✅ Autenticado ✅
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │                          │
                    │      HOME/FEED           │
                    │      ═════════════       │
                    │                          │
                    │ • Ver Posts              │
                    │ • Criar Posts            │
                    │ • Curtir/Comentar        │
                    │ • Ver Perfil             │
                    │ • Seguir Pessoas         │
                    │ • Sair                   │
                    │                          │
                    └──────────────────────────┘
                                 │
                            [SAIR]
                                 │
                                 ▼
                    Volta para tela de Login
```

## 💾 Estrutura de Dados (LocalStorage)

```
{
  "current_user": {
    "id": 1234567890,
    "nome": "Gabriel Valomi",
    "email": "gabriel@example.com",
    "avatar": "https://...",
    "handle": "@gabriel"
  },
  
  "usuarios": [
    {
      "id": 1234567890,
      "nome": "Gabriel Valomi",
      "email": "gabriel@example.com",
      "handle": "@gabriel",
      "avatar": "https://...",
      "dataCriacao": "16/05/2026 10:30:45",
      "seguidores": 0,
      "seguindo": 0
    },
    {...}
  ],
  
  "blog_posts": [
    {
      "id": 9876543210,
      "autor": "Gabriel Valomi",
      "handle": "@gabriel",
      "avatar": "https://...",
      "conteudo": "Olá mundo!",
      "imagem": null,
      "data": "16/05/2026 11:00:00",
      "curtidas": 5,
      "comentarios": [
        {
          "id": 111,
          "autor": "João",
          "avatar": "https://...",
          "conteudo": "Ótimo!",
          "data": "agora"
        }
      ],
      "compartilhamentos": 2,
      "curtidoPorUsuario": false
    },
    {...}
  ],
  
  "remember_email": "gabriel@example.com"
}
```

## 🎨 Paleta de Cores Usada

```
┌─────────────────────────────────────────────────────┐
│                 CORES PRINCIPAIS                     │
├─────────────────────────────────────────────────────┤
│ 🔵 Primária (Login)  : #1DA1F2 - Azul Twitter      │
│ 🟢 Secundária (Cad.) : #17BF63 - Verde Sucesso     │
│ ⚫ Secundária (Text) : #14171A - Cinza Escuro      │
│ ⚪ Fundo             : #FFFFFF - Branco            │
│ 🩶 Fundo Alt         : #F7F9FA - Cinza Clarísimo  │
│ 🔴 Erro              : #F41F3D - Vermelho          │
│ 🟡 Aviso             : #FFAD1F - Amarelo           │
└─────────────────────────────────────────────────────┘
```

---

**Visualização criada com ❤️ para melhor compreensão do projeto**
