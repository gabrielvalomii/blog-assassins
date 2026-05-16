// ==================== DOM Elements ====================
const cadastroForm = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmar-senha');
const togglePasswordBtn = document.getElementById('togglePassword');
const togglePasswordConfirmBtn = document.getElementById('togglePasswordConfirm');
const termosCheckbox = document.getElementById('termos');
const googleCadastroBtn = document.getElementById('googleCadastro');

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    configurarEventos();
    console.log('Cadastro script carregado! 🚀');
});

// ==================== Configurar Eventos ====================
function configurarEventos() {
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', realizarCadastro);
    }

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => alternarVisibilidadeSenha(senhaInput, togglePasswordBtn));
    }

    if (togglePasswordConfirmBtn) {
        togglePasswordConfirmBtn.addEventListener('click', () => alternarVisibilidadeSenha(confirmarSenhaInput, togglePasswordConfirmBtn));
    }

    if (usuarioInput) {
        usuarioInput.addEventListener('input', (e) => {
            let valor = e.target.value;
            if (!valor.startsWith('@')) {
                e.target.value = '@' + valor.replace(/^@/, '');
            }
        });
    }

    if (googleCadastroBtn) {
        googleCadastroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cadastroGoogle();
        });
    }
}

// ==================== Cadastro ====================
function realizarCadastro(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmarSenha = confirmarSenhaInput.value.trim();

    // Validações
    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
        mostrarNotificacao('Por favor, preencha todos os campos!', 'erro');
        return;
    }

    if (nome.length < 3) {
        mostrarNotificacao('Nome deve ter pelo menos 3 caracteres!', 'erro');
        return;
    }

    if (!validarEmail(email)) {
        mostrarNotificacao('Por favor, insira um email válido!', 'erro');
        return;
    }

    if (usuario.length < 3) {
        mostrarNotificacao('Usuário deve ter pelo menos 3 caracteres!', 'erro');
        return;
    }

    if (senha.length < 8) {
        mostrarNotificacao('Senha deve ter pelo menos 8 caracteres!', 'erro');
        return;
    }

    if (!/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
        mostrarNotificacao('Senha deve conter letras e números!', 'erro');
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarNotificacao('As senhas não correspondem!', 'erro');
        return;
    }

    if (!termosCheckbox.checked) {
        mostrarNotificacao('Você deve concordar com os termos de serviço!', 'erro');
        return;
    }

    // Verificar se o email já existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.email === email)) {
        mostrarNotificacao('Este email já está registrado!', 'erro');
        return;
    }

    if (usuarios.some(u => u.handle === usuario)) {
        mostrarNotificacao('Este usuário já está registrado!', 'erro');
        return;
    }

    // Criar novo usuário
    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        handle: usuario,
        senha: senha, // Em produção, NUNCA salve a senha em texto plano!
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=random`,
        dataCriacao: new Date().toLocaleString('pt-BR'),
        seguidores: 0,
        seguindo: 0
    };

    // Salvar no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Salvar usuário logado
    localStorage.setItem('current_user', JSON.stringify({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        avatar: novoUsuario.avatar,
        handle: novoUsuario.handle
    }));

    mostrarNotificacao('Cadastro realizado com sucesso! 🎉', 'sucesso');

    // Redirecionar para a página principal
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function alternarVisibilidadeSenha(input, btn) {
    const tipo = input.type === 'password' ? 'text' : 'password';
    input.type = tipo;

    const icon = btn.querySelector('i');
    if (tipo === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

function cadastroGoogle() {
    mostrarNotificacao('Google Sign-up será integrado em breve! 🔜', 'info');
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

console.log('✅ Script de Cadastro carregado com sucesso!');
