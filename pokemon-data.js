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

        while (url) {
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

                // Construct the HTML string for the Pokémon
                const pokemonHtml = `
                    <div class="pokemon-div">
                        <h3 class="pokemon-name">${details.name}</h3>
                        <img class="pokemon-image" src="${imageUrl}" alt="${details.name}">
                    </div>
                `;

                // Append the constructed HTML string to the pokemonContainer
                pokemonContainer.innerHTML += pokemonHtml;
            }));

            // Check if there's a next page
            url = data.next;
        }
    } catch (error) {
        console.error("Error displaying Pokémon:", error);
    }
}

// Call the function to display all Pokemon
displayPokemon();


// this is for search function
// using inner html to display the pokemon image and name when we search 

// let currentPage = 1; // Initialize a variable to keep track of the current page

// async function displayPokemon(page = 1) {
//     try {
//         let url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(page - 1) * 20}`;
//         const pokemonContainer = document.getElementById('pokemon-container');

//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Process each Pokemon in the current page
//         await Promise.all(data.results.map(async (pokemon) => {
//             const response = await fetch(pokemon.url);
//             const details = await response.json();
//             const imageUrl = details.sprites.front_default; // Use the front_default sprite for simplicity

//             // Construct the HTML string for the Pokémon
//             const pokemonHtml = `
//                 <div class="pokemon-div">
//                     <h3 class="pokemon-name">${details.name}</h3>
//                     <img class="pokemon-image" src="${imageUrl}" alt="${details.name}">
//                 </div>
//             `;

//             // Append the constructed HTML string to the pokemonContainer
//             pokemonContainer.innerHTML += pokemonHtml;
//         }));

//         // Check if there's a next page
//         if (data.next) {
//             // Update the current page variable
//             currentPage = page + 1;
//         } else {
//             // If there's no next page, remove the scroll event listener
//             window.removeEventListener('scroll', loadMorePokemon);
//         }
//     } catch (error) {
//         console.error("Error displaying Pokémon:", error);
//     }
// }

// // Function to load more Pokémon when the user scrolls to the bottom
// function loadMorePokemon() {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         displayPokemon(currentPage);
//     }
// }

// // Add the scroll event listener
// window.addEventListener('scroll', loadMorePokemon);

// // Call the function to display the first page of Pokémon
// displayPokemon();


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
        
        // Extract additional details
        const types = data.types.map(type => type.type.name).join(', ');
        const height = data.height;
        const weight = data.weight;

        // Construct the HTML string for the Pokemon sprite, name, and additional details
        const htmlContent = `
            <div id="searchpokemonContainer">
                <p id="searchPokemonName">${data.name}</p>
                <img id="searchPokemonImage" src="${pokemonSprite}" alt="${pokemonName}">
                <p>Type: ${types}</p>
                <p>Height: ${height} </p>
                <p>Weight: ${weight} </p>
            </div>         
        `;
            console.log(height)
        // Set the innerHTML of the displayElement to the constructed HTML string
        displayElement.innerHTML = htmlContent;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        if (error.message.includes("Could not fetch resource")) {
            // Display "Pokemon not found" message
            document.getElementById("pokemonDisplay").innerHTML = "<p id='notFound'>Pokemon not found</p>";
        }
    }
}

function reloadPage() {
    window.location.reload();
}

// create a function 
// add a event listener
// when pokemon card is clicked 
    // redirect to another page of pokemon details
    // window.onload = function() {
    //     // Select the searchpokemonContainer element
    //     const pokemonDisplay = document.getElementById('pokemonDisplay');

    //     // Add a click event listener to the searchpokemonContainer
    //     pokemonDisplay.addEventListener('click', function() {
    //         // Redirect to a new page
    //         window.location.href = 'detail.html';
    //     });
    // };

// create a function 
// when clicked on pokemon-container 
// fetch the details of pokemon 
// while fetching the data of pokemon display none pokemon-container
async function fetchPokemonDetails() {
    // Hide the pokemon-container while fetching data
    document.getElementById('pokemon-container').style.display = 'none';

    try {
        // Example URL for a specific Pokemon
        const url = "https://pokeapi.co/api/v2/pokemon/1"; // Replace 1 with the desired Pokemon ID
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Construct the HTML string for the Pokémon details
        const pokemonDetailsHtml = `
            <h3>${data.name}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Types: ${data.types.map(type => type.type.name).join(', ')}</p>
        `;

        // Update the innerHTML of the pokemon-container with the fetched data
        document.getElementById('pokemon-container').innerHTML = pokemonDetailsHtml;

        // Show the pokemon-container after fetching data
        document.getElementById('pokemon-container').style.display = 'block';
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
    }
}

// Add an event listener to the pokemon-container
// document.getElementById('pokemon-div').addEventListener('click', fetchPokemonDetails);

// function clickPokemonCard(){
//     fetchPokemonDetails()
// }
// document.getElementById('pokemon-container').addEventListener('click', clickPokemonCard);

document.getElementById('pokemon-div').addEventListener('click', () => {
    console.log('clicked');
});

