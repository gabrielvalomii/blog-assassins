// ==================== DOM Elements ====================
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const togglePasswordBtn = document.getElementById('togglePassword');
const forgotPasswordLink = document.getElementById('forgotPassword');
const googleLoginBtn = document.getElementById('googleLogin');
const lembrarCheckbox = document.getElementById('lembrar');

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    carregarCreditenciais();
    configurarEventos();
    console.log('Login script carregado! 🚀');
});

// ==================== Configurar Eventos ====================
function configurarEventos() {
    if (loginForm) {
        loginForm.addEventListener('submit', realizarLogin);
    }

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', alternarVisibilidadeSenha);
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            redefinirSenha();
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginGoogle();
        });
    }
}

// ==================== Autenticação ====================
function realizarLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Validação básica
    if (!email || !senha) {
        mostrarNotificacao('Por favor, preencha todos os campos!', 'erro');
        return;
    }

    if (!validarEmail(email)) {
        mostrarNotificacao('Por favor, insira um email válido!', 'erro');
        return;
    }

    // Aqui você faria a chamada para o backend
    // Por enquanto, vamos simular o login
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuarioEncontrado) {
        // Salvar usuário logado
        localStorage.setItem('current_user', JSON.stringify({
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            avatar: usuarioEncontrado.avatar || 'https://via.placeholder.com/64',
            handle: usuarioEncontrado.handle || '@usuario'
        }));

        if (lembrarCheckbox.checked) {
            localStorage.setItem('remember_email', email);
        }

        mostrarNotificacao('Login realizado com sucesso! ✅', 'sucesso');
        
        // Redirecionar para a página principal
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } else {
        mostrarNotificacao('Email ou senha inválidos!', 'erro');
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function alternarVisibilidadeSenha() {
    const tipo = senhaInput.type === 'password' ? 'text' : 'password';
    senhaInput.type = tipo;

    const icon = togglePasswordBtn.querySelector('i');
    if (tipo === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

function carregarCreditenciais() {
    const emailSalvo = localStorage.getItem('remember_email');
    if (emailSalvo) {
        emailInput.value = emailSalvo;
        lembrarCheckbox.checked = true;
    }
}

function redefinirSenha() {
    const email = prompt('Insira seu email para redefinir a senha:');
    if (email) {
        if (validarEmail(email)) {
            mostrarNotificacao(`Email de redefinição enviado para ${email}! 📧`, 'sucesso');
            // Aqui você enviaria uma requisição para o backend
        } else {
            mostrarNotificacao('Por favor, insira um email válido!', 'erro');
        }
    }
}

function loginGoogle() {
    mostrarNotificacao('Google Login será integrado em breve! 🔜', 'info');
    // Aqui você integraria com a API do Google
}

// ==================== Notificações ====================
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    
    const cores = {
        sucesso: '#17BF63',
        erro: '#F41F3D',
        info: '#1DA1F2'
    };

    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${cores[tipo]};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
        font-size: 14px;
        font-weight: 500;
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
    if (!document.head.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 4000);
}

console.log('✅ Script de Login carregado com sucesso!');