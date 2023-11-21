import { TiledImage } from '../TiledImage.js';
import { MarcoKillForward } from './MarcoKillForward.js';
import { SoldierRun } from './SoldierRun.js';

import { spriteList } from '../page-index.js';

export class MarcoBreathe {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

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

        /********** Marco meurt au click **********/
        let nodeMarcoBreathe = document.querySelector(".marco-breathe");
        nodeMarcoBreathe.onclick = () => {
            spriteList.push(new MarcoKillForward(this.marcoX, this.marcoY));

            let index = spriteList.indexOf(this);
            if (index !== -1) {
                spriteList.splice(index, 1);
            }

            this.nodeMarcoBreathe.remove();
        }

        // Définis z-index
        this.nodeMarcoBreathe.style.zIndex = 20;

        /********** Ajoute des soldats avec un délai **********/
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                spriteList.push(new SoldierRun(this.marcoX));
            }, i * 2000);
        }
    }

    tick () {
        this.TiledImageMarcoBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}