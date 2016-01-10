var gameObject = gameObject || {};

gameObject.RocketEngine = function (game,x,y,key) {
    "use strict";
    Phaser.Emitter.call(this,game,x,y,key);
    game.emitterB = game.add.emitter(0, 0, 20);
    game.emitterB.makeParticles('blueParticle');
    game.emitterB.x = 0;
    game.emitterB.y = this.game.blueRocket.height * 1.8;
    // this.game.emitterB.scale.setTo(0.25);
    game.emitterB.lifespan = 500;
    game.emitterB.frequency = 0;
    game.emitterB.maxParticleSpeed = new Phaser.Point(400,2000);
    game.emitterB.minParticleSpeed = new Phaser.Point(-400,500);
    // console.log(this);
};

gameObject.Meteor.prototype = Object.create(Phaser.Emitter.prototype);
gameObject.Meteor.prototype.constructor = gameObject.Meteor;
