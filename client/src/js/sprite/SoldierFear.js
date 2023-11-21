import { TiledImage } from '../TiledImage.js';
import { SoldierFlees } from './SoldierFlees.js';

import { spriteList } from '../page-index.js';

export class SoldierFear {
	constructor(x, y, direction, marcoX) {
		let colCount = 14;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
		this.animationTerminee = false;
        this.soldierX = x;
        this.soldierY = y;
        this.direction = direction * -1;
        this.speed = 5;
		this.marcoX = marcoX;

        /***** SPRITESHEET - SOLDIER FEAR  *****/
		this.nodeSoldierFear = document.createElement("div");
        this.nodeSoldierFear.classList.add("soldier-fear");
		document.querySelector("main").append(this.nodeSoldierFear);

		this.TiledImageSoldierFear = new TiledImage(
			"./img/soldier-fear.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeSoldierFear
		);
        this.TiledImageSoldierFear.changeMinMaxInterval(0, 13);

        // Conserve la même direction que le soldat d'origine
		if (this.direction !== 1) {
			this.nodeSoldierFear.style.transform = 'scaleX(-1)';
		}

        // Désactive la boucle
        this.TiledImageSoldierFear.setLooped(false);

		// Délais de l'animation
		setTimeout(() => {
            this.animationTerminee = true;

			if (this.animationTerminee) {
                spriteList.push(new SoldierFlees(this.soldierX, this.soldierY, this.direction, this.marcoX));
                
                let index = spriteList.indexOf(this);
                if (index !== -1) {
                    spriteList.splice(index, 1);
                }
        
                this.nodeSoldierFear.remove();
				console.log(spriteList);
            }
        }, 1500);
	}

	tick () {
		// Vérifie si l'animation est terminée
		if (this.animationTerminee) {
			return false;
		}

        // Déplacement
        this.soldierX += this.speed * this.direction;

        this.TiledImageSoldierFear.tick(this.soldierX, this.soldierY);

		return true;
	}
}