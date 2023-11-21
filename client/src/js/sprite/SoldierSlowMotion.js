import { TiledImage } from '../TiledImage.js';

export class SoldierSlowMotion {
	constructor(x, y, direction) {
		let colCount = 4;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
        this.soldierX = x;
        this.soldierY = y;

        /***** SPRITESHEET - SLOW MOTION  *****/
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
	}

	tick () {
        this.TiledImageSoldierSlowMotion.tick(this.soldierX, this.soldierY);

		return true;
	}
}