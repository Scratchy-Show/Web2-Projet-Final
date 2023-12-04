import { TiledImage } from '../../TiledImage.js';

export class UefoFlying{
    constructor(memberName) {
        let colCount = 16;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1;
        this.memberName = memberName;

        /***** SPRITESHEET - UEFO FLYING  *****/
        this.nodeUefoFlying = document.createElement("div");
        this.nodeUefoFlying.classList.add("uefo-flying-" + memberName);
        document.querySelector(".chat-main").append(this.nodeUefoFlying);

        this.TiledImageUefoFlying = new TiledImage(
            "./img/uefo/uefo-flying.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeUefoFlying
        );
        this.TiledImageUefoFlying.changeMinMaxInterval(0, 15);
    }

    tick () {
        this.TiledImageUefoFlying.tick(this.robotX, this.robotY);

        return true;
    }
}