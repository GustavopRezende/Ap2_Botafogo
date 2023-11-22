document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const numeroJogador = urlParams.get('jogador');

    const fetchPlayerDetails = async (numero) => {
        try {
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
            // Handle error or redirect to an error page if necessary
            throw error;
        }
    };

    const displayPlayerDetails = (detalhes) => {
        if (detalhes) {
            const elementIds = {
                elenco: 'elenco',
                nome: 'nome-jogador',
                posicao: 'posicao-jogador',
                imagem: 'imagem-jogador',
                descricao: 'descricao-jogador',
                nome_completo: 'nome-completo-jogador',
                nascimento: 'nascimento-jogador',
                altura: 'altura-jogador'
            };

            Object.keys(elementIds).forEach(key => {
                const element = document.getElementById(elementIds[key]);
                if (element) {
                    if (key === 'nascimento') {
                        const [dataNascimento, localNascimento] = detalhes[key].split(', ');
                        element.innerText = `Data de Nascimento: ${dataNascimento}\nLocal de Nascimento: ${localNascimento}`;
                    } else {
                        element.innerText = detalhes[key];
                        if (key === 'imagem') {
                            element.src = detalhes[key];
                        }
                    }
                }
            });
        } else {
            console.error(`Dados do jogador ${numeroJogador} não disponíveis.`);
            // Handle error or redirect to an error page if necessary
        }
    };

    if (numeroJogador) {
        fetchPlayerDetails(numeroJogador)
            .then(displayPlayerDetails)
            .catch((error) => {
                console.error(`Erro ao exibir detalhes do jogador ${numeroJogador}:`, error);
            });
    } else {
        console.error('Número do jogador não fornecido na URL.');
        // Handle error or redirect to an error page if necessary
    }
});
