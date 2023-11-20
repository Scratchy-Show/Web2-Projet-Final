import { TiledImage } from '../TiledImage.js';

export class Soldier {
	constructor() {
		let colCount = 12;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
        this.speed = Math.random() * 3 + 1;

        /***** SPRITESHEET - WAKE-UP  *****/
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
		this.TiledImageSoldier.tick(this.soldierX, this.soldierY);

		return true;
	}
}