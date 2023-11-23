import { TiledImage } from '../TiledImage.js';

export class Bullet{
    constructor(marcoX, marcoY, pull) {
        let colCount = 1;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1;
        this.speed = 8;
        this.bulletX = marcoX + 100;
        this.bulletY = marcoY + 33;
        this.pull = pull;

        /***** SPRITESHEET - BULLET  *****/
        this.nodeBullet = document.createElement("div");
        this.nodeBullet.classList.add("bullet-" + pull);
        document.querySelector("main").append(this.nodeBullet);

        this.TiledImageBullet = new TiledImage(
            "./img/bullet.png",
            colCount,
            rowCount,
            refreshDelay,
            loopColumns,
            scale,
            this.nodeBullet
        );
        this.TiledImageBullet.changeMinMaxInterval(0, 0);
    }

    tick () {
        // Déplacement
        this.bulletX += this.speed;

        this.TiledImageBullet.tick(this.bulletX, this.bulletY);

        return true;
    }
}