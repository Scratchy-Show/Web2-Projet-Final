import { TiledImage } from '../TiledImage.js';

export class MarcoKillBurn {
    constructor() {
        let colCount = 29;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - KILL BURN  *****/
        this.nodeMarcoKillBurn = document.createElement("div");
        this.nodeMarcoKillBurn.classList.add("marco-burn");
        document.querySelector("main").append(this.nodeMarcoKillBurn);

        this.TiledImageMarcoKillBurn = new TiledImage(
            "./img/marco-kill-burn.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoKillBurn
        );
        this.TiledImageMarcoKillBurn.changeMinMaxInterval(0, 28);

        // Positions
        this.marcoX = 300;
        this.marcoY = 300;

        this.TiledImageMarcoKillBurn.setPaused(false); // Démarrer l'animation
        this.TiledImageMarcoKillBurn.setLooped(false); // Désactiver la boucle
    }

    tick () {
        this.TiledImageMarcoKillBurn.tick(this.marcoX, this.marcoY);

        return true;
    }
}