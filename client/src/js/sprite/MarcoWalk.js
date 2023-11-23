import { TiledImage } from '../TiledImage.js';

export class MarcoWalk {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO WALK  *****/
        this.nodeMarcoWalk = document.createElement("div");
        this.nodeMarcoWalk.classList.add("marco-run");
        this.nodeMarcoWalk.style.zIndex = 20;
        document.querySelector(".register-main").append(this.nodeMarcoWalk);

        this.TiledImageMarcoWalk = new TiledImage(
            "./img/marco-walk.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoWalk
        );
        this.TiledImageMarcoWalk.changeMinMaxInterval(0, 5);
    }

    tick () {
        this.TiledImageMarcoWalk.tick(this.marcoX, this.marcoY);

        return true;
    }
}