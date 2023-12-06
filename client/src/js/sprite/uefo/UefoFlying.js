import { TiledImage } from '../../TiledImage.js';

export class UefoFlying{
    constructor(memberName) {
        let colCount = 16;
        let rowCount = 1;
        let refreshDelay = 100;
        let loopColumns = true;
        let scale = 1.4;
        this.memberName = memberName;
        this.speed = 2;
        this.speedX = (Math.random() > 0.5 ? 1 : -1) * this.speed; // +x ou -x
        this.speedY = (Math.random() > 0.5 ? 1 : -1) * this.speed; // +y ou -y
        this.x = Math.random() * 700 + 100;
        this.y = Math.random() * 500 + 100;

        /***** SPRITESHEET - UEFO FLYING  *****/
        this.nodeUefoFlying = document.createElement("div");
        this.nodeUefoFlying.classList.add("uefo-flying-" + memberName);
        this.nodeUefoFlying.style.zIndex = -10;
        this.nodeUefoFlying.style.top = this.y + "px";
        this.nodeUefoFlying.style.left = this.x + "px";
        document.querySelector(".chat-main").append(this.nodeUefoFlying);

        // Pour afficher le nom du membre
        this.nodeMemberName = document.createElement("div");
        this.nodeMemberName.classList.add("member-name-" + memberName);
        this.nodeMemberName.textContent = memberName;
        this.nodeMemberName.style.zIndex = -10;
        this.nodeMemberName.style.position = "absolute";
        this.nodeMemberName.style.top = (this.y + this.nodeUefoFlying.offsetHeight) + "px";
        this.nodeMemberName.style.left = this.x + "px";
        this.nodeMemberName.style.color = "white";
        document.querySelector(".chat-main").append(this.nodeMemberName);

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
        // Calcul des nouvelles positions
        let newX = this.x + this.speedX;
        let newY = this.y + this.speedY;

        // Vérifie si les nouvelles positions sont toujours dans les limites de la fenêtre
        if (newX >= 0 && newX + this.nodeUefoFlying.offsetWidth <= window.innerWidth)
            this.x = newX;
        else
            // Inverse la direction si la nouvelle position dépasse les limites horizontales
            this.speedX = -this.speedX;

        if (newY >= 0 && newY + this.nodeUefoFlying.offsetHeight <= window.innerHeight)
            this.y = newY;
        else
            // Inverse la direction si la nouvelle position dépasse les limites verticales
            this.speedY = -this.speedY;

        // Met à jour la position
        this.nodeUefoFlying.style.top = this.y + "px";
        this.nodeUefoFlying.style.left = this.x + "px";

        // Met à jour la position du nom du membre
        this.nodeMemberName.style.top = (this.y + this.nodeUefoFlying.offsetHeight) + "px";
        this.nodeMemberName.style.left = this.x + "px";

        this.TiledImageUefoFlying.tick(newX, newY);

        return true;
    }
}