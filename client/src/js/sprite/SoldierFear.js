import { TiledImage } from '../TiledImage.js';

export class SoldierFear {
	constructor(x, y, direction) {
		let colCount = 14;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
        this.soldierX = x;
        this.soldierY = y;

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
        this.direction = direction;
        if (this.direction !== -1) {
            this.nodeSoldierFear.style.transform = 'scaleX(-1)';
        }

        // Désactiver la boucle
        this.TiledImageSoldierFear.setLooped(false);
	}

	tick () {
        this.TiledImageSoldierFear.tick(this.soldierX, this.soldierY);

		return true;
	}
}