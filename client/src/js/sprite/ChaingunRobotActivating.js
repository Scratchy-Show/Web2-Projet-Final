import { TiledImage } from '../TiledImage.js';

export let viewRobot = false

export class ChaingunRobotActivating{
    constructor(x, y) {
        let colCount = 9;
        let rowCount = 1;
        let refreshDelay = 150;
        let loopColumns = true;
        let scale = 1.7;

        /***** SPRITESHEET - CHAINGUN ROBOT ACTIVATING  *****/
        this.nodeChaingunRobotActivating = document.createElement("div");
        this.nodeChaingunRobotActivating.classList.add("chaingun-robot-activating");
        document.querySelector("main").append(this.nodeChaingunRobotActivating);

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