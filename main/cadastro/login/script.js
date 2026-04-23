document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem) {
            alert('login feito com sucesso!');
        } else {
            alert('Erro: ' + (data.erro || 'Não foi possível fazer login.'));
        }
    })
    .catch(() => {
        alert('Erro ao conectar com o servidor.');
    });
});