import { TiledImage } from '../../TiledImage.js';
import { spriteListIndex } from '../../page-index.js';
import { MarcoBreathe } from './MarcoBreathe.js';

export class MarcoWakeUp {
	constructor() {
		let colCount = 19;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 1.7;
		let animationTerminee = false;

        /***** SPRITESHEET - MARCO WAKE-UP  *****/
		this.nodeMarcoWakeUp = document.createElement("div");
        this.nodeMarcoWakeUp.classList.add("marco-wake-up");
		this.nodeMarcoWakeUp.style.zIndex = 20;
		document.querySelector(".index-main").append(this.nodeMarcoWakeUp);

		this.TiledImageMarcoWakeUp = new TiledImage(
			"./img/marco/marco-wake-up.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoWakeUp
		);
        this.TiledImageMarcoWakeUp.changeMinMaxInterval(0, 18);

        // Positions
		this.marcoX = window.innerWidth  * 0.4;
		this.marcoY = window.innerHeight - 180;

		/********** Stop l'animation une fois le fomulaire affiché **********/
		document.querySelector("form").addEventListener("formDisplay", () => {
			this.TiledImageMarcoWakeUp.setLooped(false); // Désactive la boucle

			// Délais de l'animation
			setTimeout(() => {
				animationTerminee = true;

				if (animationTerminee) {
					spriteListIndex.push(new MarcoBreathe(this.marcoX, this.marcoY));

					let index = spriteListIndex.indexOf(this);
					if (index !== -1)
						spriteListIndex.splice(index, 1);

					this.nodeMarcoWakeUp.remove();
				}
			}, 2150);
		});
	}

	tick () {
		this.TiledImageMarcoWakeUp.tick(this.marcoX, this.marcoY);

		return true;
	}
}