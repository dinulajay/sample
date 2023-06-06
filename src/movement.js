export default class Movement {
  constructor(cursors, mainCharacter, facingDirection) {
    console.log("Movement OBJECT initialized");

    this.char = mainCharacter;

    this.cursors = cursors;

    this.facingDirection = facingDirection;
  }

  movement() {
    this.char.setVelocityX(0);
    this.char.setVelocityY(0);

    if (this.cursors.left.isDown) {
      this.char.setVelocityX(-160);
      this.resetDirection("left");
      this.facingDirection["left"] = 1;
    }
    if (this.cursors.right.isDown) {
      this.char.setVelocityX(160);
      this.resetDirection("right");
      this.facingDirection["right"] = 1;
    }
    if (this.cursors.up.isDown) {
      this.char.setVelocityY(-160);
      this.resetDirection("up");
      this.facingDirection["up"] = 1;
    }
    if (this.cursors.down.isDown) {
      this.char.setVelocityY(160);
      this.resetDirection("down");
      this.facingDirection["down"] = 1;
    }
  }

  resetDirection(exclude) {
    Object.keys(this.facingDirection).forEach((key) => {
      if (key !== exclude) this.facingDirection[key] = 0;
    });
  }

  changeAnim() {
    Object.keys(this.facingDirection).forEach((key) => {
      if (this.facingDirection[key]) this.char.play(`player_${key}`, true);
    });
  }
}
