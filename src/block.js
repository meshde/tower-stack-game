const THREE = require('three');

const config = require('./config');

class Block {
  constructor() {
    this.MOVE_AMOUNT = 12;

    this.dimension = {};

    this.position = {};

    const blockConfig = config.block;

    // set the dimensions from the target block, or defaults.
    this.dimension.width = blockConfig.initWidth;
    this.dimension.height = blockConfig.initHeight;
    this.dimension.depth = blockConfig.initDepth;

    this.position.x = 0;
    this.position.y = this.dimension.height;
    this.position.z = 0;

    this.colorOffset = Math.round(Math.random() * 100);

    // set color
    this.color = new THREE.Color(blockConfig.initColor);

    // set direction
    let speed = blockConfig.initSpeed + blockConfig.acceleration;
    speed = Math.min(speed, blockConfig.maxSpeed);
    this.speed = -speed;
    this.direction = this.speed;

    // create block
    let geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.dimension.width / 2,
      this.dimension.height / 2, this.dimension.depth / 2));
    this.material = new THREE.MeshToonMaterial({
      color: this.color,
      shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(this.position.x,
      this.position.y, this.position.z);
  }

  reverseDirection() {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
  }

  tick() {
    let value = this.position.x;
    if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) {
      this.reverseDirection();
    }
    this.position.x += this.direction;
    this.mesh.position.x = this.position.x;
  }
}

module.exports = Block;
