import {signin} from './chat-api.js';
import { MarcoWakeUp } from './sprite/MarcoWakeUp.js';
import { MarcoBreathe } from './sprite/MarcoBreathe.js';
import { MarcoKillBurn } from './sprite/MarcoKillBurn.js';
import { MarcoKillForward } from './sprite/MarcoKillForward.js';
import { MarcoKillFallBack } from './sprite/MarcoKillFallBack.js';

import { animationTerminee } from './sprite/MarcoWakeUp.js';

export let spriteList = [];

window.addEventListener("load", () => {

    /********** Descendre la section title **********/
    let title = document.getElementById("title");
    let posYUp = -300; // Position de départ
    const TITLE_SPEED = 4;

    const goDown = () => {
        const LIMIT_POS_Y = window.innerHeight / 10; // 1/10 de la hauteur de la fenêtre

        if (posYUp < LIMIT_POS_Y) {
            posYUp += TITLE_SPEED;
            title.style.top = posYUp + "px";
            setTimeout(goDown, 30);
        } else {
            setTimeout(() => {
                showForm();
            }, 1000);
        }
    }

    /********** Afficher le formulaire **********/
    const showForm = () => {
        let form = document.querySelector("form");
        form.style.display = "block";
        form.classList.add("form-visible");


        /********** Animer Marco quand l'animation du formualire est terminée **********/
        // Même durée que l'animation en css
        setTimeout(() => {
            spriteList.push(new MarcoWakeUp());
            let eventFormDisplay = new Event('formDisplay');
            form.dispatchEvent(eventFormDisplay);
        }, 1000);
    }

    /********** Déplace le background **********/
    let background = document.querySelector('.background-image');
    let position = 0;

    const moveBackground = () => {
        if (document.visibilityState === 'visible') {
            let scrollSpeed = 0.5;
            position += scrollSpeed;
            background.style.transform = `translateX(${-position}px)`;
            /*console.log(background.style.transform);*/
        }
    }
    setInterval(moveBackground, 30);

    /********** Soumission du formulaire **********/
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    goDown();
    tick();
});

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        let alive = spriteList[i].tick();

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}