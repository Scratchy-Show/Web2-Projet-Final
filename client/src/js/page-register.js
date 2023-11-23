import {register} from './chat-api';
import { MarcoBreathe } from './sprite/MarcoBreathe.js';
import { ChaingunRobotActivating } from './sprite/ChaingunRobotActivating.js';
import { viewRobot } from './sprite/ChaingunRobotActivating.js';

export let spriteListRegister = [];

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page register.html
    if (document.querySelector(".register-main")) {

        // Positions
		let marcoX = 300;
		let marcoY = window.innerHeight - 180;

        // Fait apparaître Marco de manière progressive en CSS
        spriteListRegister.push(new MarcoBreathe(marcoX, marcoY));

        // Affiche le robot
        spriteListRegister.push(new ChaingunRobotActivating(marcoX, marcoY));
 
        /********** Déplace le background **********/
        // Synchronisé avec MarcoWalk
        setTimeout(() => {
            let position = 0;
            let screenWidth = window.innerWidth;
            let container = document.querySelector(".background-container");

            const moveBackground = () => {
                let scrollSpeed = 1;

            // Vérifie si le robot est en vue
            if (viewRobot)
                    scrollSpeed = 0;

                position -= scrollSpeed;

                if (Math.abs(position) >= screenWidth)
                    position = 0;

                container.style.transform = "translateX(" + position + "px)";

                // Remplace setInterval qui me permet d'éviter de la latence
                requestAnimationFrame(moveBackground);
            
            };
            // Lance la première frame
            moveBackground();
        }, 2050);
        

        /********** Soumission du formulaire **********/
        document.querySelector("form").onsubmit = function () {
            return register(this);
        }

        tick();
    }
})

const tick = () => {
    for (let i = 0; i < spriteListRegister.length; i++) {
        let alive = spriteListRegister[i].tick();

        if (!alive) {
            spriteListRegister.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}