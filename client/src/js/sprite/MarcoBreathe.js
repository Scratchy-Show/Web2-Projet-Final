import { TiledImage } from '../TiledImage.js';
import { SoldierRun } from './SoldierRun.js';
import { MarcoKillForward } from './MarcoKillForward.js';
import { spriteListIndex } from '../page-index.js';

export class MarcoBreathe {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO BREATHE  *****/
        this.nodeMarcoBreathe = document.createElement("div");
        this.nodeMarcoBreathe.classList.add("marco-breathe");
        this.nodeMarcoBreathe.style.zIndex = 20;
        if (document.querySelector(".index-main"))
            document.querySelector(".index-main").append(this.nodeMarcoBreathe);
        if (document.querySelector(".register-main")) {
            this.nodeMarcoBreathe.classList.add("marco-hidden");
            document.querySelector(".register-main").append(this.nodeMarcoBreathe);
            setTimeout(() => {
                this.nodeMarcoBreathe.classList.remove("marco-hidden");
            }, 500);
        }

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
            spriteListIndex.push(new MarcoKillForward(this.marcoX, this.marcoY));

            let index = spriteListIndex.indexOf(this);
            if (index !== -1) {
                spriteListIndex.splice(index, 1);
            }

            this.nodeMarcoBreathe.remove();
        }

        /********** Ajoute des soldats après un délai **********/
        if (document.querySelector(".index-main")) {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    spriteListIndex.push(new SoldierRun(this.marcoX, this.marcoY));
                }, i * 2000);
            }
        }
    }

    tick () {
        this.TiledImageMarcoBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}