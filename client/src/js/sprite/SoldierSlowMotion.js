import { TiledImage } from '../TiledImage.js';
import { SoldierWaiting } from './SoldierWaiting.js';
import { spriteList } from '../page-index.js';

export class SoldierSlowMotion {
	constructor(x, y, direction, marcoX) {
		let colCount = 4;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
        let animationTerminee = false;
        this.soldierX = x;
        this.soldierY = y;
        this.marcoX = marcoX;

        /***** SPRITESHEET - SOLDIER SLOW MOTION  *****/
		this.nodeSoldierSlowMotion = document.createElement("div");
        this.nodeSoldierSlowMotion.classList.add("soldier-slow-motion");
		document.querySelector("main").append(this.nodeSoldierSlowMotion);

		this.TiledImageSoldierSlowMotion = new TiledImage(
			"./img/soldier-slow-motion.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeSoldierSlowMotion
		);
        this.TiledImageSoldierSlowMotion.changeMinMaxInterval(0, 3);

        // Conserve la même direction que le soldat d'origine
        this.direction = direction;
        if (this.direction !== -1) {
            this.nodeSoldierSlowMotion.style.transform = 'scaleX(-1)';
        }

        // Désactiver la boucle
        this.TiledImageSoldierSlowMotion.setLooped(false);

        // Délais de l'animation
        setTimeout(() => {
            animationTerminee = true;

            if (animationTerminee) {
                spriteList.push(new SoldierWaiting(this.soldierX, this.soldierY, this.direction, this.marcoX));
                
                let index = spriteList.indexOf(this);
                if (index !== -1) {
                    spriteList.splice(index, 1);
                }
        
                this.nodeSoldierSlowMotion.remove();
            }
        }, 400);
	}

	tick () {
        this.TiledImageSoldierSlowMotion.tick(this.soldierX, this.soldierY);

		return true;
	}
}