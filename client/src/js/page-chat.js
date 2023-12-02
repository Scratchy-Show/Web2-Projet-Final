import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
import { MarcoBreathe } from './sprite/marco/MarcoBreathe.js';

export let spriteListChat = [];

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page index.html
    if (document.querySelector(".chat-main")) {

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

    console.log(members);

    let parentNode = document.querySelector('.members-container');

    // Effacer la liste actuelle
    parentNode.innerHTML = '';

    // Parcourir le tableau des membres
    members.forEach(member => {
        let nodeMember = document.createElement('div');
        nodeMember.classList.add('member');
        nodeMember.textContent = member;

        // Ajouter la div au conteneur
        parentNode.appendChild(nodeMember);
    });

}

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