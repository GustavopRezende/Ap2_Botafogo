// Aguarde até que o DOM (Document Object Model) esteja totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Obtenha os parâmetros da URL, especificamente o número do jogador
    const urlParams = new URLSearchParams(window.location.search);
    const numeroJogador = urlParams.get('jogador');

    // Função assíncrona para obter detalhes do jogador a partir do servidor
    const fetchPlayerDetails = async (numero) => {
        try {
            // Converta o número do jogador para um inteiro
            const numeroInteiro = parseInt(numero, 10);

            // Verifique se o número do jogador é um inteiro válido
            if (isNaN(numeroInteiro)) {
                throw new Error(`Número do jogador não é um inteiro válido.`);
            }

            // Faça uma requisição assíncrona para obter os detalhes do jogador do servidor
            const resposta = await fetch(`https://botafogo-atletas.mange.li/${numeroInteiro}`);

            // Verifique se a resposta da requisição é bem-sucedida (código de status 2xx)
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
            }

            // Parseie a resposta JSON obtida do servidor
            const dados = await resposta.json();

            // Verifique se os dados do jogador foram encontrados
            if (!dados || Object.keys(dados).length === 0) {
                throw new Error(`Dados do jogador ${numeroInteiro} não encontrados`);
            }

            // Retorne os detalhes do jogador
            return dados;
        } catch (error) {
            // Em caso de erro, registre no console, exiba uma mensagem de erro e propague o erro
            console.error(`Erro ao obter detalhes do jogador ${numeroJogador}:`, error);
            exibirErro(`Erro ao obter detalhes do jogador: ${error.message}`);
            throw error;
        }
    };

    // Função para exibir detalhes do jogador na página
    const displayPlayerDetails = (detalhes) => {
        if (detalhes) {
            // Mapeie os IDs dos elementos HTML aos dados do jogador e atualize o conteúdo
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

            // Itere sobre os elementos e atualize seus conteúdos
            Object.keys(elementIds).forEach(key => {
                const element = document.getElementById(elementIds[key]);
                if (element) {
                    if (key === 'nascimento') {
                        // Se a chave for 'nascimento', divida e formate a data de nascimento
                        const [dataNascimento, localNascimento] = detalhes[key].split(', ');
                        element.innerText = `Data de Nascimento: ${dataNascimento}\nLocal de Nascimento: ${localNascimento}`;
                    } else {
                        // Atualize o conteúdo do elemento com os dados do jogador
                        element.innerText = detalhes[key];
                        // Se a chave for 'imagem', atualize o atributo 'src' com a URL da imagem
                        if (key === 'imagem') {
                            element.src = detalhes[key];
                        }
                    }
                }
            });
        } else {
            // Em caso de dados não disponíveis, registre no console, exiba uma mensagem de erro
            console.error(`Dados do jogador ${numeroJogador} não disponíveis.`);
            exibirErro(`Dados do jogador não disponíveis.`);
        }
    };

    // Função para exibir mensagens de erro na página
    const exibirErro = (mensagem) => {
        const elementoErro = document.getElementById('erro-jogador');
        if (elementoErro) {
            // Atualize o conteúdo do elemento de erro com a mensagem
            elementoErro.innerText = mensagem;
        }
    };

    // Verifique se o número do jogador está presente na URL
    if (numeroJogador) {
        // Se o número do jogador estiver presente, faça a chamada para obter detalhes e exibir na página
        fetchPlayerDetails(numeroJogador)
            .then(displayPlayerDetails)
            .catch((error) => {
                // Em caso de erro ao exibir detalhes, registre no console
                console.error(`Erro ao exibir detalhes do jogador ${numeroJogador}:`, error);
            });
    } else {
        // Se o número do jogador não estiver presente, registre no console e exiba uma mensagem de erro
        console.error('Número do jogador não fornecido na URL.');
        exibirErro('Número do jogador não fornecido na URL.');
    }
});
