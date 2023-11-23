import { TiledImage } from '../TiledImage.js';

export class MarcoZombieWaiting {
    constructor(marcoX, marcoY) {
        let colCount = 47;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO ZOMBIE WAITING  *****/
        this.nodeMarcoZombieWainting = document.createElement("div");
        this.nodeMarcoZombieWainting.classList.add("marco-zombie-waiting");
        this.nodeMarcoZombieWainting.style.zIndex = 20;
        document.querySelector(".index-main").append(this.nodeMarcoZombieWainting);

        this.TiledImageMarcoZombieWaiting= new TiledImage(
            "./img/marco-zombie-waiting.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoZombieWainting
        );
        this.TiledImageMarcoZombieWaiting.changeMinMaxInterval(0, 46);
    }

    tick () {
        this.TiledImageMarcoZombieWaiting.tick(this.marcoX, this.marcoY);

        return true;
    }
}