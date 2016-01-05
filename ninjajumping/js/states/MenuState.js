var gameObject = gameObject || {};

gameObject.MenuState = function () {
    "use strict";
    Phaser.State.call(this);
};

gameObject.MenuState.prototype = Object.create(Phaser.State.prototype);
gameObject.MenuState.prototype.constructor = gameObject.MenuState;

gameObject.MenuState.prototype.init = function (level_data) {
    "use strict";

};

gameObject.MenuState.prototype.preload = function () {
  "use strict";
  // start physics system
    this.game.add.image(0,0,'menu_background');
    // console.log(asd);
    this.game.add.image(120,220,'treeL');
    this.game.add.image(140,220,'treeR');
    this.game.add.image(20,50,'title_image');
    this.game.add.button(this.game.world.centerX - 80, this.game.world.centerY + 50, 'click2play',this.clicked);
    this.game.menuSound = this.game.add.audio('menuSound');
  }

gameObject.MenuState.prototype.create = function () {
    "use strict";
    this.game.menuSound.play();
};

gameObject.MenuState.prototype.clicked = function () {
  "use strict";
  this.game.menuSound.stop();
  this.game.state.start("GameState", true, false);
  }
