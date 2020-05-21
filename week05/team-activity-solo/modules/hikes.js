//create an array of hikes
const hikeList = [{
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short hike along the Bechler river to Bechler Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description: "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

const imgBasePath = '//byui-cit.github.io/cit261/examples/';

export default class Hikes {
    constructor(elementId) {
        this.rootElementId = elementId;
        this.backButton = this.buildBackButton();
    }

    //We need this fxn because hikeList is not exported so it cannot be seen outside of this module
    getAllHikes() {
        return hikeList;
    }

    getHikeByName(hikeName) {
        let foundHike = this.getAllHikes().filter(x => x.name == hikeName);
        return foundHike[0];
    }

    //Show a list of hikes in the parentElement
    showHikeList() {
        let allHikes = this.getAllHikes();
        document.getElementById(this.rootElementId).innerHTML = ""; //is this needed? well it removes 'loading...'
        for (let i = 0; i < allHikes.length; i++) {
            document.getElementById(this.rootElementId).appendChild(renderOneHikeLight(allHikes[i]));
        }
        this.addHikeListener();
    }

    //Show one hike with full details in the parentElement
    showOneHike(hikeName) {
        // Step 1 - get hike with GetHikeByName
        let foundHike = this.getHikeByName(hikeName);
        // Step 2 - render the hike
        let renderedHike = this.renderOneHikeFull(foundHike);
        // Step 3 - write to inner html
        document.getElementById(this.rootElementId).innerHTML = "";
        document.getElementById(this.rootElementId).appendChild(renderedHike);
    }

    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
    addHikeListener() {
        // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
        let allHikes = this.getAllHikes();
        let rootElement = document.getElementById(this.rootElementId);
        for (let i = 0; i < rootElement.childNodes.length; i++) {
            rootElement.childNodes[i].addEventListener("click", function() {
                rootElement.innerHTML = "";
                rootElement.appendChild(renderOneHikeFull(allHikes[i]));
            });
        }
    }

    //what
    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.innerHTML = `All Hikes`;
        let self = this;
        backButton.addEventListener("click", function() { self.showHikeList(); });
        document.getElementById(this.rootElementId).before(backButton);
        return backButton;
    }
}

function renderOneHikeLight(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div class="text">
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
    </div>`;
    return item;
}

function renderOneHikeFull(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div class="text">
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>Directions</h3>
            <p>${hike.directions}</p>
        </div>
     </div>`;

    return item;
}