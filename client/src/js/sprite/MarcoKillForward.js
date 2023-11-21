import { TiledImage } from '../TiledImage.js';
import { MarcoZombie } from './MarcoZombie.js';
import { spriteList } from '../page-index.js';

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

        /***** SPRITESHEET - KILL FORWARD  *****/
        this.nodeMarcoKillForward = document.createElement("div");
        this.nodeMarcoKillForward.classList.add("marco-kill-forward");
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

        this.TiledImageMarcoKillForward.setLooped(false); // Désactiver la boucle

        // Délais de l'animation
		setTimeout(() => {
            this.animationTerminee = true;

			if (this.animationTerminee) {
                spriteList.push(new MarcoZombie(this.marcoX, this.marcoY));
                
                let index = spriteList.indexOf(this);
                if (index !== -1) {
                    spriteList.splice(index, 1);
                }
        
                this.nodeMarcoKillForward.remove();
            }
        }, 3000);
    }

    tick () {
        this.TiledImageMarcoKillForward.tick(this.marcoX, this.marcoY);

        return true;
    }
}