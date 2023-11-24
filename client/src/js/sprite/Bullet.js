import { TiledImage } from '../TiledImage.js';
import { spriteListRegister } from '../page-register.js';

export class Bullet{
    constructor(marcoX, marcoY) {
        let colCount = 1;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1;
        this.speed = 8;
        this.bulletX = marcoX + 100;
        this.bulletY = marcoY + 33;

        /***** SPRITESHEET - BULLET  *****/
        this.nodeBullet = document.createElement("div");
        this.nodeBullet.classList.add("bullet");
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

        // Si la balle est hors de l'écran
        if (this.bulletX > window.innerWidth) {
            // Supprime Bullet
            const index = spriteListRegister.indexOf(this);
            if (index !== -1) {
                spriteListRegister.splice(index, 1);
            }
            
            this.nodeBullet.remove();
        } else
            this.TiledImageBullet.tick(this.bulletX, this.bulletY);

        return true;
    }
}