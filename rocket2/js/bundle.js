(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Fuel =  function (game,x,y,key) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,key);
    // this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    game.physics.arcade.enableBody(this);
    this.body.velocity.y = 300;
    this.body.collideWorldBounds = false;
    // console.log(this);
};

Fuel.prototype = Object.create(Phaser.Sprite.prototype);
Fuel.prototype.constructor = Fuel;

module.exports = Fuel;

},{}],2:[function(require,module,exports){
var Meteor = function (game,x,y,key) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,key);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    game.physics.arcade.enableBody(this);
    this.body.velocity.y = 300;
    this.body.collideWorldBounds = false;
    this.body.setSize(100,100);
    // console.log(this);
};

Meteor.prototype = Object.create(Phaser.Sprite.prototype);
Meteor.prototype.constructor = Meteor;

module.exports = Meteor;

},{}],3:[function(require,module,exports){
var Rocket = function (game,x,y,key,track) {
    "use strict";
    Phaser.Sprite.call(this,game,x,y,key);
    console.log(game);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.125);
    game.physics.arcade.enable(this);
    this.track = track;
    this.animations.add("run",[0,1,2],10,true);
    this.body.setSize(200,300);
    console.log(this);
};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.constructor = Rocket;

module.exports = Rocket;

},{}],4:[function(require,module,exports){
var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var curRatio = width/height;

var game = new Phaser.Game(1080 / 4, 1920 / 4, Phaser.CANVAS,'');
game.state.add("BootState", require('./states/BootState.js'));
game.state.add("LoadingState", require('./states/LoadingState.js'));
game.state.add("GameState", require('./states/GameState.js'));
game.state.start("BootState", true, false);

},{"./states/BootState.js":5,"./states/GameState.js":6,"./states/LoadingState.js":7}],5:[function(require,module,exports){
module.exports = {
  preload : function () {
    "use strict";
    // configure game
    if (this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // this.game.scale.minWidth =  280;
      // this.game.scale.minHeight = 480;
      // this.game.scale.maxWidth = 280 * 2;
      // this.game.scale.maxHeight = 600 * 2;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
    }
    this.game.load.json('assetsJSON', "assets/assets.json");
},
  create : function () {
    "use strict";
    this.game.state.start("LoadingState", true, false);
}
}

},{}],6:[function(require,module,exports){
module.exports = {
// blue outline : d3d1e2
// blue dark : 424898
// blue light : 5d5ea4

// red outline : fbc8b4
// red dark : ee273a
// red light : d86456

// bg 213cb0 33,60,176
// cizgi 7FBAFC 127,186,252

 preload : function () {
  "use strict";
  this.game.guides = {
    "middle" : this.game.width / 2,
    "blueMid" : this.game.width / 4,
    "redMid" : this.game.width * 3/4,
    "blueSpawn1" : this.game.width / 8,
    "blueSpawn2" : ((this.game.width / 4) + (this.game.width / 2)) / 2,
    "redSpawn1" : ((this.game.width * 3/4) + (this.game.width / 2)) / 2,
    "redSpawn2" : ((this.game.width * 3/4) + this.game.width ) / 2,
    "metSpawnY" : -100,
    "fuelSpawnY" : -700
  }
  this.game.bg = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'bg');
  // this.game.stage.backgroundColor = 0x213cb0;
  // Divede Screen
  var divisionLine = this.game.add.graphics();
  divisionLine.moveTo(this.game.guides.middle, 0);
  divisionLine.lineStyle(8, 0x7FBAFC);
  divisionLine.lineTo(this.game.width / 2, this.game.height);

  // Guide Lines For Rockets
  // divisionLine.lineStyle(3, 0x7FBAFC);
  // divisionLine.moveTo(this.game.guides.redMid, 0);
  // divisionLine.lineTo(this.game.guides.redMid, this.game.height);
  //
  // divisionLine.moveTo(this.game.guides.blueMid, 0);
  // divisionLine.lineTo(this.game.guides.blueMid, this.game.height);

  // Collision Groups
  this.game.rockets = this.game.add.group();
  this.game.meteors = this.game.add.group();
  this.game.fuels = this.game.add.group();

  // Start Physics
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.enable(this.game.rockets);
  this.game.rockets.enableBody = true;
  this.game.meteors.enableBody = true;
  this.game.fuels.enableBody = true;

  // Add Rockets
  var rocket = require('../Prefabs/RocketPrefab.js');
  this.game.rockets = this.game.add.group();
  this.game.blueRocket = new rocket(this.game,this.game.guides.blueSpawn1,this.game.height * 3/4,'blueRocket',"blueSpawn1");
  this.game.rockets.add(this.game.blueRocket);
  // this.game.emitterB = this.game.add.emitter(0, 0, 20);
  // this.game.emitterB.makeParticles('blueParticle');
  // this.game.emitterB.x = 0;
  // this.game.emitterB.y = this.game.blueRocket.height * 1.8;
  // this.game.emitterB.scale.setTo(0.25);
  // this.game.emitterB.lifespan = 500;
  // this.game.emitterB.frequency = 0;
  // this.game.emitterB.maxParticleSpeed = new Phaser.Point(400,2000);
  // this.game.emitterB.minParticleSpeed = new Phaser.Point(-400,500);
  // this.game.blueRocket.addChild(this.game.emitterB);


  this.game.redRocket = new rocket(this.game,this.game.guides.redSpawn2,this.game.height * 3/4,'redRocket',"redSpawn2");
  this.game.rockets.add(this.game.redRocket);
  // this.game.emitterR = this.game.add.emitter(0, 0, 20);
  // this.game.emitterR.makeParticles('redParticle');
  // this.game.emitterR.x = 0;
  // this.game.emitterR.y = this.game.redRocket.height * 1.8;
  // // this.game.emitterB.scale.setTo(0.25);
  // this.game.emitterR.lifespan = 500;
  // this.game.emitterR.frequency = 0;
  // this.game.emitterR.maxParticleSpeed = new Phaser.Point(400,2000);
  // this.game.emitterR.minParticleSpeed = new Phaser.Point(-400,500);
  // this.game.redRocket.addChild(this.game.emitterR);

  this.game.rMCount = 0;
  this.game.bMCount = 0;
  this.game.fCount = 0;
  this.game.bfCount = 0;
  this.game.input.onDown.add(this.toggleTrack,this);
  this.game.time.advancedTiming = true;
},
  create : function () {
    "use strict";
    // Timer
    this.meteorTimer = this.game.time.create(false);
    this.meteorTimer.start();
    this.generateMeteors();
    this.fuelTimer = this.game.time.create(false);
    this.fuelTimer.start();
    this.generateFuels();
  },

  update : function () {
    "use strict";
    var game = this.game;
      game.bg.tilePosition.y += 3;
    game.blueRocket.play('run');
    game.redRocket.play('run');

    game.meteors.forEach(function (meteor) {
    if (meteor.y > game.height) {
      meteor.destroy();
      meteor.key === "redMeteor" ? game.rMCount -= 1 : game.bMCount -= 1;
    }
  });
  // this.game.emitterB.emitParticle();
  // this.game.emitterR.emitParticle();
  game.physics.arcade.overlap(game.rockets,game.meteors,this.gameOver,null,this);
  game.physics.arcade.overlap(game.fuels,game.meteors, function(fuel,meteor){
    fuel.kill();
    fuel.key === "blueBenzin" ? game.fCount -= 1 : game.fCount -= 1;
  },null,this);

  game.physics.arcade.overlap(game.fuels,game.rockets, function(fuel,rocket){
    fuel.kill();
    game.fCount -= 1;
  },null,this);
},

generateMeteors : function () {
  "use strict";
  if (this.game.rMCount + this.game.bMCount < 5) {

  var meteor = require('../Prefabs/MeteorPrefab.js');
  var lastMeteor = this.game.meteors.getTop();
  // if (lastMeteor.key && lastMeteor.key === this.game.meteors.children[-2].key) {
  //   var redOrBlue = this.game.meteors[-1].key === "redMeteor" ? "blueMeteor" : "redMeteor";
  // } else {
  //
  // }
  var redOrBlue = this.game.rnd.integerInRange(-5,4) >=0 ? "redMeteor" : "blueMeteor";
  var trackNo = this.game.rnd.integerInRange(1,2);
  switch (redOrBlue) {
    case "redMeteor":
      var track = trackNo === 1 ? "redSpawn1" : "redSpawn2";
      this.game.meteors.add(new meteor(this.game, this.game.guides[track], this.game.rnd.integerInRange(this.game.guides.metSpawnY,-10), 'redMeteor'));
      this.game.rMCount += 1;
      break;
    case "blueMeteor":
      var track = trackNo === 1 ? "blueSpawn1" : "blueSpawn2";
      this.game.meteors.add(new meteor(this.game, this.game.guides[track], this.game.rnd.integerInRange(this.game.guides.metSpawnY,-10), 'blueMeteor'));
      this.game.bMCount += 1;
      break
  }
}
  this.meteorTimer.add(Phaser.Timer.HALF * this.game.rnd.realInRange(1, 4) , this.generateMeteors, this);
},

 generateFuels : function () {
  "use strict";

  if(this.game.fCount <= 3){
  var fuel = require('../Prefabs/FuelPrefab.js');
  var redOrBlue = this.game.rnd.integerInRange(-5,4) >=0 ? "redBenzin" : "blueBenzin";
  var trackNo = this.game.rnd.integerInRange(1,2);
  switch (redOrBlue) {
    case "redBenzin":
      var track = trackNo === 1 ? "redSpawn1" : "redSpawn2";
      this.game.fuels.add(new fuel(this.game, this.game.guides[track], this.game.rnd.integerInRange(this.game.guides.fuelSpawnY,-10), 'redBenzin'));
      this.game.rfCount += 1;
      break;
    case "blueBenzin":
      var track = trackNo === 1 ? "blueSpawn1" : "blueSpawn2";
      this.game.fuels.add(new fuel(this.game, this.game.guides[track], this.game.rnd.integerInRange(this.game.guides.fuelSpawnY,-10), 'blueBenzin'));
      this.game.bfCount += 1;
      break
  }
}
  this.game.fCount += 1;
  this.fuelTimer.add(Phaser.Timer.HALF * this.game.rnd.realInRange(1, 4) , this.generateFuels, this);
},

toggleTrack : function (pointer) {
  "use strict";
  if (pointer.x < this.game.width / 2){
      var rocket = this.game.blueRocket;
  } else {
    var rocket = this.game.redRocket;
  };
    switch (rocket.track) {
      case "blueSpawn1":
          if (rocket.x <= this.game.guides.blueSpawn2) {
            var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.blueSpawn2}, 320, Phaser.Easing.Cubic.InOut, true);
          if (rocket.angle === 0) {
            var rotAnim = this.game.add.tween(rocket).to( { angle : 40}, 140, Phaser.Easing.Linear.Out, true);
            rotAnim.yoyo(true,0);
          }
          }
          rocket.track = "blueSpawn2"
        break;
      case "blueSpawn2":
          if (rocket.x >= this.game.guides.blueSpawn1) {
            var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.blueSpawn1}, 320, Phaser.Easing.Cubic.InOut, true);
            if (rocket.angle === 0) {
              var rotAnim = this.game.add.tween(rocket).to( { angle : -40}, 140, Phaser.Easing.Linear.Out, true);
              rotAnim.yoyo(true,0);
            }
          }
          rocket.track = "blueSpawn1";
        break;
      case "redSpawn1":
            if (rocket.x <= this.game.guides.redSpawn2) {
              var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.redSpawn2}, 320, Phaser.Easing.Cubic.InOut, true);
              if (rocket.angle === 0) {
              var rotAnim = this.game.add.tween(rocket).to( { angle : 40}, 140, Phaser.Easing.Cubic.InOut, true);
              rotAnim.yoyo(true,0);
            }
            }
            rocket.track = "redSpawn2";
          break;
      case "redSpawn2":
            if (rocket.x >= this.game.guides.redSpawn1) {
              var moveAnim = this.game.add.tween(rocket).to( { x: this.game.guides.redSpawn1}, 320, Phaser.Easing.Cubic.InOut, true);
              if (rocket.angle === 0) {
              var rotAnim = this.game.add.tween(rocket).to( { angle : -40}, 140, Phaser.Easing.Cubic.InOut, true);
              rotAnim.yoyo(true,0);
            }
            }
            rocket.track = "redSpawn1";
          break;
  }
},

gameOver : function () {
  "use strict";
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

},
render : function () {
  // // "use strict";
  // var game = this.game;
  // game.debug.spriteInfo(game.bg,30,30);
  this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  // // console.log(game.meteors);
  // game.meteors.forEach(function(meteor){
  //   console.log(meteor);
  //   game.debug.body(meteor);
  // });
  // // game.fuels.forEach(function(fuel){
  // //   game.debug.body(fuel);
  // // });
  // this.game.debug.body(this.game.blueRocket);
  // this.game.debug.body(this.game.redRocket);
}
}

},{"../Prefabs/FuelPrefab.js":1,"../Prefabs/MeteorPrefab.js":2,"../Prefabs/RocketPrefab.js":3}],7:[function(require,module,exports){
module.exports = {
preload : function () {
  this.game.assets_data = this.game.cache.getJSON('assetsJSON');
  this.loadingText = this.game.add.text(32, 32, 'Loading', { fill: '#ffffff' });
    var assets, asset_key, asset;
    assets = this.game.assets_data.assets;
    console.log(assets);
    if(true)
      {
        for (asset_key in assets) { // load assets according to asset key
          console.log(asset_key);
          if (assets.hasOwnProperty(asset_key)) {
              asset = assets[asset_key];
              // console.log(this);
              // console.log(asset.type);
              switch (asset.type) {
              case "image":
                  this.load.image(asset_key, asset.source);
                  break;
              case "spritesheet":
                  this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                  break;
              case "tilemap":
                  this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                  break;
              case "audio":
                  this.load.audio(asset_key, asset.source);
                  break;
              }
          }
      }
    }

  this.game.load.onFileComplete.add(this.fileComplete, this);
},
  create : function () {
    "use strict";
    this.game.state.start('GameState', true, false);
},

fileComplete : function (progress, cacheKey, success, totalLoaded, totalFiles) {

	this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  // this.game.paused = true;
}
}

},{}]},{},[4]);
