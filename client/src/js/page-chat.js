import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
import { MarcoBreathe } from './sprite/marco/MarcoBreathe.js';
import { UefoFlying } from './sprite/uefo/UefoFlying';

export let spriteListChat = [];
let currentMembers = [];
let spaceOn = false;
let nodeBackground;

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page index.html
    if (document.querySelector(".chat-main")) {
        nodeBackground = document.querySelector(".background-image");
        nodeBackground.classList.add("trees");

        // Positions
		let marcoX = window.innerWidth  * 0.2;
		let marcoY = window.innerHeight - 180;

        // Fait apparaître Marco de manière progressive en CSS
        spriteListChat.push(new MarcoBreathe(marcoX, marcoY));
    }

    /********** Envoie du message **********/
    document.querySelector("textarea").onkeyup = function (evt) {
        if (evt.key === "Enter") {
            sendMessage(evt, this)
        }
    };

    /********** Déconnexion **********/
    document.querySelector("#sign-out-btn").onclick = signout;

    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();
    tick();
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
    console.log(fromUser, message, isPrivate);

    let nodeMessage = document.createElement("div");
    nodeMessage.classList.add("msg");

    nodeMessage.innerHTML = "<span style='font-weight: bold;'>" + fromUser + "</span>" + " : " + message;

    let parentNode = document.querySelector(".messages-container");
    parentNode.append(nodeMessage);
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {

    // Trie la liste des membres en ordre alphabétique (insensible à la casse)
    members.sort((x, y) => x.localeCompare(y, { sensitivity: 'base' }));

    let parentNode = document.querySelector('.members-container');

    // Efface la liste des membres dans le DOM
    parentNode.innerHTML = '';

    // Parcour le tableau des membres
    members.forEach(member => {
        let nodeMember = document.createElement('div');
        nodeMember.classList.add('member');
        nodeMember.textContent = member;
        parentNode.appendChild(nodeMember);
    });

    // Ajoute des UefoFlying pour chaque membres connectés
    if (spaceOn) {
        members.forEach(member => {
            if (!currentMembers.includes(member)) {

                let uefoX = Math.random() * window.innerWidth;
                let uefoY = Math.random() * window.innerHeight;

                let uefoSprite = new UefoFlying(member);
                uefoSprite.robotX = uefoX;
                uefoSprite.robotY = uefoY;

                spriteListChat.push(uefoSprite);

                // Ajoute le membre au tableau temporaire
                currentMembers.push(member);
                console.log(currentMembers);
            }
        });

        // Vérifie si des membres doivent être retirés
        currentMembers.forEach(member => {
            if (!members.includes(member)) {

                let indexToRemove = spriteListChat.findIndex(sprite => sprite.memberName === member);
                
                if (indexToRemove !== -1) {
                    document.querySelector(".uefo-flying-" + member).remove();
                    spriteListChat.splice(indexToRemove, 1);
                }

                // Retire le membre du tableau temporaire
                currentMembers.splice(currentMembers.indexOf(member), 1);
                console.log(currentMembers);
            }
        });
    }
}

/********** Barre d'espace appuyée **********/
document.addEventListener("keydown", e => {
    if (e.code == "Space") {
        spaceOn = !spaceOn;

        if (spaceOn) {
            nodeBackground.classList.add("space");
            nodeBackground.classList.remove("trees");
        } else {
            nodeBackground.classList.add("trees");
            nodeBackground.classList.remove("space");
        }
    }
});

const tick = () => {
    for (let i = 0; i < spriteListChat.length; i++) {
        let alive = spriteListChat[i].tick();

        if (!alive) {
            spriteListChat.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}