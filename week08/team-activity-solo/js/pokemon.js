//pokemon class

class Pokemon {
    constructor() {
        //id
        //name
    }
}

function renderOnePokemonCard(pokemon) {
    const item = document.createElement("div");
    item.innerHTML = `<h2>${pokemon.name}</h2>
    <div class="text">
          <div>
              <h3>Distance</h3>
              <p>${pokemon.type}</p>
          </div>
    </div>`;
    return item;
}