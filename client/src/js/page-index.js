import { signin } from './chat-api.js';
import { Chicken } from './sprite/flying/Chicken.js';
import { MarcoWakeUp } from './sprite/marco/MarcoWakeUp.js';

export let spriteListIndex = [];

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page index.html
    if (document.querySelector(".index-main")) {

        /********** Affiche le username dans le champ du formulaire **********/
        let usernameInput = document.getElementById('username');
        let storedUsername = localStorage.getItem('username');

        usernameInput.value = storedUsername || ''; 

        /********** Descendre la section title **********/
        let title = document.getElementById("title");
        let posYUp = -300; // Position de départ
        const TITLE_SPEED = 4;

        const goDown = () => {
            // 1/10 de la hauteur de la fenêtre
            const LIMIT_POS_Y = window.innerHeight / 10;

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

        /********** Afficher le formulaire et le lien s'enregistrer **********/
        const showForm = () => {
            let form = document.querySelector("form");
            form.style.display = "block";
            form.classList.add("form-visible");

            let link = document.querySelector(".redirection");
            link.style.display = "block";

            /********** Réveiller Marco quand l'animation du formualire est terminée **********/
            // Même durée que l'animation en css
            setTimeout(() => {
                spriteListIndex.push(new MarcoWakeUp());
                let eventFormDisplay = new Event("formDisplay");
                form.dispatchEvent(eventFormDisplay);
            }, 1000);
        }

        /********** Ajoute des poulets **********/
        for (let i = 0; i < 3; i++) {
            spriteListIndex.push(new Chicken(i));
        } 

        /********** Soumission du formulaire **********/
        document.querySelector("form").onsubmit = function () {

           /* localStorage.setItem('username', usernameValue);*/

            return signin(this);
        }

        goDown();
        tick();
    }
});

const tick = () => {
    for (let i = 0; i < spriteListIndex.length; i++) {
        let alive = spriteListIndex[i].tick();

        if (!alive) {
            spriteListIndex.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}