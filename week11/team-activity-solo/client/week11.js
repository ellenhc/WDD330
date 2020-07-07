import { makeRequest } from "./authHelpers.js";
import Auth from "./Auth.js";

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
});

let auth = new Auth();

let button = document.getElementById("button");
button.addEventListener("click", (e) => {
    e.preventDefault();
    auth.login();
});