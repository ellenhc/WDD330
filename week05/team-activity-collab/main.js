//Create a main.js and add that to your HTML with your script element

//You need to import your module before you can use it. Import hikes from ./hikes.js
import Hikes from './modules/hikes.js';

//You need to create an instance of the Hike class before you can use it. 
const myHike = new Hikes('hikes');

myHike.showHikeList();