import { TiledImage } from '../../TiledImage.js';
import { spriteListIndex } from '../../page-index.js';
import { spriteListRegister } from '../../page-register.js';
import { backgroundMove } from '../../page-register.js';
import { viewRobot } from '../chaingun/ChaingunRobotActivating.js';
import { SoldierRun } from '../soldier/SoldierRun.js';
import { MarcoWalk } from './MarcoWalk.js';
import { MarcoPullBreathe } from './MarcoPullBreathe.js';
import { MarcoKillForward } from './MarcoKillForward.js';

export class MarcoBreathe {
    constructor(marcoX, marcoY) {
        let colCount = 6;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - MARCO BREATHE  *****/
        this.nodeMarcoBreathe = document.createElement("div");
        this.nodeMarcoBreathe.classList.add("marco-breathe");
        this.nodeMarcoBreathe.style.zIndex = 20;

        this.TiledImageMarcoBreathe = new TiledImage(
            "./img/marco/marco-breathe.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoBreathe
        );
        this.TiledImageMarcoBreathe.changeMinMaxInterval(0, 5);

        /********** INDEX.HTML **********/
        if (document.querySelector(".index-main")) {

            document.querySelector(".index-main").append(this.nodeMarcoBreathe);

            // Au click Marco meurt
            document.querySelector(".marco-breathe").onclick = () => {
                spriteListIndex.push(new MarcoKillForward(this.marcoX, this.marcoY));

                let index = spriteListIndex.indexOf(this);
                if (index !== -1)
                    spriteListIndex.splice(index, 1);

                this.nodeMarcoBreathe.remove();
            }
  
            //Ajoute des soldats après un délai
            for (let i = 0; i < 6; i++)
                setTimeout(() => {
                    spriteListIndex.push(new SoldierRun(this.marcoX, this.marcoY));
                }, i * 2000);
        }

        /********** REGISTER.HTML **********/
        if (document.querySelector(".register-main")) {

            this.nodeMarcoBreathe.classList.add("marco-hidden");

            // si robot en vue, l'apparition de départ ne s'applique pas
            if (viewRobot)
                this.nodeMarcoBreathe.classList.remove("marco-hidden");

            document.querySelector(".register-main").append(this.nodeMarcoBreathe);

            // Marco apparaît
            setTimeout(() => {
                this.nodeMarcoBreathe.classList.remove("marco-hidden");
            }, 500);

            /***** Au click Marco tire  *****/
            document.querySelector(".marco-breathe").onclick = () => {
                spriteListRegister.push(new MarcoPullBreathe(this.marcoX, this.marcoY));

                let index = spriteListRegister.indexOf(this);
                if (index !== -1)
                    spriteListRegister.splice(index, 1);

                this.nodeMarcoBreathe.remove();
            }
        }

        /********** CHAT.HTML **********/
        if (document.querySelector(".chat-main")) {

            this.nodeMarcoBreathe.classList.add("marco-hidden");

            document.querySelector(".chat-main").append(this.nodeMarcoBreathe);

            // Marco apparaît
            setTimeout(() => {
                this.nodeMarcoBreathe.classList.remove("marco-hidden");
            }, 500);
        }
    }

    tick () {
        /********** REGISTER.HTML **********/
        if (document.querySelector(".register-main")) {
            // Marco marche en même temps que le background se déplace
            if (backgroundMove) {
                // Si MarcoWalk n'existe pas
                if (!document.querySelector(".marco-walk") && backgroundMove)
                    spriteListRegister.push(new MarcoWalk(this.marcoX, this.marcoY));

                let index = spriteListRegister.indexOf(this);
                if (index !== -1)
                    spriteListRegister.splice(index, 1);

                this.nodeMarcoBreathe.remove();
            }
        }

        this.TiledImageMarcoBreathe.tick(this.marcoX, this.marcoY);

        return true;
    }
}