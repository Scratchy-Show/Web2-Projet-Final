import { TiledImage } from '../../TiledImage.js';
import { spriteListRegister } from '../../page-register.js';
import { ChaingunRobotActivating } from './ChaingunRobotActivating.js';

export let destroyedRobot;
export let outDestroyedRobot;

export class ChaingunRobotDestroyed{
    constructor(robotX, robotY, marcoX, marcoY) {
        let colCount = 16;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.animationTerminee = false;
        this.robotX = robotX;
        this.robotY = robotY;
        this.marcoX = marcoX;
        this.marcoY = marcoY;

        /***** SPRITESHEET - CHAINGUN ROBOT DESTROYED  *****/
        this.nodeChaingunRobotDestroyed = document.createElement("div");
        this.nodeChaingunRobotDestroyed.classList.add("chaingun-robot-destroyed");
        document.querySelector(".register-main").append(this.nodeChaingunRobotDestroyed);

        this.TiledImageChaingunRobotDestroyed = new TiledImage(
            "./img/chaingun/chaingun-robot-destroyed.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeChaingunRobotDestroyed
        );
        this.TiledImageChaingunRobotDestroyed.changeMinMaxInterval(0, 15);

        // Stop la boucle
        this.TiledImageChaingunRobotDestroyed.setLooped(false);

        // Délais de l'animation
        setTimeout(() => {
            destroyedRobot = true;
            this.outDestroyedRobot(this.robotX);
        }, 1800);
    }

    outDestroyedRobot(x) {
        let speed = 1;

        const moveRobot = () => {
            // Si le robot sort de l'écran
            if (this.robotX <= -160) {
                this.nodeChaingunRobotDestroyed.remove();
                destroyedRobot = false;
                outDestroyedRobot = true;
                
                // Affiche de nouveau le robot
                spriteListRegister.push(new ChaingunRobotActivating(this.marcoX, this.robotY));
                return false;
            }

            this.robotX -= speed;
            this.nodeChaingunRobotDestroyed.style.transform = `translateX(${this.robotX - this.robotX}px)`;

            // Demande une nouvelle frame du mouvement
            requestAnimationFrame(moveRobot);
        };

        // Démarre le mouvement
        requestAnimationFrame(moveRobot);
    }

    static setOutDestroyedRobot(value) {
        outDestroyedRobot = value;
    }

    tick () {
        this.TiledImageChaingunRobotDestroyed.tick(this.robotX, this.robotY);

        return true;
    }
}