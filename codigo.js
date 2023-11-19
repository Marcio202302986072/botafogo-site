const div_container = document.createElement('div');
div_container.id = 'container';
document.body.appendChild(div_container);

const cria_cartao = (atleta) => {
    const container_atleta = document.createElement('div');
    container_atleta.style.width = '20rem';
    container_atleta.style.height = '36rem'
    container_atleta.style.backgroundColor = '#777777';
    container_atleta.style.textAlign = 'center';
    container_atleta.style.margin = 'auto';

    const titulo = document.createElement('h3');
    titulo.innerHTML = atleta.nome;

    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = `foto de ${atleta.nome}`;

    const descricao = document.createElement('p');
    descricao.innerHTML = atleta.descricao;

    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(descricao);

    div_container.appendChild(container_atleta);
};

document.getElementById("botaoSair").addEventListener("click", function () {
    // Redireciona para outra página HTML
    window.location.href = 'index.html';
});
const fetchAndDisplayAthletes = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        div_container.innerHTML = ""; // Limpa os cartões existentes

        if (!Array.isArray(data)) {
            throw new Error(`Invalid data format! Expected an array.`);
        }

        for (const atleta of data) {
            cria_cartao(atleta);
        }
    } catch (error) {
        console.error(`Error fetching athlete data: ${error}`);
    }
};

const updateAthletesByCategory = (category) => {
    fetchAndDisplayAthletes(`https://botafogo-atletas.mange.li/${category}`);
};

// Event listener para o <select>
document.getElementById("opcoesSelect").addEventListener("change", function () {
    const categoriaSelecionada = this.value;
    updateAthletesByCategory(categoriaSelecionada);
});

// Event listeners para os botões de filtro
document.getElementById("feminino").addEventListener("click", function () {
    updateAthletesByCategory('feminino');
});

document.getElementById("masculino").addEventListener("click", function () {
    updateAthletesByCategory('masculino');
});

document.getElementById("todos").addEventListener("click", function () {
    updateAthletesByCategory('all');
});

// Fetch and display all athletes initially
updateAthletesByCategory('all');