//Grabs the .menu-icon class
const menuIcon = document.querySelector(".menu-icon");
const header = document.querySelector("header");

//Adds the .open class to the .menu-icon
function toggleMenu() {
    header.classList.toggle("open");
}

//Adds an eventListener to the .menu-icon class that calls the toggleMenu function when clicked
menuIcon.addEventListener("click", toggleMenu);