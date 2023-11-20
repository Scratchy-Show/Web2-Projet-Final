import { TiledImage } from '../TiledImage.js';
import { MarcoBreathe } from './MarcoBreathe.js';
import { spriteList } from '../page-index.js';

export class MarcoWakeUp {
	constructor() {
		let colCount = 19;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 1.7;
		let animationTerminee = false;

        /***** SPRITESHEET - WAKE-UP  *****/
		this.nodeMarcoWakeUp = document.createElement("div");
        this.nodeMarcoWakeUp.classList.add("marco");
		document.querySelector("main").append(this.nodeMarcoWakeUp);

		this.TiledImageMarcoWakeUp = new TiledImage(
			"./img/marco-wake-up.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoWakeUp
		);
        this.TiledImageMarcoWakeUp.changeMinMaxInterval(0, 18);

        // Positions
		this.marcoX = 300;
		this.marcoY = window.innerHeight - 180;

		/********** Stop l'animation une fois le fomulaire affiché **********/
		document.querySelector("form").addEventListener("formDisplay", () => {
			this.TiledImageMarcoWakeUp.setPaused(false); // Démarrer l'animation
			this.TiledImageMarcoWakeUp.setLooped(false); // Désactiver la boucle

			// Délais de l'animation
			setTimeout(() => {
				console.log("Fin de l'animation MarcoWakeUp");
				animationTerminee = true;

				if (animationTerminee) {
					spriteList.push(new MarcoBreathe());
					console.log(spriteList);
					spriteList.splice(4, 1);
					this.nodeMarcoWakeUp.remove();
					console.log(spriteList);
				}
			}, 2150);
		});
	}

	tick () {
		this.TiledImageMarcoWakeUp.tick(this.marcoX, this.marcoY);

		return true;
	}
}