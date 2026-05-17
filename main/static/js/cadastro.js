// ==================== DOM Elements ====================
const cadastroForm = document.getElementById('loginForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    configurarEventos();
    console.log('✅ Sistema de cadastro carregado!');
});

// ==================== Configurar Eventos ====================
function configurarEventos() {
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', realizarCadastro);
    }
}

// ==================== Cadastro ====================
async function realizarCadastro(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Validações básicas
    if (!nome || !email || !senha) {
        mostrarMensagem('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (nome.length < 3) {
        mostrarMensagem('O nome deve ter pelo menos 3 caracteres!', 'error');
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensagem('Por favor, insira um email válido!', 'error');
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }

    // Desabilitar botão durante o envio
    const btnCadastro = document.querySelector('.btn-login');
    const textoOriginal = btnCadastro.innerHTML;
    btnCadastro.disabled = true;
    btnCadastro.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';

    try {
        // Enviar para o backend Flask
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        });

        const data = await response.json();

        if (data.success) {
            mostrarMensagem('✅ ' + data.message, 'success');
            
            // Salvar usuário no localStorage
            if (data.usuario) {
                localStorage.setItem('current_user', JSON.stringify(data.usuario));
            }

            // Limpar formulário
            cadastroForm.reset();

            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            mostrarMensagem('❌ ' + data.message, 'error');
        }

    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        mostrarMensagem('❌ Erro ao conectar com o servidor. Tente novamente.', 'error');
    } finally {
        // Reabilitar botão
        btnCadastro.disabled = false;
        btnCadastro.innerHTML = textoOriginal;
    }
}

// ==================== Validação de Email ====================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== Mostrar Mensagens ====================
function mostrarMensagem(mensagem, tipo) {
    // Remover mensagem anterior se existir
    const alertaAntigo = document.querySelector('.alert');
    if (alertaAntigo) {
        alertaAntigo.remove();
    }

    // Criar nova mensagem
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensagem;

    // Inserir antes do primeiro form-group
    const primeiroGrupo = document.querySelector('.form-group');
    primeiroGrupo.parentNode.insertBefore(alerta, primeiroGrupo);

    // Remover após 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

console.log('✅ Script de cadastro carregado com sucesso!');