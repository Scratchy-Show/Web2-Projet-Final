import { TiledImage } from '../../TiledImage.js';

export class UefoDestroyed{
    constructor(posX ,posY, memberName) {
        let colCount = 22;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.4;
        this.memberName = memberName;
        this.posX = posX;
        this.posY = posY;

        /***** SPRITESHEET - UEFO DESTROYED  *****/
        this.nodeUefoDestroyed = document.createElement("div");
        this.nodeUefoDestroyed.classList.add("uefo-destroyed-" + memberName);
        this.nodeUefoDestroyed.style.zIndex = -10;
        document.querySelector(".chat-main").append(this.nodeUefoDestroyed);

        this.TiledImageUefoDestroyed = new TiledImage(
            "./img/uefo/uefo-destroyed.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeUefoDestroyed
        );
        this.TiledImageUefoDestroyed.changeMinMaxInterval(0, 21);

        // Stop la boucle
        this.TiledImageUefoDestroyed.setLooped(false);
    }

    tick () {
        this.TiledImageUefoDestroyed.tick(this.posX, this.posY);

        return true;
    }
}