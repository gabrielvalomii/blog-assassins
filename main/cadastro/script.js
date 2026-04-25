// Você pode adicionar lógica de validação ou envio aqui

document.querySelector('.cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarsenha = document.getElementById('confirmar-senha').value;

    //validar se as senhas conferem
    if (senha !== confirmarsenha) {
        alert('As senhas não conferem!');
        return;
    }

    fetch('http://localhost:5000/api/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem) {
            alert('Cadastro feito com sucesso!');
            // Redireciona para o login
            window.location.href = '../login/index.html';
        } else {
            alert('Erro: ' + (data.erro || 'Não foi possível fazer o cadastro.'));
        }
    })
    .catch(() => {
        alert('Erro ao conectar com o servidor.');
    });
});
