import { TiledImage } from '../TiledImage.js';
import { ChaingunRobotWaiting } from './ChaingunRobotWaiting.js';
import { spriteListRegister } from '../page-register.js';

export let viewRobot;

export class ChaingunRobotActivating{
    constructor(x, y) {
        let colCount = 9;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;
        this.animationTerminee = false;

        /***** SPRITESHEET - CHAINGUN ROBOT ACTIVATING  *****/
        this.nodeChaingunRobotActivating = document.createElement("div");
        this.nodeChaingunRobotActivating.classList.add("chaingun-robot-activating");
        document.querySelector(".register-main").append(this.nodeChaingunRobotActivating);

        this.TiledImageChaingunRobotActivating = new TiledImage(
            "./img/chaingun-robot-activating.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeChaingunRobotActivating
        );
        this.TiledImageChaingunRobotActivating.changeMinMaxInterval(0, 8);

        // Positions
        this.robotX = window.innerWidth / 1.5;
        this.robotY = y;

        // Stop l'animation
        this.TiledImageChaingunRobotActivating.setPaused(true);

        // Délais de l'animation
        setTimeout(() => {
            this.animationTerminee = true;

            if (this.animationTerminee) {
                spriteListRegister.push(new ChaingunRobotWaiting(this.robotX, this.robotY));
                
                let index = spriteListRegister.indexOf(this);
                if (index !== -1) {
                    spriteListRegister.splice(index, 1);
                }
        
                this.nodeChaingunRobotActivating.remove();
            }
        }, 6300);

        this.appearanceRobot();
    }

    appearanceRobot() {
        let speed = 1;
        let stopPosition = 500;

        const moveRobot = () => {
            if (this.robotX <= stopPosition) {
                // Actve l'animation
                this.TiledImageChaingunRobotActivating.setPaused(false);

                // Stop la boucle
                this.TiledImageChaingunRobotActivating.setLooped(false);
                
                viewRobot = true;

                return false;
            }

            this.robotX -= speed;
            this.nodeChaingunRobotActivating.style.transform = `translateX(${this.robotX}px)`;
    
            // Demande une nouvelle frame du mouvement
            requestAnimationFrame(moveRobot);
        };
    
        // Démarre le mouvement
        requestAnimationFrame(moveRobot);
    }

    tick () {
        this.TiledImageChaingunRobotActivating.tick(this.robotX, this.robotY);

        return true;
    }
}