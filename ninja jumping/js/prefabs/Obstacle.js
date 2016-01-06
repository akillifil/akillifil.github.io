var gameObject = gameObject || {};

gameObject.ObstacleL = function (game,x,y,frame) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,'treeL');
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.hasScored = false;
};

gameObject.ObstacleL.prototype = Object.create(Phaser.Sprite.prototype);
gameObject.ObstacleL.prototype.constructor = gameObject.ObstacleL;

gameObject.ObstacleR = function (game,x,y,frame) {
  "use strict";
    Phaser.Sprite.call(this,game,x,y,'treeR');
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.hasScored = false;
};

gameObject.ObstacleR.prototype = Object.create(Phaser.Sprite.prototype);
gameObject.ObstacleR.prototype.constructor = gameObject.ObstacleR;
