var gameObject = gameObject || {};

gameObject.Rocket = function (game,x,y,key,track) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,key);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    game.physics.arcade.enableBody(this);
    this.track = track;
    this.animations.add("run",[0,1,2],10,true);
    // console.log(this);
};

gameObject.Rocket.prototype = Object.create(Phaser.Sprite.prototype);
gameObject.Rocket.prototype.constructor = gameObject.Rocket;
