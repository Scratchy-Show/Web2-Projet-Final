import { TiledImage } from '../../TiledImage.js';
import { spriteListRegister } from '../../page-register.js';
import { backgroundMove } from '../../page-register.js';
import { MarcoPullWalk } from './MarcoPullWalk.js';
import { MarcoBreathe } from './MarcoBreathe.js';

export class MarcoWalk {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 90;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO WALK  *****/
        this.nodeMarcoWalk = document.createElement("div");
        this.nodeMarcoWalk.classList.add("marco-walk");
        this.nodeMarcoWalk.style.zIndex = 20;
        document.querySelector(".register-main").append(this.nodeMarcoWalk);

        this.TiledImageMarcoWalk = new TiledImage(
            "./img/marco/marco-walk.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoWalk
        );
        this.TiledImageMarcoWalk.changeMinMaxInterval(0, 5);

        /***** Au survol de la souris Marco tire  *****/
        document.querySelector(".marco-walk").onmouseover = () => {
            spriteListRegister.push(new MarcoPullWalk(this.marcoX, this.marcoY));

            let index = spriteListRegister.indexOf(this);
            if (index !== -1)
                spriteListRegister.splice(index, 1);

            this.nodeMarcoWalk.remove();
        }
    }

    stopMarco() {
        if (!document.querySelector(".marco-breathe") && !spriteListRegister.some(sprite => sprite instanceof MarcoBreathe))
            spriteListRegister.push(new MarcoBreathe(this.marcoX, this.marcoY));

        let index = spriteListRegister.indexOf(this);
        if (index !== -1)
            spriteListRegister.splice(index, 1);

        this.nodeMarcoWalk.remove();
    }

    tick () {
        this.TiledImageMarcoWalk.tick(this.marcoX, this.marcoY);

        // Si le background ne bouge pas, Marco s'arrête
        if (!backgroundMove)
            this.stopMarco();

        return true;
    }
}