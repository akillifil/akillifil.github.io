var gameObject = gameObject || {};

gameObject.BootState = function(){
  "use strict";
  Phaser.State.call(this);
}

gameObject.BootState.prototype = Object.create(Phaser.State.prototype);
gameObject.BootState.prototype.constructor = gameObject.BootState;

gameObject.BootState.prototype.init = function (next_state) {
    "use strict";
    this.next_state = next_state;
};

gameObject.BootState.prototype.preload = function () {
    "use strict";
    // configure game
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.scale.pageAlignVertically = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  280;
      this.game.scale.minHeight = 480;
      this.game.scale.maxWidth = 280;
      this.game.scale.maxHeight = 600;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

};

gameObject.BootState.prototype.create = function () {
    "use strict";
    this.game.state.start("PreloadState", true, false);
};
