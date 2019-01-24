const THREE = require('three');

const config = require('./config');

class Block {
  constructor(lastBlock, shouldReplace=false) {
    this.MOVE_AMOUNT = 12;

    this.dimension = {};

    this.position = {};

    const blockConfig = config.block;

    // set the dimensions from the target block, or defaults.
    let height, width, depth;
    let x,y,z;

    if (lastBlock){
      width = lastBlock.dimension.width;
      height = lastBlock.dimension.height;
      depth = lastBlock.dimension.depth;

      if (shouldReplace === true) {
        x = lastBlock.position.x;
        y = lastBlock.position.y;
        z = lastBlock.position.z;
      } else {
        x = 0;
        y = lastBlock.position.y + blockConfig.initHeight;
        z = 0;
      }

    } else {
      width = blockConfig.initWidth;
      height = blockConfig.initHeight;
      depth = blockConfig.initDepth;

      x = 0;
      y = height;
      z = 0;
    }
    this.dimension.width = width;
    this.dimension.height = height;
    this.dimension.depth = depth;

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;

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
}


class NormalBlock extends Block {
  constructor(lastBlock, shouldReplace=false) {
    super(lastBlock, shouldReplace);
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

class FallingBlock extends Block {
  constructor(lastBlock) {
    super(lastBlock, true);
    this.speed *= 2;
    this.direction = this.speed;
  }

  tick() {
    let value = this.position.y;
    this.position.y -= Math.abs(this.direction);
    this.mesh.position.y = this.position.y;
  }
}

module.exports = {
  NormalBlock,
  FallingBlock,
}
