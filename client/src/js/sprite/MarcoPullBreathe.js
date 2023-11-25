import { TiledImage } from '../TiledImage.js';
import { MarcoWalk } from './MarcoWalk.js';
import { MarcoBreathe } from './MarcoBreathe.js';
import { Bullet } from './Bullet.js';
import { spriteListRegister } from '../page-register.js';
import { viewRobot } from './ChaingunRobotActivating.js';

export class MarcoPullBreathe {
    constructor(marcoX, marcoY) {
        let colCount = 10;
        let rowCount = 1;
        let refreshDelay = 80;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO PULL BREATHE  *****/
        this.nodeMarcoPullBreathe = document.createElement("div");
        this.nodeMarcoPullBreathe.classList.add("marco-pull-breathe");
        this.nodeMarcoPullBreathe.style.zIndex = 20;
        document.querySelector(".register-main").append(this.nodeMarcoPullBreathe);

        this.TiledImageMarcoPullBreathe = new TiledImage(
            "./img/marco-pull-breathe.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoPullBreathe
        );
        this.TiledImageMarcoPullBreathe.changeMinMaxInterval(0, 9);

        // Désactive la boucle
        this.TiledImageMarcoPullBreathe.setLooped(false);

        spriteListRegister.push(new Bullet(this.marcoX, this.marcoY));

        // Affiche de nouveau Marco
        setTimeout(() => {
            // Si il y a pas de robot
            if(!viewRobot)
                if (!document.querySelector(".marco-walk"))
                    spriteListRegister.push(new MarcoWalk(this.marcoX, this.marcoY));

            // Si il y a un robot        
            if(viewRobot) {
                if (!document.querySelector(".marco-walk"))
                    if (!document.querySelector(".marco-breathe") && !spriteListRegister.some(sprite => sprite instanceof MarcoBreathe))
                        spriteListRegister.push(new MarcoBreathe(this.marcoX, this.marcoY));
            }

            let index = spriteListRegister.indexOf(this);
            if (index !== -1)
                spriteListRegister.splice(index, 1);

            this.nodeMarcoPullBreathe.remove();
        }, 400);
    }

    tick () {
        this.TiledImageMarcoPullBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}