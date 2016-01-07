var gameObject = gameObject || {};

gameObject.MenuState = function () {
    "use strict";
    Phaser.State.call(this);
};

//#abeebb light-green
//#abcdef light-blue
//#fdb058 orange
//#ffff00 yellow
//#b19bd9

gameObject.MenuState.prototype = Object.create(Phaser.State.prototype);
gameObject.MenuState.prototype.constructor = gameObject.MenuState;

gameObject.MenuState.prototype.init = function (level_data) {
    "use strict";

};

gameObject.MenuState.prototype.preload = function () {
  "use strict";
  // start physics system
  this.game.stage.backgroundColor = 0xb19bd9;
  this.titleIm = this.game.add.image(57,50,'title');
  this.titleIm.scale.setTo(0.5)

  // Menu Group && Buttons
  this.menuButs = this.game.add.group();
  this.onemanBut = this.game.add.button(150, 300, 'onehorseman',this.oneHorseman);
  this.twomanBut = this.game.add.button(150, 400, 'twohorseman',this.twoHorseman);
  this.threemanBut = this.game.add.button(150, 500, 'threehorseman',this.threeHorseman);
  this.fourmanBut = this.game.add.button(150, 600, 'fourhorseman',this.fourHorseman);
  this.menuButs.add(this.onemanBut);
  this.menuButs.add(this.twomanBut);
  this.menuButs.add(this.threemanBut);
  this.menuButs.add(this.fourmanBut);
  // Scale MenuButs
  this.onemanBut.scale.setTo(0.2,0.2);
  this.twomanBut.scale.setTo(0.2,0.2);
  this.threemanBut.scale.setTo(0.2,0.2);
  this.fourmanBut.scale.setTo(0.2,0.2);



  this.dude = this.game.add.image(20,700,'dude');
  this.rock = this.game.add.image(340,700,'rock');
  this.dude.scale.setTo(0.35,0.35);
  this.rock.scale.setTo(0.2,0.2);


  };

gameObject.MenuState.prototype.create = function () {
    "use strict";

};

gameObject.MenuState.prototype.oneHorseman = function () {
  "use strict";
  this.game.stage.backgroundColor = 0xabeebb;
  this.star = this.game.add.image(300,270,'star');
  this.star.scale.setTo(0.4,0.4);
};

gameObject.MenuState.prototype.twoHorseman = function () {
  "use strict";
  this.game.stage.backgroundColor = 0xabcdef;
  this.just2 = this.game.add.image(20,400,'just-two');
  this.just2.scale.setTo(0.15);
};

gameObject.MenuState.prototype.threeHorseman = function () {
  "use strict";
  this.game.stage.backgroundColor = 0xfdb058;
  this.just3 = this.game.add.image(300,500,'just3');
  this.just3.scale.setTo(0.2);
};

gameObject.MenuState.prototype.fourHorseman = function () {
  "use strict";
  this.game.stage.backgroundColor = 0xffff00;
  this.yellingDude = this.game.add.image(300,600,'yelling-asdasd');
  this.yellingDude.scale.setTo(0.4,0.4);
  this.wooow = this.game.add.image(50,600,'wooow');
  this.wooow.scale.setTo(0.15,0.15);
};
