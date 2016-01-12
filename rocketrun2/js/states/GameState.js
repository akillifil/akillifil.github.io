var gameObject = gameObject || {};

gameObject.GameState = function () {
    "use strict";
    Phaser.State.call(this);
};

gameObject.GameState.prototype = Object.create(Phaser.State.prototype);
gameObject.GameState.prototype.constructor = gameObject.GameState;

// blue outline : d3d1e2
// blue dark : 424898
// blue light : 5d5ea4

// red outline : fbc8b4
// red dark : ee273a
// red light : d86456

// bg 213cb0 33,60,176
// cizgi 7FBAFC 127,186,252

gameObject.GameState.prototype.preload = function () {
  "use strict";
  this.game.guides = {
    "middle" : this.game.width / 2,
    "blueMid" : this.game.width / 4,
    "redMid" : this.game.width * 3/4,
    "blueSpawn1" : this.game.width / 8,
    "blueSpawn2" : ((this.game.width / 4) + (this.game.width / 2)) / 2,
    "redSpawn1" : ((this.game.width * 3/4) + (this.game.width / 2)) / 2,
    "redSpawn2" : ((this.game.width * 3/4) + this.game.width ) / 2
  }
  // this.game.bg = this.game.add.image(0,0,'bg');
  this.game.stage.backgroundColor = 0x213cb0;
  // Divede Screen
  this.game.divisionLine = this.game.add.graphics();
  this.game.divisionLine.moveTo(this.game.guides.middle, 0);
  this.game.divisionLine.lineStyle(8, 0x7FBAFC);
  this.game.divisionLine.lineTo(this.game.width / 2, this.game.height);

  // Guide Lines For Rockets
  this.game.divisionLine.lineStyle(3, 0x7FBAFC);
  this.game.divisionLine.moveTo(this.game.guides.redMid, 0);
  this.game.divisionLine.lineTo(this.game.guides.redMid, this.game.height);

  this.game.divisionLine.moveTo(this.game.guides.blueMid, 0);
  this.game.divisionLine.lineTo(this.game.guides.blueMid, this.game.height);

  // Add Rockets
  this.game.rockets = this.game.add.group();
  this.game.blueRocket = this.game.add.sprite(this.game.guides.blueSpawn1,this.game.height - 600,'blueRocket');
  this.game.blueRocket.scale.setTo(0.25);
  this.game.blueRocket.anchor.setTo(0.5);
  this.game.blueRocket.track = "blueSpawn1";
  this.game.blueRocket.animations.add("run",[0,1,2],10,true);
  this.game.rockets.add(this.game.blueRocket);
  this.game.emitterB = game.add.emitter(0, 0, 20);
  this.game.emitterB.makeParticles('blueParticle');
  this.game.emitterB.x = 0;
  this.game.emitterB.y = this.game.blueRocket.height * 1.8;
  // this.game.emitterB.scale.setTo(0.25);
  this.game.emitterB.lifespan = 500;
  this.game.emitterB.frequency = 0;
  this.game.emitterB.maxParticleSpeed = new Phaser.Point(400,2000);
  this.game.emitterB.minParticleSpeed = new Phaser.Point(-400,500);
  this.game.blueRocket.addChild(this.game.emitterB);


  this.game.rockets.add(this.game.blueRocket);
  this.game.redRocket = this.game.add.sprite(this.game.guides.redSpawn2,this.game.height - 600,'redRocket');
  this.game.redRocket.scale.setTo(0.25);
  this.game.redRocket.anchor.setTo(0.5);
  this.game.redRocket.track = "redSpawn2";
  this.game.redRocket.animations.add("run",[0,1,2],10,true);
  this.game.rockets.add(this.game.redRocket);
  this.game.emitterR = game.add.emitter(0, 0, 20);
  this.game.emitterR.makeParticles('redParticle');
  this.game.emitterR.x = 0;
  this.game.emitterR.y = this.game.redRocket.height * 1.8;
  // this.game.emitterB.scale.setTo(0.25);
  this.game.emitterR.lifespan = 500;
  this.game.emitterR.frequency = 0;
  this.game.emitterR.maxParticleSpeed = new Phaser.Point(400,2000);
  this.game.emitterR.minParticleSpeed = new Phaser.Point(-400,500);
  this.game.redRocket.addChild(this.game.emitterR);


  // Start Physics
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.enable(this.game.rockets);
  this.game.rockets.enableBody = true;

  this.game.meteors = this.game.add.group();
  this.game.fuels = this.game.add.group();
  this.game.rMCount = 2;
  this.game.bMCount = 2;

  this.game.input.onDown.add(this.toggleTrack,this);
  };

gameObject.GameState.prototype.create = function () {
    "use strict";
    // Timer
    this.meteorTimer = this.game.time.create(false);
    this.meteorTimer.start();
    this.generateMeteors();
    this.fuelTimer = this.game.time.create(false);
    this.fuelTimer.start();
    this.generateFuels();
};

gameObject.GameState.prototype.update = function () {
    "use strict";
    var game = this.game;
    game.blueRocket.play('run');
    game.redRocket.play('run');

    game.meteors.forEach(function (meteor) {
    if (meteor.y > game.height) {
      meteor.destroy();
      // meteor.key === "redMeteor" ? game.rMCount -= 1 : game.bMCount -= 1;
    }
  });
  // this.game.emitterB.emitParticle();
  // this.game.emitterR.emitParticle();
  game.physics.arcade.collide(game.rockets,game.meteors,this.gameOver,null,this);
  game.physics.arcade.overlap(game.fuels,game.meteors, function(fuel,meteor){
    console.log(fuel);
    fuel.kill();
  },null,this);

  game.physics.arcade.overlap(game.fuels,game.rockets, function(fuel,meteor){
    fuel.kill();
  },null,this);

};

gameObject.GameState.prototype.generateMeteors = function () {
  "use strict";
  // Red Meteor
  if (this.game.rMCount < 4) {
    var maxDistanceR = this.game.height;
    var minDsitanceR = this.game.redRocket.height * 5;
    var metDistanceR = this.game.rnd.integerInRange(minDsitanceR,maxDistanceR) * -1;
    var rLorR = this.game.rnd.integerInRange(-5,4) >=0 ? "redSpawn1" : "redSpawn2";
    // this.game.redMetPosition = this.game.redMetPosition ? this.game.redMetPosition + metDistanceR : this.game.height * 3/4;
    this.game.redMetPosition = (this.game.height + metDistanceR) * -1 ;
    this.game.meteors.add(new gameObject.Meteor(this.game, this.game.guides[rLorR], this.game.redMetPosition, 'redMeteor'));
    // this.game.rMCount += 1;
    // console.log(this.game.redMetPosition);
  }
  // Blue Meteor
  if (this.game.bMCount < 4) {
    var maxDistanceB = this.game.height;
    var minDsitanceB = this.game.blueRocket.height * 5;
    var metDistanceB = this.game.rnd.integerInRange(minDsitanceB,maxDistanceB) * -1;
    var bLorR = this.game.rnd.integerInRange(-5,4) >=0 ? "blueSpawn1" : "blueSpawn2";
    // this.game.blueMetPosition = this.game.blueMetPosition ? this.game.blueMetPosition + metDistanceB : this.game.height * 3/4;
    this.game.blueMetPosition = (this.game.height + metDistanceB) * -1;
    this.game.meteors.add(new gameObject.Meteor(this.game, this.game.guides[bLorR], this.game.blueMetPosition, 'blueMeteor'));
    //  this.game.bMCount += 1;
    // console.log(this.game.blueMetPosition);
  }
  this.meteorTimer.add(Phaser.Timer.SECOND * this.game.rnd.realInRange(2, 4) , this.generateMeteors, this);
};

gameObject.GameState.prototype.generateFuels = function () {
  "use strict";
  // Red Fuel
  if (this.game.rMCount < 4) {
    var maxDistanceR = this.game.height;
    var minDsitanceR = this.game.redRocket.height * 5;
    var metDistanceR = this.game.rnd.integerInRange(minDsitanceR,maxDistanceR) * -1;
    var rLorR = this.game.rnd.integerInRange(-5,4) >=0 ? "redSpawn1" : "redSpawn2";
    this.game.redFuelPosition = (this.game.height + metDistanceR) * -1 ;
    this.game.fuels.add(new gameObject.Fuel(this.game, this.game.guides[rLorR], this.game.redMetPosition, 'redBenzin'));
  }
  // Blue Fuel
  if (this.game.bMCount < 4) {
    var maxDistanceB = this.game.height * 2;
    var minDsitanceB = this.game.blueRocket.height * 8;
    var metDistanceB = this.game.rnd.integerInRange(minDsitanceB,maxDistanceB) * -1;
    var bLorR = this.game.rnd.integerInRange(-5,4) >=0 ? "blueSpawn1" : "blueSpawn2";
    this.game.blueFuelPosition = (this.game.height + metDistanceB) * -1;
    this.game.fuels.add(new gameObject.Fuel(this.game, this.game.guides[bLorR], this.game.blueMetPosition, 'blueBenzin'));
  }
  this.fuelTimer.add(Phaser.Timer.SECOND * this.game.rnd.realInRange(4, 8) , this.generateFuels, this);
};


gameObject.GameState.prototype.toggleTrack = function (pointer) {
    "use strict";
    if (pointer.x < this.game.width / 2) {
      console.log("Toggle Blue Track");
      var rocket = this.game.blueRocket;
      switch (rocket.track) {
        case "blueSpawn1":
            if (rocket.x <= this.game.guides.blueSpawn2) {
              var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.blueSpawn2}, 450, Phaser.Easing.Cubic.InOut, true);
              var rotAnim = this.game.add.tween(rocket).to( { angle : 40}, 200, Phaser.Easing.Linear.Out, true);
              rotAnim.yoyo(true,0);
            }
            rocket.track = "blueSpawn2"
          break;
        case "blueSpawn2":
            if (rocket.x >= this.game.guides.blueSpawn1) {
              var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.blueSpawn1}, 450, Phaser.Easing.Cubic.InOut, true);
              var rotAnim = this.game.add.tween(rocket).to( { angle : -40}, 200, Phaser.Easing.Linear.Out, true);
              rotAnim.yoyo(true,0);
            }
            rocket.track = "blueSpawn1";
          break;
      }
    }
    else {
        console.log("Toggle Red Track");
        var rocket = this.game.redRocket;
        switch (rocket.track) {
          case "redSpawn1":
              if (rocket.x <= this.game.guides.redSpawn2) {
                var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.redSpawn2}, 450, Phaser.Easing.Cubic.InOut, true);
                var rotAnim = this.game.add.tween(rocket).to( { angle : 40}, 200, Phaser.Easing.Cubic.InOut, true);
                rotAnim.yoyo(true,0);
              }
              rocket.track = "redSpawn2";
            break;
          case "redSpawn2":
              if (rocket.x >= this.game.guides.redSpawn1) {
                var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.redSpawn1}, 450, Phaser.Easing.Cubic.InOut, true);
                var rotAnim = this.game.add.tween(rocket).to( { angle : -40}, 200, Phaser.Easing.Cubic.InOut, true);
                rotAnim.yoyo(true,0);
              }
              rocket.track = "redSpawn1";
            break;
        }
    }
};

gameObject.GameState.prototype.gameOver = function () {
  "use strict";
  console.log(this);
  this.game.paused = true;
  var unpause = function (event){
        // Only act if paused
        if(this.game.paused){
          this.game.paused = false;
          this.game.state.restart();
        console.log(this);
          }
        else{
            this.game.paused = false;
            }
      };

  var pause_label = this.game.add.text(100, 20, 'Restart', { font: '128px Arial', fill: '#fff' });
  pause_label.inputEnabled = true;
  pause_label.events.onInputDown.add(unpause,this);
  this.game.input.onDown.add(unpause, this);

};
