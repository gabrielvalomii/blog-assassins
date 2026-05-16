// ==================== DOM Elements ====================
const postInput = document.querySelector('.post-input');
const postBtn = document.querySelector('.btn-post-primary');
const feedContainer = document.querySelector('.feed-container');
const menuItems = document.querySelectorAll('.menu-item');
const actionButtons = document.querySelectorAll('.action-btn');
const logoutBtn = document.querySelector('.btn-logout');

// ==================== Local Storage ====================
const STORAGE_KEY = 'blog_posts';
const USER_KEY = 'current_user';

// Dados de usuário padrão (simulado)
const defaultUser = {
    id: 1,
    nome: 'Gabriel Valomi',
    email: 'gabriel@example.com',
    avatar: 'https://via.placeholder.com/64',
    handle: '@gabriel_dev'
};

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();
    carregarPosts();
    configurarEventos();
});

// ==================== Autenticação ====================
function verificarAutenticacao() {
    const usuarioLogado = localStorage.getItem(USER_KEY);
    if (!usuarioLogado) {
        // Redirecionar para login se não estiver autenticado
        // window.location.href = 'login/login.html';
        // Por enquanto, vamos usar o usuário padrão
        localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
    }
}

function fazerLogout() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = 'login/login.html';
}

// ==================== Configurar Eventos ====================
function configurarEventos() {
    // Botão de postar
    if (postBtn) {
        postBtn.addEventListener('click', criarPost);
    }

    // Enter no input de post
    if (postInput) {
        postInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                criarPost();
            }
        });
    }

    // Menu items
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', fazerLogout);
    }
}

// ==================== Posts ====================
function criarPost() {
    const conteudo = postInput.value.trim();
    
    if (conteudo === '') {
        alert('Por favor, escreva algo antes de postar!');
        return;
    }

    const usuario = JSON.parse(localStorage.getItem(USER_KEY)) || defaultUser;
    
    const novoPost = {
        id: Date.now(),
        autor: usuario.nome,
        handle: usuario.handle,
        avatar: usuario.avatar,
        conteudo: conteudo,
        imagem: null,
        data: new Date().toLocaleString('pt-BR'),
        curtidas: 0,
        comentarios: [],
        compartilhamentos: 0,
        curtidoPorUsuario: false
    };

    // Salvar no localStorage
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    posts.unshift(novoPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // Limpar input
    postInput.value = '';

    // Recarregar posts
    carregarPosts();

    // Mostrar mensagem de sucesso
    mostrarNotificacao('Post publicado com sucesso! 🎉');
}

function carregarPosts() {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Remover posts anteriores (manter apenas o create-post)
    const postElements = document.querySelectorAll('article.post');
    postElements.forEach(el => el.remove());

    // Se não há posts salvos, usar posts de exemplo
    if (posts.length === 0) {
        carregarPostsPadrao();
        return;
    }

    // Renderizar posts do localStorage
    posts.forEach(post => {
        const postElement = criarElementoPost(post);
        feedContainer.appendChild(postElement);
    });
}

function carregarPostsPadrao() {
    const postsPadrao = [
        {
            id: 1,
            autor: 'João Silva',
            handle: '@joao_silva',
            avatar: 'https://via.placeholder.com/48',
            conteudo: 'Acabei de descobrir um framework incrível para desenvolvimento! Recomendo muito para quem quer iniciar em web development. 🚀',
            imagem: 'https://via.placeholder.com/500x300',
            data: 'há 2 horas',
            curtidas: 234,
            comentarios: [
                {
                    id: 1,
                    autor: 'Maria Santos',
                    avatar: 'https://via.placeholder.com/32',
                    conteudo: 'Muito bom mesmo! Estou aprendendo também! 😊',
                    data: 'há 1 hora'
                },
                {
                    id: 2,
                    autor: 'Pedro Costa',
                    avatar: 'https://via.placeholder.com/32',
                    conteudo: 'Qual framework você está usando? Quer dizer qual é a recomendação?',
                    data: 'há 30 min'
                }
            ],
            compartilhamentos: 12,
            curtidoPorUsuario: false
        },
        {
            id: 2,
            autor: 'Ana Paula',
            handle: '@ana_paula',
            avatar: 'https://via.placeholder.com/48',
            conteudo: 'Que dia incrível no projeto! Conseguimos finalizar o sprint inteiro. Parabéns ao time! 🎉',
            imagem: null,
            data: 'há 5 horas',
            curtidas: 189,
            comentarios: [],
            compartilhamentos: 8,
            curtidoPorUsuario: false
        },
        {
            id: 3,
            autor: 'Carlos Mendes',
            handle: '@carlos_mendes',
            avatar: 'https://via.placeholder.com/48',
            conteudo: 'Dica do dia: Sempre faça backup de seus projetos! Aprendi da forma difícil hoje 😅',
            imagem: null,
            data: 'há 8 horas',
            curtidas: 412,
            comentarios: [],
            compartilhamentos: 23,
            curtidoPorUsuario: false
        }
    ];

    postsPadrao.forEach(post => {
        const postElement = criarElementoPost(post);
        feedContainer.appendChild(postElement);
    });

    // Salvar posts padrão
    localStorage.setItem(STORAGE_KEY, JSON.stringify(postsPadrao));
}

function criarElementoPost(post) {
    const postDiv = document.createElement('article');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;

    let comentariosHTML = '';
    if (post.comentarios && post.comentarios.length > 0) {
        comentariosHTML = post.comentarios.map(comentario => `
            <div class="comment">
                <img src="${comentario.avatar}" alt="Avatar" class="avatar-comment">
                <div class="comment-content">
                    <div class="comment-header">
                        <strong>${comentario.autor}</strong>
                        <span class="comment-time">${comentario.data}</span>
                    </div>
                    <p>${comentario.conteudo}</p>
                    <div class="comment-actions">
                        <button>Curtir</button>
                        <button>Responder</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const imagemHTML = post.imagem ? `<img src="${post.imagem}" alt="Post image" class="post-image">` : '';
    const classCurtida = post.curtidoPorUsuario ? 'fa-solid' : 'far';

    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <img src="${post.avatar}" alt="Avatar" class="avatar-post">
                <div>
                    <h4>${post.autor}</h4>
                    <span class="post-time">${post.data}</span>
                </div>
            </div>
            <button class="post-menu-btn">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>

        <div class="post-content">
            <p>${post.conteudo}</p>
            ${imagemHTML}
        </div>

        <div class="post-stats">
            <span><i class="fas fa-heart"></i> ${post.curtidas} curtidas</span>
            <span><i class="fas fa-comment"></i> ${post.comentarios ? post.comentarios.length : 0} comentários</span>
            <span><i class="fas fa-share"></i> ${post.compartilhamentos} compartilhamentos</span>
        </div>

        <div class="post-actions">
            <button class="action-btn curtir-btn" data-post-id="${post.id}">
                <i class="${classCurtida} fa-heart"></i> Curtir
            </button>
            <button class="action-btn comentar-btn" data-post-id="${post.id}">
                <i class="far fa-comment"></i> Comentar
            </button>
            <button class="action-btn compartilhar-btn" data-post-id="${post.id}">
                <i class="far fa-share"></i> Compartilhar
            </button>
        </div>

        ${comentariosHTML ? `<div class="post-comments">${comentariosHTML}</div>` : ''}
    `;

    // Adicionar eventos
    const curtirBtn = postDiv.querySelector('.curtir-btn');
    const comentarBtn = postDiv.querySelector('.comentar-btn');
    const compartilharBtn = postDiv.querySelector('.compartilhar-btn');

    curtirBtn.addEventListener('click', () => alternarCurtida(post.id));
    comentarBtn.addEventListener('click', () => mostrarCaixaComentario(post.id));
    compartilharBtn.addEventListener('click', () => compartilharPost(post.id));

    return postDiv;
}

function alternarCurtida(postId) {
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        if (post.curtidoPorUsuario) {
            post.curtidas--;
        } else {
            post.curtidas++;
        }
        post.curtidoPorUsuario = !post.curtidoPorUsuario;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        carregarPosts();
        mostrarNotificacao(post.curtidoPorUsuario ? 'Curtido! ❤️' : 'Curtida removida');
    }
}

function mostrarCaixaComentario(postId) {
    const comentario = prompt('Escreva seu comentário:');
    if (comentario && comentario.trim() !== '') {
        let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const post = posts.find(p => p.id === postId);

        if (post) {
            if (!post.comentarios) {
                post.comentarios = [];
            }

            const usuario = JSON.parse(localStorage.getItem(USER_KEY)) || defaultUser;

            post.comentarios.push({
                id: Date.now(),
                autor: usuario.nome,
                avatar: usuario.avatar,
                conteudo: comentario,
                data: 'agora'
            });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
            carregarPosts();
            mostrarNotificacao('Comentário adicionado! 💬');
        }
    }
}

function compartilharPost(postId) {
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        post.compartilhamentos++;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        carregarPosts();
        mostrarNotificacao('Post compartilhado! 🔗');
    }
}

// ==================== Notificações ====================
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #17BF63;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notificacao.textContent = mensagem;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

// ==================== Utilidades ====================
console.log('Script carregado com sucesso! 🚀');
