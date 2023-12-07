import { TiledImage } from '../../TiledImage.js';

export class MarcoSpace{
    constructor(posX, posY) {
        let colCount = 68;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.posX = posX;
        this.posY = posY;
        this.speed = 1.5;
        this.speedX = Math.abs(this.speed);
        this.speedY = (Math.random() > 0.5 ? 1 : -1) * this.speed; // +y ou -y
        this.x = Math.random() * 700 + 100;
        this.y = Math.random() * 500 + 100;

        /***** SPRITESHEET - MARCO SPACE  *****/
        this.nodeMarcoSpace = document.createElement("div");
        this.nodeMarcoSpace.classList.add("marco-space");
        this.nodeMarcoSpace.style.zIndex = 20;
        this.nodeMarcoSpace.style.top = this.y + "px";
        this.nodeMarcoSpace.style.left = this.x + "px";
        document.querySelector(".chat-main").append(this.nodeMarcoSpace);

        this.TiledImageMarcoSpace = new TiledImage(
            "./img/marco/marco-space.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoSpace
        );
        this.TiledImageMarcoSpace.changeMinMaxInterval(0, 67);
    }

    tick () {
        // Calcul des nouvelles positions
        let newX = this.x + this.speedX;
        let newY = this.y + this.speedY;

        // Vérifie si les nouvelles positions sont toujours dans les limites de la fenêtre
        if (newX >= 0 && newX + this.nodeMarcoSpace.offsetWidth <= window.innerWidth) {
            this.x = newX;
        } else {
            // Inverse la direction horizontale si la nouvelle position dépasse les limites horizontales
            this.speedX = -this.speedX;
            
            // Inverse l'image horizontalement en fonction de la nouvelle direction
            this.nodeMarcoSpace.style.transform = this.speedX < 0 ? "scaleX(-1)" : "scaleX(1)";
        }

        if (newY >= 0 && newY + this.nodeMarcoSpace.offsetHeight <= window.innerHeight)
            this.y = newY;
        else
            // Inverse la direction si la nouvelle position dépasse les limites verticales
            this.speedY = -this.speedY;

        // Met à jour la position
        this.nodeMarcoSpace.style.top = this.y + "px";
        this.nodeMarcoSpace.style.left = this.x + "px";

        this.TiledImageMarcoSpace.tick(newX, newY);

        return true;
    }
}