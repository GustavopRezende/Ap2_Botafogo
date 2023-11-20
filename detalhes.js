document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const numeroJogador = urlParams.get('jogador');

    const pegarDetalhesJogador = async (numero) => {
        try {
            // Converte o número do jogador para um inteiro
            const numeroInteiro = parseInt(numero, 10);

            if (isNaN(numeroInteiro)) {
                throw new Error(`Número do jogador não é um inteiro válido.`);
            }

            const resposta = await fetch(`https://botafogo-atletas.mange.li/${numeroInteiro}`);

            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
            }

            const dados = await resposta.json();

            if (!dados || Object.keys(dados).length === 0) {
                throw new Error(`Dados do jogador ${numeroInteiro} não encontrados`);
            }

            return dados;
        } catch (error) {
            console.error(`Erro ao obter detalhes do jogador ${numeroJogador}:`, error);
            // Adicione um redirecionamento para uma página de erro se necessário
        }
    };

    const exibirDetalhes = (detalhes) => {
        if (detalhes) {
            document.getElementById('nome-jogador').innerText = detalhes.nome;
            document.getElementById('imagem-jogador').src = detalhes.imagem;
            document.getElementById('descricao-jogador').innerText = detalhes.descricao;
        } else {
            console.error(`Dados do jogador ${numeroJogador} não disponíveis.`);
            // Adicione um redirecionamento para uma página de erro se necessário
        }
    };

    if (numeroJogador) {
        pegarDetalhesJogador(numeroJogador)
            .then(exibirDetalhes)
            .catch((error) => {
                console.error(`Erro ao exibir detalhes do jogador ${numeroJogador}:`, error);
            });
    } else {
        console.error('Número do jogador não fornecido na URL.');
        // Adicione um redirecionamento para uma página de erro se necessário
    }
});
