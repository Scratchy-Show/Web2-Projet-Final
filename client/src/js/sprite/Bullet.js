import { TiledImage } from '../TiledImage.js';
import { ChaingunRobotWaiting } from './ChaingunRobotWaiting.js';
import { ChaingunRobotDestroyed } from './ChaingunRobotDestroyed.js';
import { spriteListRegister } from '../page-register.js';

export class Bullet{
    constructor(marcoX, marcoY) {
        let colCount = 1;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1;
        this.speed = 8;
        this.marcoX = marcoX;
        this.marcoY = marcoY;
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

    removeBullet() {
        const index = spriteListRegister.indexOf(this);
        if (index !== -1) {
            spriteListRegister.splice(index, 1);
        }

        if (this.nodeBullet.parentNode) {
            this.nodeBullet.parentNode.removeChild(this.nodeBullet);
        }
    }

    checkCollisionWithRobot() {
        let robot = spriteListRegister.find(sprite => sprite instanceof ChaingunRobotWaiting);

        if (robot && this.bulletX >= robot.robotX) {
            return true;
        }
        return false;
    }

    tick () {
        // Déplacement
        this.bulletX += this.speed;

        // Si la balle est hors de l'écran
        if (this.bulletX > window.innerWidth) {
            this.removeBullet();
        } else {
            // Vérifie la collision avec le robot
            let hitRobot = this.checkCollisionWithRobot();

            // Collision
            if (hitRobot) {
                this.removeBullet();
                ChaingunRobotWaiting.reduceOpacity();

                if (ChaingunRobotWaiting.opacity <= 0.21) {
                    let robot = spriteListRegister.find(sprite => sprite instanceof ChaingunRobotWaiting);
                    let robotIndex = spriteListRegister.findIndex(sprite => sprite instanceof ChaingunRobotWaiting);

                    spriteListRegister.push(new ChaingunRobotDestroyed(robot.robotX, robot.robotY));

                    if (robotIndex !== -1)
                        spriteListRegister.splice(robotIndex, 1);

                    if (ChaingunRobotWaiting.nodeChaingunRobotWaiting)
                        ChaingunRobotWaiting.nodeChaingunRobotWaiting.remove();
                }
            } else {
                this.TiledImageBullet.tick(this.bulletX, this.bulletY);
            }
        }
        return true;
    }
}