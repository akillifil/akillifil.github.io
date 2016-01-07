var gameObject = gameObject || {};

gameObject.BootState = function(){
  "use strict";
  Phaser.State.call(this);
};

gameObject.BootState.prototype = Object.create(Phaser.State.prototype);
gameObject.BootState.prototype.constructor = gameObject.BootState;

gameObject.BootState.prototype.preload = function () {
    "use strict";
    // configure game
    this.game.input.maxPointers = 1;
    console.log(this.game.scale);
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

};

gameObject.BootState.prototype.create = function () {
    "use strict";
    this.game.state.start("PreloadState", true, false);
};
