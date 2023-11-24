import { TiledImage } from '../TiledImage.js';

export class ChaingunRobotWaiting{
    constructor(x, y) {
        let colCount = 16;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.robotX = x + x;
        this.robotY = y;

        /***** SPRITESHEET - CHAINGUN ROBOT WAITING  *****/
        this.nodeChaingunRobotWaiting = document.createElement("div");
        this.nodeChaingunRobotWaiting.classList.add("chaingun-robot-waiting");
        document.querySelector(".register-main").append(this.nodeChaingunRobotWaiting);

        this.TiledImageChaingunRobotWaiting = new TiledImage(
            "./img/chaingun-robot-waiting.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeChaingunRobotWaiting
        );
        this.TiledImageChaingunRobotWaiting.changeMinMaxInterval(0, 15);
    }

    tick () {
        this.TiledImageChaingunRobotWaiting.tick(this.robotX, this.robotY);

        return true;
    }
}