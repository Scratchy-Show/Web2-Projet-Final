import { TiledImage } from '../../TiledImage.js';

export class Chicken{
    constructor(i) {
        let id = i;
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.speed = Math.random() * 3 + 1;

        /***** SPRITESHEET - CHICKEN  *****/
        this.nodeChicken = document.createElement("div");
        this.nodeChicken.classList.add("chicken-" + id);

        this.TiledImageChicken = new TiledImage(
            "./img/flying/chicken.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeChicken
        );
        this.TiledImageChicken.changeMinMaxInterval(0, 5);

        /********** INDEX.HTML **********/
        if (document.querySelector(".index-main"))
            document.querySelector(".index-main").append(this.nodeChicken);

        /********** CHAT.HTML **********/
        if (document.querySelector(".chat-main"))
            document.querySelector(".chat-main").append(this.nodeChicken);

        // Positionne les poulets de manière aléatoire sur 1/5 du haut de l'écran
        this.posX = Math.random() * window.innerWidth;
        this.posY = Math.random() * (window.innerHeight / 5);
    }

    tick () {
        // Déplacement
        this.posX -= this.speed;

        // Applique la nouvelle position
        this.nodeChicken.style.left = this.posX;
        this.nodeChicken.style.top = this.posY;

        // Si le poulet a traversé l'écran, réinitialise sa position
        if (this.posX < -100) {
            this.posX = window.innerWidth;
            // Nouvelle position verticale aléatoire
            this.posY = Math.random() * (window.innerHeight / 5);
        }

        this.TiledImageChicken.tick(this.posX, this.posY);

        return true;
    }
}