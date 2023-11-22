import { TiledImage } from '../TiledImage.js';

export class MarcoZombie {
    constructor(marcoX, marcoY) {
        let colCount = 47;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO ZOMBIE  *****/
        this.nodeMarcoZombie = document.createElement("div");
        this.nodeMarcoZombie.classList.add("marco-zombie");
        this.nodeMarcoZombie.style.zIndex = 20;
        document.querySelector("main").append(this.nodeMarcoZombie);

        this.TiledImageMarcoZombie= new TiledImage(
            "./img/marco-zombie.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoZombie
        );
        this.TiledImageMarcoZombie.changeMinMaxInterval(0, 46);

        // Désactive la boucle
        this.TiledImageMarcoZombie.setLooped(false);
    }

    tick () {
        this.TiledImageMarcoZombie.tick(this.marcoX, this.marcoY);

        return true;
    }
}