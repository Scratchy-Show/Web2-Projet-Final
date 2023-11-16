import { TiledImage } from '../TiledImage.js';

export class MarcoKillFallBack{
    constructor() {
        let colCount = 10;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - FALL BACK  *****/
        this.nodeMarcoKillFallBack = document.createElement("div");
        this.nodeMarcoKillFallBack.classList.add("marco-kill-fall-back");
        document.querySelector("main").append(this.nodeMarcoKillFallBack);

        this.TiledImageMarcoKillFallBack = new TiledImage(
            "./img/marco-kill-fall-back.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoKillFallBack
        );
        this.TiledImageMarcoKillFallBack.changeMinMaxInterval(0, 9);

        // Positions
        this.marcoX = 300;
        this.marcoY = 300;
    }

    tick () {
        this.TiledImageMarcoKillFallBack.tick(this.marcoX+300, this.marcoY);

        return true;
    }
}