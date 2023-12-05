import { TiledImage } from '../../TiledImage.js';
import { spriteListChat } from '../../page-chat.js';
import { UefoFlying } from '../uefo/UefoFlying.js';

export class MarcoSpace{
    constructor(posX, posY) {
        let colCount = 68;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.7;
        this.posX = posX;
        this.posY = posY;

        /***** SPRITESHEET - MARCO SPACE  *****/
        this.nodeMarcoSpace = document.createElement("div");
        this.nodeMarcoSpace.classList.add("marco-space");
        this.nodeMarcoSpace.style.zIndex = 20;
        document.querySelector(".chat-main").append(this.nodeMarcoSpace);

        this.TiledImageMarcoSpace = new TiledImage(
            "./img/marco/marco-space.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeMarcoSpace
        );
        this.TiledImageMarcoSpace.changeMinMaxInterval(0, 67);
    }

    tick () {
        this.TiledImageMarcoSpace.tick(this.posX, this.posY);

        return true;
    }
}