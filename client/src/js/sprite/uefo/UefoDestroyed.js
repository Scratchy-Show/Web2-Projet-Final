import { TiledImage } from '../../TiledImage.js';
import { spriteListChat } from '../../page-chat.js';
import { UefoFlying } from '../uefo/UefoFlying.js';

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

        // Délais de l'animation
        setTimeout(() => {
            let index = spriteListChat.indexOf(this);
            if (index !== -1)
                spriteListChat.splice(index, 1);

            this.nodeUefoDestroyed.remove();

            setTimeout(() => {
                // Recrée un UefoFlying après la destruction
                let newUefoFlyingX = Math.random() * window.innerWidth;
                let newUefoFlyingY = Math.random() * window.innerHeight;
                let newUefoFlying = new UefoFlying(memberName);
                
                newUefoFlying.x = newUefoFlyingX;
                newUefoFlying.y = newUefoFlyingY;

                spriteListChat.push(newUefoFlying);
            }, 1000);

        }, 2300);
    }

    tick () {
        this.TiledImageUefoDestroyed.tick(this.posX, this.posY);

        return true;
    }
}