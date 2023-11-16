import { TiledImage } from '../TiledImage.js';

export class MarcoWakeUp {
	constructor() {
		let colCountWakeUp = 19;
        let colCountBreathe = 4;
        let colCountKillBurn = 29;
        let colCountKillFallBack = 10;
        let colCountKillForward = 19;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 1.0;


        //***** SPRITESHEET - WAKE-UP  *****//
		this.nodeMarcoWakeUp = document.createElement("div");
        this.nodeMarcoWakeUp.classList.add("marco");
		document.querySelector("main").append(this.nodeMarcoWakeUp);

		this.TiledImageMarcoWakeUp = new TiledImage(
			"./img/marco-wake-up.png",
			colCountWakeUp,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoWakeUp
		);
        this.TiledImageMarcoWakeUp.changeMinMaxInterval(0, 18);


		//***** SPRITESHEET - BREATHE  *****//
		this.nodeMarcoBreathe = document.createElement("div");
        this.nodeMarcoBreathe.classList.add("marco-breathe");
		document.querySelector("main").append(this.nodeMarcoBreathe);

		this.TiledImageMarcoBreathe = new TiledImage(
			"./img/marco-breathe.png",
			colCountBreathe,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoBreathe
		);
        this.TiledImageMarcoBreathe.changeMinMaxInterval(0, 3);


        //***** SPRITESHEET - KILL BURN  *****//
        this.nodeMarcoKillBurn = document.createElement("div");
        this.nodeMarcoKillBurn.classList.add("marco-burn");
		document.querySelector("main").append(this.nodeMarcoKillBurn);

        this.TiledImageMarcoKillBurn = new TiledImage(
			"./img/marco-kill-burn.png",
			colCountKillBurn,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoKillBurn
		);
        this.TiledImageMarcoKillBurn.changeMinMaxInterval(0, 28);


        //***** SPRITESHEET - KILL FALL BACK  *****//
        this.nodeMarcoKillFallBack = document.createElement("div");
        this.nodeMarcoKillFallBack.classList.add("marco-kill-fall-back");
		document.querySelector("main").append(this.nodeMarcoKillFallBack);

        this.TiledImageMarcoKillFallBack = new TiledImage(
			"./img/marco-kill-fall-back.png",
			colCountKillFallBack,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoKillFallBack
		);
        this.TiledImageMarcoKillFallBack.changeMinMaxInterval(0, 9);


        //***** SPRITESHEET - KILL FORWARD  *****//
        this.nodeMarcoKillForward = document.createElement("div");
        this.nodeMarcoKillForward.classList.add("marco-kill-fall-back");
		document.querySelector("main").append(this.nodeMarcoKillForward);

        this.TiledImageMarcoKillForward = new TiledImage(
			"./img/marco-kill-forward.png",
			colCountKillForward,
			rowCount,
			refreshDelay,
			loopColumns,
			scale,
			this.nodeMarcoKillForward
		);
        this.TiledImageMarcoKillForward.changeMinMaxInterval(0, 18);


        // Positions
		this.marcoX = 300;
		this.marcoY = 300;

		document.querySelector("form").addEventListener('formDisplay', () => {
			this.TiledImageMarcoWakeUp.setLooped(false); // Désactiver la boucle
			this.TiledImageMarcoWakeUp.setPaused(false); // Démarrer l'animation
		});
	}

	tick () {
		this.TiledImageMarcoWakeUp.tick(this.marcoX, this.marcoY);
        this.TiledImageMarcoBreathe.tick(this.marcoX+100, this.marcoY);
        this.TiledImageMarcoKillBurn.tick(this.marcoX+200, this.marcoY);
        this.TiledImageMarcoKillFallBack.tick(this.marcoX+300, this.marcoY);
        this.TiledImageMarcoKillForward.tick(this.marcoX+400, this.marcoY);
		
		return true;
	}
}