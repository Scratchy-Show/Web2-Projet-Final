import { TiledImage } from '../TiledImage.js';

export class ChaingunRobotWaiting{
    static opacity = 1;

    constructor(x, y) {
        let colCount = 16;
        let rowCount = 1;
        let refreshDelay = 100;//
        let loopColumns = true;
        let scale = 1.7;
        this.robotX = x + x;
        this.robotY = y;
        this.opacity = 1;

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

    static reduceOpacity() {
        if (ChaingunRobotWaiting.opacity > 0) {
            ChaingunRobotWaiting.opacity -= 0.25;
            ChaingunRobotWaiting.setOpacity(ChaingunRobotWaiting.opacity);
        }
    }

    static setOpacity(opacity) {
        if (opacity > 1) opacity = 1;
        if (opacity < 0) opacity = 0;
        ChaingunRobotWaiting.opacity = opacity;

        document.querySelector(".chaingun-robot-waiting").style.opacity = ChaingunRobotWaiting.opacity;
    }

    tick () {
        this.TiledImageChaingunRobotWaiting.tick(this.robotX, this.robotY);

        return true;
    }
}