import { TiledImage } from '../TiledImage.js';
import { MarcoKillBurn } from './MarcoKillBurn.js';
import { Soldier } from './Soldier.js';

import { spriteList } from '../page-index.js';

export class MarcoBreathe {
    constructor() {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 150;
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

        /********** Ajoute des soldats **********/
        for (let i = 0; i < 5; i++) {
            spriteList.push(new Soldier());
            console.log(spriteList);
        } 

        /********** Marco meurt au click **********/
        let nodeMarcoBreathe = document.querySelector(".marco-breathe");
        nodeMarcoBreathe.onclick = () => {
            spriteList.push(new MarcoKillBurn());
            spriteList.splice(0, 1);
            this.nodeMarcoBreathe.remove();
            console.log(spriteList);
        }

        // Positions
        this.marcoX = 300;
        this.marcoY = window.innerHeight - 180;
    }

    tick () {
        this.TiledImageMarcoBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}