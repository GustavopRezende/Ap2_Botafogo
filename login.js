function logar() {
    try {
        // Obter o valor da senha do elemento com o id 'senha'
        const senha = document.getElementById('senha').value;

        // Definir o token e hash de comparação
        const token = "um_token";
        const hash = 'e8d95a51f3af4a3b134bf6bb680a213a';

        // Verificar se a senha está vazia
        if (!senha) {
            throw new Error('Por favor, insira sua senha.');
        }

        // Calcular o hash da senha usando a função hex_md5 (ou qualquer função de hash desejada)
        const senhaHash = hex_md5(senha);

        // Verificar se o hash da senha é igual ao hash predefinido
        if (senhaHash === hash) {
            // Se a senha estiver correta, exibir mensagem de sucesso
            alert('BEM VINDO!');

            // Armazenar o token na sessionStorage
            sessionStorage.setItem('token', token);

            // Redirecionar para a página 'jogadores.html'
            location.href = "jogadores.html";
        } else {
            // Se a senha estiver incorreta, exibir mensagem de erro
            alert('Senha incorreta!');
        }
    } catch (error) {
        // Exibir mensagens de erro de forma mais amigável para o usuário
        alert('Ocorreu um erro: ' + error.message);
    }
}

function apagarToken() {
    try {
        // Remover o token da sessionStorage
        sessionStorage.removeItem('token');
        alert('Token removido com sucesso.');
    } catch (error) {
        // Lidar com erros ao remover o token
        alert('Ocorreu um erro ao remover o token: ' + error.message);
    }
}
