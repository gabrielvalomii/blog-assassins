// ==================== DOM Elements ====================
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    configurarEventos();
    console.log('Sistema de Login carregado!');
});

// ==================== Configurar Eventos ====================
function configurarEventos() {
    if (loginForm) {
        loginForm.addEventListener('submit', realizarLogin);
    }
}

// ==================== Login ====================
async function realizarLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
        mostrarMensagem('Por favor, preencha email e senha!', 'error');
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensagem('Por favor, insira um email válido!', 'error');
        return;
    }

    const btnLogin = document.querySelector('.btn-login');
    const textoOriginal = btnLogin.innerHTML;

    btnLogin.disabled = true;
    btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensagem(data.mensagem || 'Login realizado com sucesso!', 'success');

            if (data.usuario) {
                localStorage.setItem('current_user', JSON.stringify(data.usuario));
            }

            loginForm.reset();

            setTimeout(() => {
                window.location.href = '/principal';
            }, 1000);
        } else {
            mostrarMensagem(data.erro || 'Email ou senha inválidos.', 'error');
        }

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        mostrarMensagem('Erro ao conectar com o servidor. Tente novamente.', 'error');
    } finally {
        btnLogin.disabled = false;
        btnLogin.innerHTML = textoOriginal;
    }
}

// ==================== Validação de Email ====================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== Mostrar Mensagens ====================
function mostrarMensagem(mensagem, tipo) {
    const alertaAntigo = document.querySelector('.alert');

    if (alertaAntigo) {
        alertaAntigo.remove();
    }

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensagem;

    const primeiroGrupo = document.querySelector('.form-group');

    if (primeiroGrupo && primeiroGrupo.parentNode) {
        primeiroGrupo.parentNode.insertBefore(alerta, primeiroGrupo);
    } else {
        document.body.prepend(alerta);
    }

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

console.log('Script de Login carregado com sucesso!');