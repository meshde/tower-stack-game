const Stage = require('./stage');
const Block = require('./block');

class Game {
	constructor() {
    this.STATES = {
      LOADING: 'loading',
      PLAYING: 'playing',
      READY: 'ready',
      ENDED: 'ended',
      RESETTING: 'resetting'
    }

    this.blocks = [];
    this.state = this.STATES.LOADING;

		this.stage = new Stage();

		this.mainContainer = document.getElementById('container');
		this.scoreContainer = document.getElementById('score');
		this.startButton = document.getElementById('start-button');
		this.instructions = document.getElementById('instructions');
		this.scoreContainer.innerHTML = '0';

		this.addBlock();
    this.tick();

    for (let key in this.STATES) {
      this.mainContainer.classList.remove(this.STATES[key]);
    }
    this.mainContainer.classList.add(this.STATES.READY);

		document.addEventListener('keydown', e => {
			if(e.keyCode === 32) { // Enter
        // TODO
      }
		});

		document.addEventListener('click', e => {
			// TODO
		});

		document.addEventListener('touchend', e => {
			// TODO
		});
	}

	addBlock() {
		let lastBlock = this.blocks[this.blocks.length - 1];

		this.scoreContainer.innerHTML = String(this.blocks.length - 1);

		const newBlock = new Block(lastBlock);
		this.stage.add(newBlock.mesh);
		this.blocks.push(newBlock);

		this.stage.setCamera(this.blocks.length * 2);
	}

	tick() {
		this.blocks[this.blocks.length - 1].tick();
		this.stage.render();
		requestAnimationFrame(() => {this.tick()});
	}
}

module.exports = Game;
