import { TiledImage } from '../TiledImage.js';
import { MarcoWalk } from './MarcoWalk.js';
import { spriteListRegister } from '../page-register.js';

export class MarcoPull {
    constructor(marcoX, marcoY) {
        let colCount = 10;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO PULL  *****/
        this.nodeMarcoPull = document.createElement("div");
        this.nodeMarcoPull.classList.add("marco-pull");
        this.nodeMarcoPull.style.zIndex = 20;
        document.querySelector(".register-main").append(this.nodeMarcoPull);

        this.TiledImageMarcoPull = new TiledImage(
            "./img/marco-pull.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoPull
        );
        this.TiledImageMarcoPull.changeMinMaxInterval(0, 9);

        // Désactive la boucle
        this.TiledImageMarcoPull.setLooped(false);

        setTimeout(() => {
            spriteListRegister.push(new MarcoWalk(this.marcoX, this.marcoY));

            let index = spriteListRegister.indexOf(this);
            if (index !== -1) {
                spriteListRegister.splice(index, 1);
            }

            this.nodeMarcoPull.remove();
        }, 1200);
    }

    tick () {
        this.TiledImageMarcoPull.tick(this.marcoX, this.marcoY);

        return true;
    }
}