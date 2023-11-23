import {register} from './chat-api';

window.addEventListener("load", () => {

    /********** Déplace le background **********/
    let position = 0;
    let screenWidth = window.innerWidth;
    let container = document.querySelector(".background-container");

    const moveBackground = () => {
        let scrollSpeed = 15;
        position -= scrollSpeed;

        if (Math.abs(position) >= screenWidth)
            position = 0;

        container.style.transform = "translateX(" + position + "px)";

        // Remplace setInterval qui me permet d'éviter de la latence
        requestAnimationFrame(moveBackground);
     
    };
    // Lancer la première frame
    moveBackground();

    /********** Soumission du formulaire **********/
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }
})
