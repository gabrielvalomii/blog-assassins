document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem) {
            alert('login feito com sucesso!');
            //salvar o usuário logado no localStorage
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            // Redireciona para a página principal
            window.location.href = '../principal/index.html';
        } else {
            alert('Erro: ' + (data.erro || 'Não foi possível fazer login.'));
        }
    })
    .catch(() => {
        alert('Erro ao conectar com o servidor.');
    });
});