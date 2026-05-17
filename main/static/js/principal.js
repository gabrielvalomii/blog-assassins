// ==================== VARIÁVEIS GLOBAIS ====================
let currentUser = null;
let posts = [];
let recentComments = [];

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema Home carregado!');
    
    // Verificar autenticação
    verificarAutenticacao();
    
    // Configurar eventos
    configurarEventos();
    
    // Carregar dados
    carregarDadosUsuario();
    carregarPosts();
    carregarComentariosRecentes();
});

// ==================== VERIFICAR AUTENTICAÇÃO ====================
function verificarAutenticacao() {
    const usuario = localStorage.getItem('current_user');
    
    if (!usuario) {
        // Se não estiver logado, redireciona para login
        alert('Você precisa fazer login primeiro!');
        window.location.href = '/login';
        return;
    }
    
    try {
        currentUser = JSON.parse(usuario);
        console.log('✅ Usuário autenticado:', currentUser);
    } catch (error) {
        console.error('Erro ao parsear usuário:', error);
        localStorage.removeItem('current_user');
        window.location.href = '/login';
    }
}

// ==================== CONFIGURAR EVENTOS ====================
function configurarEventos() {
    // Botão de publicar post
    const btnPublish = document.getElementById('btnPublish');
    if (btnPublish) {
        btnPublish.addEventListener('click', publicarPost);
    }
    
    // Botão de logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', realizarLogout);
    }
    
    // Enter no textarea para publicar (Ctrl+Enter)
    const postContent = document.getElementById('postContent');
    if (postContent) {
        postContent.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                publicarPost();
            }
        });
    }
}

// ==================== CARREGAR DADOS DO USUÁRIO ====================
function carregarDadosUsuario() {
    if (!currentUser) return;
    
    // Atualizar informações na navbar
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = currentUser.nome || 'Usuário';
    }
    
    // Atualizar informações no perfil
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (profileName) {
        profileName.textContent = currentUser.nome || 'Nome do Usuário';
    }
    
    if (profileEmail) {
        profileEmail.textContent = currentUser.email || 'email@exemplo.com';
    }
    
    if (userAvatar) {
        // Pega a primeira letra do nome
        const inicial = (currentUser.nome || 'U').charAt(0).toUpperCase();
        userAvatar.innerHTML = inicial;
    }
    
    // Atualizar estatísticas
    atualizarEstatisticas();
}

// ==================== ATUALIZAR ESTATÍSTICAS ====================
async function atualizarEstatisticas() {
    // Aqui você pode fazer requisições ao backend para buscar os números reais
    // Por enquanto, vamos calcular localmente
    
    const totalPosts = document.getElementById('totalPosts');
    const totalComments = document.getElementById('totalComments');
    
    if (totalPosts) {
        const userPosts = posts.filter(p => p.autor_id === currentUser.id);
        totalPosts.textContent = userPosts.length;
    }
    
    if (totalComments) {
        // Você pode buscar do backend
        totalComments.textContent = '0';
    }
}

// ==================== PUBLICAR POST ====================
async function publicarPost() {
    const titulo = document.getElementById('postTitle').value.trim();
    const conteudo = document.getElementById('postContent').value.trim();
    
    // Validações
    if (!titulo) {
        mostrarAlerta('Por favor, insira um título!', 'error');
        return;
    }
    
    if (!conteudo) {
        mostrarAlerta('Por favor, escreva algo no post!', 'error');
        return;
    }
    
    if (conteudo.length < 10) {
        mostrarAlerta('O conteúdo deve ter pelo menos 10 caracteres!', 'error');
        return;
    }
    
    // Desabilitar botão
    const btnPublish = document.getElementById('btnPublish');
    const textoOriginal = btnPublish.innerHTML;
    btnPublish.disabled = true;
    btnPublish.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
    
    try {
        const response = await fetch('/api/postagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                conteudo: conteudo,
                autor_id: currentUser.id
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarAlerta('✅ Post publicado com sucesso!', 'success');
            
            // Limpar campos
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
            
            // Recarregar posts
            setTimeout(() => {
                carregarPosts();
            }, 500);
        } else {
            mostrarAlerta('❌ ' + (data.erro || 'Erro ao publicar post'), 'error');
        }
        
    } catch (error) {
        console.error('Erro ao publicar post:', error);
        mostrarAlerta('❌ Erro ao conectar com o servidor', 'error');
    } finally {
        btnPublish.disabled = false;
        btnPublish.innerHTML = textoOriginal;
    }
}

// ==================== CARREGAR POSTS ====================
async function carregarPosts() {
    try {
        const response = await fetch('/api/postagens');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar posts');
        }
        
        const data = await response.json();
        posts = data.postagens || [];
        
        renderizarPosts();
        atualizarEstatisticas();
        
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        const postsList = document.getElementById('postsList');
        if (postsList) {
            postsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #718096;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Erro ao carregar posts. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
}

// ==================== RENDERIZAR POSTS ====================
function renderizarPosts() {
    const postsList = document.getElementById('postsList');
    
    if (!postsList) return;
    
    if (posts.length === 0) {
        postsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #718096;">
                <i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Nenhum post ainda</h3>
                <p>Seja o primeiro a compartilhar algo!</p>
            </div>
        `;
        return;
    }
    
    // Ordenar posts por data (mais recente primeiro)
    posts.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
    
    postsList.innerHTML = posts.map(post => criarCardPost(post)).join('');
}

// ==================== CRIAR CARD DE POST ====================