const url = "https://botafogo-atletas.mange.li";
let playerNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

const pegar_coisas = async (endpoint) => {
    const resposta = await fetch(`${url}/${endpoint}`);
    const dados = await resposta.json();
    return dados;
}

const preenche = (atleta) => {
    const container = document.createElement('div');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    container.className = atleta.elenco === 'feminino' ? 'card-feminino' : 'card-masculino';
    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    // Adiciona um evento de clique ao container do card
    container.addEventListener('click', () => {
        console.log("Número do jogador:", atleta.id);
        redirecionarParaDetalhes(atleta.id);
    });

    container.appendChild(titulo);
    container.appendChild(imagem);

    document.getElementById('jogadores').appendChild(container);
}

const limparJogadores = () => {
    const containerJogadores = document.getElementById('jogadores');
    containerJogadores.innerHTML = '';
}

const buscarEExibirJogadores = async (endpoint) => {
    try {
        const data = await pegar_coisas(endpoint);
        data.forEach((atleta) => {
            preenche(atleta);
        });
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

const filtrarPorGenero = async (genero) => {
    // Limpa os jogadores exibidos atualmente
    limparJogadores();

    let endpoint;
    if (genero === 'Feminino') {
        endpoint = 'feminino';
    } else {
        endpoint = 'masculino';
    }

    // Chama a função para buscar e exibir jogadores com base no novo filtro
    buscarEExibirJogadores(endpoint);
}

const redirecionarParaDetalhes = (numeroJogador) => {
    // Redireciona para a página de detalhes com o número do jogador na URL
    window.location.href = `detalhes.html?jogador=${numeroJogador}`;
    console.log(`Redirecionar para detalhes do jogador ${numeroJogador}`);
}

const verTodosJogadores = () => {
    // Limpa os jogadores exibidos atualmente
    limparJogadores();

    // Chama a função para buscar e exibir todos os jogadores
    buscarEExibirJogadores('all');
}



