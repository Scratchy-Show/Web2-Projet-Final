import { register } from './chat-api';
import { MarcoBreathe } from './sprite/marco/MarcoBreathe.js';
import { ChaingunRobotActivating } from './sprite/chaingun/ChaingunRobotActivating.js';
import { viewRobot } from './sprite/chaingun/ChaingunRobotActivating.js';
import { destroyedRobot } from './sprite/chaingun/ChaingunRobotDestroyed.js';
import { outDestroyedRobot } from './sprite/chaingun/ChaingunRobotDestroyed.js';

export let spriteListRegister = [];
export let backgroundMove;

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page register.html
    if (document.querySelector(".register-main")) {

        // Positions
		let marcoX = window.innerWidth  * 0.2;
		let marcoY = window.innerHeight - 100;
        let robotY = window.innerHeight - 150;

        // Fait apparaître Marco de manière progressive en CSS
        spriteListRegister.push(new MarcoBreathe(marcoX, marcoY));

        // Affiche le robot
        spriteListRegister.push(new ChaingunRobotActivating(marcoX, robotY));
 
        /********** Déplace le background **********/
        // Synchronisé avec MarcoWalk
        setTimeout(() => {
            let position = 0;
            let screenWidth = window.innerWidth;
            let container = document.querySelector(".background-container");

            const moveBackground = () => {
                let scrollSpeed;

                // Si le robot n'est pas en vue ou est détruit ou sortie de l'écran le background bouge
                if (!viewRobot || destroyedRobot || outDestroyedRobot) {
                    scrollSpeed = 1;
                    backgroundMove = true;
                } else {
                    // le background s'arrête
                    scrollSpeed = 0;
                    backgroundMove = false;
                }

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