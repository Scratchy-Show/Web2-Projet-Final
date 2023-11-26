import { TiledImage } from '../../TiledImage.js';
import { spriteListIndex } from '../../page-index.js';
import { SoldierRun } from './SoldierRun.js';

export class SoldierFlees {
	constructor(x, y, direction, marcoX) {
		let colCount = 5;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
        let scale = 1.7;
		this.animationTerminee = false;
        this.speed = 5;
        this.soldierX = x;
        this.soldierY = y;
        this.direction = direction;
        this.marcoX = marcoX;

        /***** SPRITESHEET - SOLDIER FLEES  *****/
		this.nodeSoldierFlees = document.createElement("div");
        this.nodeSoldierFlees.classList.add("soldier-flees");
		document.querySelector(".index-main").append(this.nodeSoldierFlees);

		this.TiledImageSoldierFlees= new TiledImage(
			"./img/soldier/soldier-flees.png",
			colCount,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeSoldierFlees
		);
        this.TiledImageSoldierFlees.changeMinMaxInterval(0, 4);
	}

	tick () {
        // Déplacement
        this.soldierX += this.speed * this.direction;

        // Si le soldat est sorti de l'écran, il est réinitialisé comme SoldierRun
        if ((this.direction === 1 && this.soldierX > window.innerWidth + 100) ||(this.direction === -1 && this.soldierX < -100))
        {
            setTimeout(() => {
                spriteListIndex.push(new SoldierRun(this.marcoX, this.soldierY));
            }, 2500);
            
            let index = spriteListIndex.indexOf(this);
            if (index !== -1)
                spriteListIndex.splice(index, 1);

            this.nodeSoldierFlees.remove();
        }

        this.TiledImageSoldierFlees.tick(this.soldierX, this.soldierY);

        return true;
	}
}