import "./styles.css";
import Movement from "./movement.js";
import Animation from "./animation.js";
import Actions from "./actions.js";

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("map", "assets/map_1.png");
    this.load.image("kitten", "assets/kitten_1.png");

    //Tree
    this.load.spritesheet("tree", "assets/spritesheet.png", {
      frameWidth: 24,
      frameHeight: 30
    });

    //Player
    this.load.spritesheet("player", "assets/Basic Charakter Spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48
    });

    this.load.spritesheet("actions", "assets/Basic Charakter Actions.png", {
      frameWidth: 48,
      frameHeight: 48
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 300, "map");

    this.playerDirection = { up: 0, down: 1, right: 0, left: 0 };

    this.animation = new Animation(this.anims);

    this.animation.create();

    const cody = this.add.sprite(100, 100);
    cody.setScale(3);
    this.physics.add.existing(cody, true);

    cody.play("cutdown");

    const player = this.physics.add.sprite(300, 300, "player");
    // player.displayWidth = 48;
    // player.displayHeight = 48;

    // console.log(player)
    player.setScale(3);

    // Code refactoring needed
    player.setSize(14, 14, true);

    this.move = new Movement(this.cursors, player, this.playerDirection);

    this.actions = new Actions(this.cursors, player);

    this.physics.add.collider(player, cody);
  }

  update() {
    this.move.movement();

    this.move.changeAnim();

    this.actions.axe(this.playerDirection);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example,
  antialias: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
      // gravity: { y: 300 }
    }
  }
};

const game = new Phaser.Game(config);
