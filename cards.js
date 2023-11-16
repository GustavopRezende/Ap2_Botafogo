// cards.js

const jogadoresContainer = document.getElementById('jogadores-container');

const preenche = (atleta, genero) => {
    const container = document.createElement('div');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    container.classList.add('container', genero); // Adiciona classe de gênero

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    container.appendChild(titulo);
    container.appendChild(imagem);

    return container;
}

const criarNovaLinha = () => {
    const novaLinha = document.createElement('div');
    novaLinha.classList.add('linha-jogadores');
    jogadoresContainer.appendChild(novaLinha);
    return novaLinha;
}

const pegarCoisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const mostrarJogadoresPorGenero = async (genero) => {
    let inicio, fim;

    if (genero === 'masculino') {
        inicio = 1;
        fim = 26;
    } else if (genero === 'feminino') {
        inicio = 27;
        fim = 60;
    } else {
        return; // Gênero inválido
    }

    jogadoresContainer.innerHTML = ''; // Limpa o conteúdo antes de mostrar os jogadores

    let linhaAtual = criarNovaLinha();

    for (let numeroJogador = inicio; numeroJogador <= fim; numeroJogador++) {
        if ((numeroJogador - inicio) % 4 === 0 && numeroJogador !== inicio) {
            linhaAtual = criarNovaLinha();
        }

        const entrada = await pegarCoisas(`https://botafogo-atletas.mange.li/${numeroJogador}`);
        const jogadorContainer = preenche(entrada, genero);
        linhaAtual.appendChild(jogadorContainer);
    }
}

document.getElementById('btnFeminino').addEventListener('click', () => {
    mostrarJogadoresPorGenero('feminino');
});

document.getElementById('btnMasculino').addEventListener('click', () => {
    mostrarJogadoresPorGenero('masculino');
});
