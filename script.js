const poke_container = document.querySelector('#poke_container');
const pokemonStats = document.querySelector(".pokemon-stats");
const pokemons_number = 151;
const colors = {
    fire: '#F57D31',
    grass: '#74CB48',
    electric: '#F9CF30',
    water: '#6493EB',
    ground: '#DEC16B',
    rock: '#B69E31',
    fairy: '#E69EAC',
    poison: '#A43E9E',
    bug: '#A7B723',
    dragon: '#7037FF',
    psychic: '#FB5584',
    flying: '#A891EC',
    fighting: '#C12239',
    normal: '#AAA67F'
};

const main_types = Object.keys(colors);

console.log(main_types);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
}

/* API */
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('button');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type2.0">Type : <span>${type}</span></small>
        </div>

    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl)

    pokemonEl.addEventListener('click', function () {
        modal.classList.toggle("show-modal");

        /* afficher le poids */
        document.querySelector(`#part1 p`).innerHTML = `${pokemon.weight} kg`;

        /* afficher la taille */
        document.querySelector(`#part2 p`).innerHTML = `${pokemon.height} m`;

        /* afficher les moves */
        document.querySelector('#part3 .ability1').innerHTML = `${pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.slice(1)}`;
        if (pokemon.abilities[1]) {
            document.querySelector('#part3 .ability2').innerHTML = `${pokemon.abilities[1].ability.name[0].toUpperCase() + pokemon.abilities[1].ability.name.slice(1)}`;
        }else {
            // rien
        }

        /* afficher le nom du pokémon */
        document.querySelector(`.name-modal`).innerHTML = `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`;

        /* afficher l'id du pokémon */
        document.querySelector(`.number-modal`).innerHTML = `#${pokemon.id.toString().padStart(3, '0')}`;

        /* image à l'apparition de la fenêtre */
        let pokemonImage= document.querySelector(`.pokemon-image`);
            pokemonImage.src = `${pokemon.sprites.front_default}`;

        /* afficher le(s) type(s) du pokémon */ 
        document.querySelector(`.type1`).innerHTML = `${pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1)}`
        if (pokemon.types[1]) {
            document.querySelector(`.type2`).innerHTML = `${pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.slice(1)}`
        }
        else {document.querySelector(`.type2`).innerHTML =""}
        


        /* afficher ses compétences */
        document.querySelector('.hp').innerHTML = pokemon.stats[0].base_stat.toString().padStart(3, '0');
        document.querySelector('.atk').innerHTML = pokemon.stats[1].base_stat.toString().padStart(3, '0');
        document.querySelector('.def').innerHTML = pokemon.stats[2].base_stat.toString().padStart(3, '0');
        document.querySelector('.satk').innerHTML = pokemon.stats[3].base_stat.toString().padStart(3, '0');
        document.querySelector('.sdef').innerHTML = pokemon.stats[4].base_stat.toString().padStart(3, '0');
        document.querySelector('.spd').innerHTML = pokemon.stats[5].base_stat.toString().padStart(3, '0');
    });

};

/* création fenêtre modale */

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".poke-container");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

/* trigger.addEventListener("click", toggleModal); */
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);