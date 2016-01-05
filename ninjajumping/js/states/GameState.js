var gameObject = gameObject || {};

gameObject.GameState = function () {
    "use strict";
    Phaser.State.call(this);
};

gameObject.GameState.prototype = Object.create(Phaser.State.prototype);
gameObject.GameState.prototype.constructor = gameObject.GameState;

gameObject.GameState.prototype.init = function (level_data) {
    "use strict";

};

gameObject.GameState.prototype.preload = function () {
  "use strict";
  this.game.jumpSound = this.game.add.audio('jumpSound');
  this.game.scoreSound = this.game.add.audio('scoreSound');
  // start physics system
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 0;
  // this.game.physics.arcade.gravity.x = -100;

  // this.background = this.game.add.tileSprite(0,0,280,600,'menu_background');
  this.game.stage.backgroundColor = '#fff';

  this.platforms = this.add.group();
  this.obstacles = this.add.group();

  this.platformL = this.game.add.tileSprite(0, 0, 20, this.game.height * 100000, 'platformL');
  this.platformR = this.game.add.tileSprite(this.game.width - 17 , 0, 20, this.game.height * 100000, 'platformR');
  this.platforms.add(this.platformL);
  this.platforms.add(this.platformR);
  this.platforms.enableBody = true;
  this.platforms.physicsBodyType = Phaser.Physics.ARCADE;

  this.player = this.game.add.sprite(21,0, 'player');
  this.player.enableBody = true;
  this.player.physicsBodyType = Phaser.Physics.ARCADE;
  this.player.animations.add('walkL', [0,1,2,3], 10, true);
  this.player.animations.add('walkR', [4,5,6,7], 10, true);

  this.game.physics.enable(this.player);
  this.game.physics.enable(this.obstacles);
  this.game.physics.enable(this.platforms);
  this.platforms.setAll('body.immovable', true);

  }

gameObject.GameState.prototype.create = function () {
    "use strict";
    this.player.body.velocity.x = -50;
    this.player.body.velocity.y = 20;
    this.player.body.gravity.y = 0;
    this.player.side = 'L';
    this.game.score = 0;
    this.player.gameover = false;
    this.world.setBounds(0,0, 280,600);
    this.scoreText = this.game.add.text(180, 5, "Score : " + this.game.score, { font: "18px Arial Bold", fill: "#ff0044", align: "center" });
    this.scoreText.fixedToCamera = true;

    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.jumpKey.onDown.add(this.ninjaJump,this);

    this.obstacleTimer = this.game.time.create(false);
    this.obstacleTimer.start();
    this.generateObstacle();
  }
gameObject.GameState.prototype.update = function () {
    "use strict";
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.obstacles, this.gameover,null, this);

    this.camera.focusOnXY(this.player.x,this.player.y + 270)
    this.world.setBounds(0 , 0 , this.game.width,this.game.height + this.player.y);

    if (this.player.gameover == false && this.player.body.touching.right) {
      this.player.play('walkR');
      this.player.side = 'R';
    }
    if (this.player.gameover == false && this.player.body.touching.left) {
      this.player.play('walkL');
      this.player.side = 'L';
    }
    if (this.player.gameover == true) {
      this.player.body.velocity.y = 0;
      this.player.gameover();
    }
    if ( this.player.gameover == false && this.player.body.velocity.y <= 300) {
    this.player.body.velocity.y += 5;
    }
    else if (this.player.gameover == false &&  300 < this.player.body.velocity.y <= 500 ){
      this.player.body.velocity.y += 1;
    }
    else if (this.player.gameover == false &&  500 < this.player.body.velocity.y <= 700 ){
      this.player.body.velocity.y += 0.5;
    }
    else if (this.player.gameover == false &&  700 < this.player.body.velocity.y <= 900 ){
      this.player.body.velocity.y += 0.1;
    }
    else if (this.player.gameover == false &&  900 < this.player.body.velocity.y <= 1000 ){
      this.player.body.velocity.y += 0.05;
    }

    var game = this;
    this.obstacles.forEach(function (obstacle) {
      if (obstacle.y < game.player.y) {
        obstacle.hasScored = true;
      }
      if (obstacle.hasScored == true && obstacle.y < game.player.y - 50 ) {
        game.game.score += 10;
        obstacle.destroy();
        game.scoreText.setText('Score : ' + game.game.score )
        game.game.scoreSound.play();
      }
    });
    };

gameObject.GameState.prototype.generateObstacle= function () {
    "use strict";
    var RorL = this.game.rnd.integerInRange(-4, 4);
    if (RorL >= 0) {
      this.obstacles.add(new gameObject.ObstacleR(this.game, 19 ,this.player.y + 600));
    } else {
      this.obstacles.add( new gameObject.ObstacleL(this.game, 226 ,this.player.y + 600 ));
    }
    this.obstacleTimer.add(Phaser.Timer.SECOND * this.game.rnd.realInRange(0.3, 1.2) , this.generateObstacle, this);
};

gameObject.GameState.prototype.ninjaJump = function () {
    "use strict";
    if (this.player.side == 'R') {
      this.player.body.velocity.x = -600;
    }
    if (this.player.side == 'L') {
      this.player.body.velocity.x = 600;
    }
    this.game.jumpSound.play();
};

gameObject.GameState.prototype.gameover = function (s1,s2) {
    "use strict";
    // this.game.tween.add(this.world).to({alpha:1}, 2000, Phaser.Easing.Linear.None, true);
    this.gameOver();
};

gameObject.GameState.prototype.gameOver = function(){
  this.game.state.start('GameOverState');
};


// gameObject.GameState.prototype.render = function (object) {
//     "use strict";
//     this.game.debug.cameraInfo(game.camera, 32, 32);
//
// };
