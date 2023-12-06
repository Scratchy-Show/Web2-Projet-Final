import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
import { MarcoBreathe } from './sprite/marco/MarcoBreathe.js';
import { MarcoSpace } from './sprite/marco/MarcoSpace.js';
import { UefoFlying } from './sprite/uefo/UefoFlying.js';
import { UefoDestroyed } from './sprite/uefo/UefoDestroyed.js';
import { Chicken } from './sprite/flying/Chicken.js';

export let spriteListChat = [];
let currentMembers = [];
let spaceOn = false;
let nodeBackground;
let marcoX ;
let marcoY ;

window.addEventListener("load", () => {
    // Evite que le code soit exécuter en dehors de la page index.html
    if (document.querySelector(".chat-main")) {
        nodeBackground = document.querySelector(".background-image");
        nodeBackground.classList.add("trees");

        // Positions
		marcoX = window.innerWidth  * 0.2;
		marcoY = window.innerHeight - 180;

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
    if (message.trim().toLowerCase() === "killall") {
        // Remplace tous les UefoFlying
        spriteListChat.forEach(sprite => {
            if (sprite instanceof UefoFlying) {
                // Crée une nouvelle instance d'UefoDestroyed à la position de l'UefoFlying actuel
                let uefoDestroyed = new UefoDestroyed(sprite.x, sprite.y, sprite.memberName);

                // Remplace l'UefoFlying par l'UefoDestroyed dans la liste et dans le DOM
                let index = spriteListChat.indexOf(sprite);
                spriteListChat.splice(index, 1, uefoDestroyed);

                if (document.querySelector(".member-name-" + sprite.memberName))
                document.querySelector(".member-name-" + sprite.memberName).remove();

                sprite.nodeUefoFlying.remove();
            }
        });
    } else if (message.trim().toLowerCase() === "kill") {
        // Détruit l'Uefo du membre
        let uefoIndex = spriteListChat.findIndex(sprite => sprite instanceof UefoFlying && sprite.memberName === fromUser);

        if (uefoIndex !== -1) {
            let uefoSprite = spriteListChat[uefoIndex];
    
            // Crée une nouvelle instance d'UefoDestroyed à la position de l'UefoFlying actuel
            let uefoDestroyed = new UefoDestroyed(uefoSprite.x, uefoSprite.y, uefoSprite.memberName);
    
            // Remplace l'UefoFlying par l'UefoDestroyed dans la liste et dans le DOM
            spriteListChat.splice(uefoIndex, 1, uefoDestroyed);
    
            if (document.querySelector(".member-name-" + uefoSprite.memberName))
                document.querySelector(".member-name-" + uefoSprite.memberName).remove();
    
            uefoSprite.nodeUefoFlying.remove();
        }
    }

    let nodeMessage = document.createElement("div");
    nodeMessage.classList.add("msg");

    nodeMessage.innerHTML = "<span style='font-weight: bold;'>" + fromUser + "</span>" + " : " + message;
    nodeMessage.innerHTML = "<span style='font-weight: bold;'>" + fromUser + " :</span> <span style='font-family: arial;'>" + message + "</span>";

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
            }
        });
        
    } else {
        // Supprime toutes les instances de UefoFlying, sauf MarcoBreathe
        spriteListChat.forEach(sprite => {
            if (sprite instanceof UefoFlying) {
                if (document.querySelector(".uefo-flying-" + sprite.memberName)) {
                    document.querySelector(".uefo-flying-" + sprite.memberName).remove();
                    document.querySelector(".member-name-" + sprite.memberName).remove();
                }
                sprite.nodeUefoFlying.remove();
            }
        }); 

        // Filtre la liste des sprites pour ne conserver que MarcoBreathe et Chicken
        spriteListChat = spriteListChat.filter(sprite => sprite instanceof MarcoBreathe || sprite instanceof Chicken);

        // Vide le tableau temporaire
        currentMembers = [];
    }
}

/********** Barre d'espace appuyée **********/
document.addEventListener("keydown", e => {
    if (e.code == "Space") {
        spaceOn = !spaceOn;

        if (spaceOn) {
            nodeBackground.classList.add("space");
            nodeBackground.classList.remove("trees");
            document.querySelector(".marco-breathe").remove();

            // Exclue toutes les instances de MarcoBreathe
            spriteListChat = spriteListChat.filter(sprite => !(sprite instanceof MarcoBreathe));

            // Ajoute MarcoSpace
            if (!spriteListChat.some(sprite => sprite instanceof MarcoSpace))
                spriteListChat.push(new MarcoSpace(marcoX, marcoY));

            // Supprime les instances de Chicken
            spriteListChat = spriteListChat.filter(sprite => {
                if (sprite instanceof Chicken) {
                    sprite.nodeChicken.remove();
                    return false; // Ne conserve pas les instances de Chicken dans la liste
                }
                return true; // Conserve les autres sprites dans la liste
            });
        } else {
            nodeBackground.classList.add("trees");
            nodeBackground.classList.remove("space");
            document.querySelector(".marco-space").remove();

            // Exclue toutes les instances de MarcoSpace
            spriteListChat = spriteListChat.filter(sprite => !(sprite instanceof MarcoSpace));

            // Supprime la div .member-name associé à chaque UefoFlying et le sprite
            spriteListChat.forEach(sprite => {
                if (sprite instanceof UefoFlying) {
                    if (document.querySelector(".member-name"))
                        document.querySelector(".member-name").remove();
                    sprite.nodeUefoFlying.remove();
                }
            });

            // Supprime les UefoFlying et les éléments .member-name associés
            for (let i = spriteListChat.length - 1; i >= 0; i--) {
                if (spriteListChat[i] instanceof UefoFlying) {

                    if (document.querySelector(".member-name-" + spriteListChat[i].memberName))
                        document.querySelector(".member-name-" + spriteListChat[i].memberName).remove();
                    
                    spriteListChat[i].nodeUefoFlying.remove();
                    spriteListChat.splice(i, 1);
                }
            }

            // Supprime toutes les instances de UefoDestroyed
            spriteListChat.forEach(sprite => {
                if (sprite instanceof UefoDestroyed)
                    sprite.nodeUefoDestroyed.remove();
            });

            // Ajoute MarcoBreathe
            if (!spriteListChat.some(sprite => sprite instanceof MarcoBreathe))
                // Fait apparaître Marco de manière progressive en CSS
                spriteListChat.push(new MarcoBreathe(marcoX, marcoY));
        }
    }
});

/********** Touche p appuyée **********/
let chickenId = 1;
document.addEventListener("keypress", (event) => {
    if (event.key === "p") {
        if (!spaceOn)
            spriteListChat.push(new Chicken(chickenId++));
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
console.log(spriteListChat);
    window.requestAnimationFrame(tick);
}