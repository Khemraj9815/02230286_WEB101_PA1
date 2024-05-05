const url = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemon() {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

async function displayPokemon() {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/";
        const pokemonContainer = document.getElementById('pokemon-container');
        let fetchedPokemonCount = 0; // Counter to keep track of fetched Pokémon

        while (url && fetchedPokemonCount < 50) { // Stop fetching when 20 Pokémon have been fetched
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Process each Pokemon in the current page
            await Promise.all(data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                const details = await response.json();
                const imageUrl = details.sprites.front_default; // Use the front_default sprite for simplicity
                const name = details.name;


                // innerHTML to display the pokemon details
                const pokemonHtml = `
                    <div class="pokemon-div" data-pokemon-id="${details.id}">
                        <h3 class="pokemon-name">${name}</h3>
                        <img class="pokemon-image" src="${imageUrl}" alt="${details.name}">
                        <p id="seen">Unseen</p>
                        <button id="adding" onclick="addtoseen()">Add</button>

                    </div>
                `;

                pokemonContainer.innerHTML += pokemonHtml;

                fetchedPokemonCount++;
            }));

            url = data.next && fetchedPokemonCount < 50 ? data.next : null;
        }

        // add event listener to pokemon-div
        const pokemonDivs = document.querySelectorAll('.pokemon-div');
        pokemonDivs.forEach(div => {
            div.addEventListener('click', async () => {
                const pokemonId = div.getAttribute('data-pokemon-id');
                const details = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                if (details) {
                    const detailsHtml = PokemonDetailsHtml(details);
                    pokemonContainer.innerHTML = detailsHtml;
                }
            });
        });
    } catch (error) {
        console.error("Error displaying Pokemon:", error);
    }
}

// function to fetch details for a single pokemon
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
    }
    return await response.json();
}

// Function to create HTML for a pokemon details
function PokemonDetailsHtml(details) {
    const height = details.height;
    const weight = details.weight;
    const imageUrl = details.sprites.front_default;
    const abilities = details.abilities.map(ability => ability.ability.name).join(', ');
    const types = details.types.map(type => type.type.name).join(', ');
    return `
        <div class="pokemon-details">
            <h2>${details.name}</h2>
            <img src="${imageUrl}" alt="${details.name}">
            <p>Height: ${height}</p>
            <p>Weight: ${weight}</p>
            <p>Abilities: ${abilities}</p>
            <p>Types: ${types}</p>
        </div>
    `;
}

displayPokemon();


// Function to create HTML for a Pokémon's details
function createPokemonDetailsHtml(details) {
    return `
        <div class="pokemon-details">
            <h2>${details.name}</h2>
            <img src="${details.sprites.front_default}" alt="${details.name}">
            <p>Height: ${details.height}</p>
            <p>Weight: ${details.weight}</p>
            <p>Abilities: ${details.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Types: ${details.types.map(type => type.type.name).join(', ')}</p>
        </div>
    `;
}

// function to fetch Pokémon data and display it
async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        document.getElementById("pokemon-container").style.display = "none";

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const displayElement = document.getElementById("pokemonDisplay");
        
        const htmlContent = `
            <div id="searchpokemonContainer">
                <p id="searchPokemonName">${data.name}</p>
                <img id="searchPokemonImage" src="${pokemonSprite}" alt="${pokemonName}">
                <p id="unseen">Unseen</p>
                <button id="add" onclick="addtoseen()">Add</button>
            </div>         
        `;

        displayElement.innerHTML = htmlContent;

        document.getElementById('searchpokemonContainer').addEventListener('click', () => showPokemonDetails(data));
    } catch (error) {
        console.error("Failed to fetch data:", error);
        if (error.message.includes("Could not fetch resource")) {
            document.getElementById("pokemonDisplay").innerHTML = "<p id='notFound'>Pokemon not found</p>";
        }
    }
}

// display the details of pokemon 
function showPokemonDetails(details) {
    const pokemonDetailsHtml = createPokemonDetailsHtml(details);
    document.getElementById("pokemonDisplay").innerHTML = pokemonDetailsHtml;
}


function addtoseen(){
    var add = document.getElementById('unseen');
    add.innerHTML = "Seen";
}
