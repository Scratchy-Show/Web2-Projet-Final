import { TiledImage } from '../TiledImage.js';
import { SoldierSlowMotion } from './SoldierSlowMotion.js';

import { spriteList } from '../page-index.js';

export class Soldier {
	constructor(marcoX) {
		let colCount = 12;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
        this.speed = Math.random() * 4 + 2;
        this.marcoX = marcoX;

        /***** SPRITESHEET - SOLDIER RUN  *****/
		this.nodeSoldier = document.createElement("div");
        this.nodeSoldier.classList.add("soldier");
		document.querySelector("main").append(this.nodeSoldier);

		this.TiledImageSoldier = new TiledImage(
			"./img/soldier-run.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeSoldier
		);
        this.TiledImageSoldier.changeMinMaxInterval(0, 11);

        // Positions
        this.direction = Math.random() < 0.5 ? 1 : -1; // 1 pour droite, -1 pour gauche
        this.soldierX = this.direction === 1 ? -100 : window.innerWidth + 100; // Position initiale en fonction de la direction
        this.soldierY = window.innerHeight - 180;

        // Inverse l'image si nécessaire
        if (this.direction !== -1) {
            this.nodeSoldier.style.transform = 'scaleX(-1)';
        }

        // Définis aléatoirement z-index
        this.nodeSoldier.style.zIndex = Math.random() > 0.5 ? 10 : 20;
	}

    // Vérifie si un soldat est à côté de Marco
    isNextToMarco = () => {
        let distance = 70;

        let distanceX = Math.abs(this.soldierX - this.marcoX);
        return distanceX <= distance;
    }

	tick () {
        // Déplacement
        this.soldierX += this.speed * this.direction;

        // Applique la nouvelle position
        this.nodeSoldier.style.left = this.soldierX;
        this.nodeSoldier.style.top = this.soldierY;

        // Si le soldat a traversé l'écran, réinitialise sa position
        if ((this.direction === 1 && this.soldierX > window.innerWidth + 100) || (this.direction === -1 && this.soldierX < -100)) {
            this.soldierX = this.direction === 1 ? -100 : window.innerWidth + 100; // Réapparait du côté opposé
        }

        // Si un soldat est à côté de Marco
        if (this.isNextToMarco()) {
            spriteList.push(new SoldierSlowMotion(this.soldierX, this.soldierY, this.direction));

            let index = spriteList.indexOf(this);
            if (index !== -1) {
                spriteList.splice(index, 1);
            }

            this.nodeSoldier.remove();
        }

		this.TiledImageSoldier.tick(this.soldierX, this.soldierY);

		return true;
	}
}