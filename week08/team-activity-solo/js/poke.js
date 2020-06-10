const url = "https://pokeapi.co/api/v2/pokemon?limit=100;"

//let results = await fetch(url)
const fake_data = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
    { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
]
for (let i = 0; i < fake_data.length; i++) {
    let node = document.createElement("DIV");
    let content = fake_data[i];
    let text = document.createTextNode(JSON.stringify(content));
    node.appendChild(text);
    document.getElementById("grid-container").appendChild(node);
}

fetch(url).then(response => {
        return response.json()
    })
    .then(data => console.log("data", data))
    .catch(error => console.log("Error"))