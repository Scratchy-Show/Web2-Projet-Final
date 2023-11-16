import { TiledImage } from '../TiledImage.js';

export class Chicken{
    constructor() {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - FALL BACK  *****/
        this.nodeChicken = document.createElement("div");
        this.nodeChicken.classList.add("chicken");
        document.querySelector("main").append(this.nodeChicken);

        this.TiledImageChicken = new TiledImage(
            "./img/chicken.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeChicken
        );
        this.TiledImageChicken.changeMinMaxInterval(0, 5);

        // Positions
        this.marcoX = 300;
        this.marcoY = 300;
    }

    tick () {
        this.TiledImageChicken.tick(this.marcoX+300, this.marcoY);

        return true;
    }
}