const pokemonContainer = document.getElementById('pokemon-container');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImg = document.getElementById('pokemon-img');
const pokemonType = document.getElementById('pokemon-type');
const buscarButton = document.getElementById('buscar');
const inputId = document.getElementById('pokemon-id');
let currentPokemonId = 1;

const typeColors = {
    fire: '#fddfdf',
    water: '#def3fd',
    grass: '#defde0',
    electric: '#fcf7de',
    ice: '#f3faff',
    fighting: '#e6e0d4',
    poison: '#f8d5a3',
    ground: '#f4e7da',
    flying: '#f5f5f5',
    psychic: '#eaeda1',
    bug: '#f8d5a3',
    rock: '#d5d5d4',
    ghost: '#f8f8ff',
    dark: '#705848',
    dragon: '#97b3e6',
    steel: '#f4f4f4',
    fairy: '#fceaff',
    normal: '#f5f5f5'
};

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            renderPokemon(data);
        })
        .catch(error => console.log('Erro ao buscar Pokémon:', error));
}

function renderPokemon(pokemon) {
    pokemonName.textContent = pokemon.name;
    pokemonImg.src = pokemon.sprites.front_default;
    const types = pokemon.types.map(type => type.type.name);
    pokemonType.textContent = `Tipo: ${types.join(', ')}`;
    
    // Mudar o fundo com base no tipo do Pokémon
    const primaryType = types[0];
    document.body.style.backgroundColor = typeColors[primaryType] || '#fff';
}

// Avançar Pokémon
document.getElementById('avancar').addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

// Voltar Pokémon
document.getElementById('voltar').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

// Buscar Pokémon pelo ID inserido
buscarButton.addEventListener('click', () => {
    const id = inputId.value;
    if (id) {
        currentPokemonId = id;
        fetchPokemon(id);
    }
});

// Carregar o primeiro Pokémon ao iniciar
fetchPokemon(currentPokemonId);
