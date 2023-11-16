import { TiledImage } from '../TiledImage.js';

export class MarcoBreathe {
    constructor() {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - BREATHE  *****/
        this.nodeMarcoBreathe = document.createElement("div");
        this.nodeMarcoBreathe.classList.add("marco-breathe");
        document.querySelector("main").append(this.nodeMarcoBreathe);

        this.TiledImageMarcoBreathe = new TiledImage(
            "./img/marco-breathe.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoBreathe
        );
        this.TiledImageMarcoBreathe.changeMinMaxInterval(0, 5);

        // Positions
        this.marcoX = 300;
        this.marcoY = 300;
    }

    tick () {
        this.TiledImageMarcoBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}