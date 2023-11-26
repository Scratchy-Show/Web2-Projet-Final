import { TiledImage } from '../../TiledImage.js';
import { spriteListIndex } from '../../page-index.js';
import { MarcoZombie } from './MarcoZombie.js';

export class MarcoKillForward {
    constructor(marcoX, marcoY) {
        let colCount = 19;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.animationTerminee = false;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO KILL FORWARD  *****/
        this.nodeMarcoKillForward = document.createElement("div");
        this.nodeMarcoKillForward.classList.add("marco-kill-forward");
        this.nodeMarcoKillForward.style.zIndex = 20;
        document.querySelector(".index-main").append(this.nodeMarcoKillForward);

        this.TiledImageMarcoKillForward = new TiledImage(
            "./img/marco/marco-kill-forward.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoKillForward
        );
        this.TiledImageMarcoKillForward.changeMinMaxInterval(0, 18);

        // Désactive la boucle
        this.TiledImageMarcoKillForward.setLooped(false);

        // Délais de l'animation
		setTimeout(() => {
            this.animationTerminee = true;

			if (this.animationTerminee) {
                spriteListIndex.push(new MarcoZombie(this.marcoX, this.marcoY));
                
                let index = spriteListIndex.indexOf(this);
                if (index !== -1)
                    spriteListIndex.splice(index, 1);
        
                this.nodeMarcoKillForward.remove();
            }
        }, 3000);
    }

    tick () {
        this.TiledImageMarcoKillForward.tick(this.marcoX, this.marcoY);

        return true;
    }
}