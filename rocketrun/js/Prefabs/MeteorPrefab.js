var gameObject = gameObject || {};

gameObject.Meteor = function (game,x,y,key) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,key);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    game.physics.arcade.enableBody(this);
    this.body.velocity.y = 500;
    // console.log(this);
};

gameObject.Meteor.prototype = Object.create(Phaser.Sprite.prototype);
gameObject.Meteor.prototype.constructor = gameObject.Meteor;
