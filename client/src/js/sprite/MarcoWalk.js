import { TiledImage } from '../TiledImage.js';
import { MarcoPull } from './MarcoPull.js';
import { MarcoBreathe } from './MarcoBreathe.js';
import { spriteListRegister } from '../page-register.js';
import { viewRobot } from './ChaingunRobotActivating.js';

export class MarcoWalk {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 90;
        let loopColumns = true;
        let scale = 1.7;
        this.pull = 0;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO WALK  *****/
        this.nodeMarcoWalk = document.createElement("div");
        this.nodeMarcoWalk.classList.add("marco-walk");
        this.nodeMarcoWalk.style.zIndex = 20;
        document.querySelector(".register-main").append(this.nodeMarcoWalk);

        this.TiledImageMarcoWalk = new TiledImage(
            "./img/marco-walk.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoWalk
        );
        this.TiledImageMarcoWalk.changeMinMaxInterval(0, 5);

        /***** Au click Marco tire  *****/
        document.querySelector(".marco-walk").onclick = () => {
            this.pull += 1;
            spriteListRegister.push(new MarcoPull(this.marcoX, this.marcoY, this.pull));

            let index = spriteListRegister.indexOf(this);
            if (index !== -1) {
                spriteListRegister.splice(index, 1);
            }

            this.nodeMarcoWalk.remove();
        }
    }

    stopMarco() {
        if (!document.querySelector(".marco-breathe") && !spriteListRegister.some(sprite => sprite instanceof MarcoBreathe))
            spriteListRegister.push(new MarcoBreathe(this.marcoX, this.marcoY));

        let index = spriteListRegister.indexOf(this);
        if (index !== -1) {
            spriteListRegister.splice(index, 1);
        }

        this.nodeMarcoWalk.remove();
    }

    tick () {
        this.TiledImageMarcoWalk.tick(this.marcoX, this.marcoY);

        // Si le robot est en vue, Marco s'arrête
        if (viewRobot) {
            this.stopMarco();
        }

        return true;
    }
}