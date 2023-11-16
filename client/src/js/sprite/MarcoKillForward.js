import { TiledImage } from '../TiledImage.js';

export class MarcoKillForward {
    constructor() {
        let colCount = 19;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - KILL FORWARD  *****/
        this.nodeMarcoKillForward = document.createElement("div");
        this.nodeMarcoKillForward.classList.add("marco-kill-fall-back");
        document.querySelector("main").append(this.nodeMarcoKillForward);

        this.TiledImageMarcoKillForward = new TiledImage(
            "./img/marco-kill-forward.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoKillForward
        );
        this.TiledImageMarcoKillForward.changeMinMaxInterval(0, 18);


        // Positions
        this.marcoX = 300;
        this.marcoY = 300;
    }

    tick () {
        this.TiledImageMarcoKillForward.tick(this.marcoX+400, this.marcoY);

        return true;
    }
}