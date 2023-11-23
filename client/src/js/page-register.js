import {register} from './chat-api';

window.addEventListener("load", () => {

    /********** Déplace le background **********/
    let position = 0;
    let screenWidth = window.innerWidth;
    let container = document.querySelector(".background-container");

    const moveBackground = () => {
        if (document.visibilityState === "visible") {
            let scrollSpeed = 8.5;
            position -= scrollSpeed;

            if (Math.abs(position) >= screenWidth) {
                position = 0;
            }

            container.style.transform = "translateX(" + position + "px)";
        }
    };

    setInterval(moveBackground, 30);

    /********** Soumission du formulaire **********/
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }
})
