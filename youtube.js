// async function fetchData(){
    
//     try{ 
        
//         const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
//         if(!response.ok){
//              throw new Error("Could not fetch resource");
//         } 
        
//         const data = await response.json();
//         const pokemonSprite = data.sprites.front_default;
//         const imgElement = document.getElementById("pokemonSprite"); 

//         imgElement.src = pokemonSprite; 
//         imgElement.style.display = "block";
        
//     } 
//     catch(error){
//         console.error(error);
//     } }

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const displayElement = document.getElementById("pokemonDisplay");

        // Create an img element for the Pokemon sprite
        const imgElement = document.createElement("img");
        imgElement.src = pokemonSprite;
        imgElement.alt = pokemonName;
        imgElement.style.display = "block";

        // Create a paragraph element to display the Pokemon's name
        const nameElement = document.createElement("p");
        nameElement.textContent = data.name;

        // Append the img and paragraph elements to the displayElement
        displayElement.innerHTML = ''; // Clear any previous content
        displayElement.appendChild(imgElement);
        displayElement.appendChild(nameElement);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}


