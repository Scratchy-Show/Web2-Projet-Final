import { TiledImage } from '../../TiledImage.js';
import { spriteListIndex } from '../../page-index.js';
import { SoldierFear } from './SoldierFear.js';

export class SoldierWaiting {
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

        /***** SPRITESHEET - SOLDIER WAITING  *****/
		this.nodeSoldierWaiting = document.createElement("div");
        this.nodeSoldierWaiting.classList.add("soldier-waiting");
		document.querySelector(".index-main").append(this.nodeSoldierWaiting);

		this.TiledImageSoldierWaiting= new TiledImage(
			"./img/soldier/soldier-waiting.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeSoldierWaiting
		);
        this.TiledImageSoldierWaiting.changeMinMaxInterval(0, 3);

        // Conserve la même direction que le soldat d'origine
        this.direction = direction;
        if (this.direction !== -1)
            this.nodeSoldierWaiting.style.transform = 'scaleX(-1)';

        // Désactive la boucle
        this.TiledImageSoldierWaiting.setLooped(false);

		// Délais de l'animation
		setTimeout(() => {
			animationTerminee = true;

			if (animationTerminee) {
				spriteListIndex.push(new SoldierFear(this.soldierX, this.soldierY, this.direction, this.marcoX));
				
				let index = spriteListIndex.indexOf(this);
				if (index !== -1)
					spriteListIndex.splice(index, 1);
		
				this.nodeSoldierWaiting.remove();
			}
		}, 1000);
	}

	tick () {
        this.TiledImageSoldierWaiting.tick(this.soldierX, this.soldierY);

		return true;
	}
}