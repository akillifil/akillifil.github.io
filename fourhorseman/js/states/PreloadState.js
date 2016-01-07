var gameObject = gameObject || {};

gameObject.PreloadState = function(){
  "use strict";
  Phaser.State.call(this);
};

gameObject.PreloadState.prototype = Object.create(Phaser.State.prototype);
gameObject.PreloadState.prototype.constructor = gameObject.PreloadState;

gameObject.PreloadState.prototype.init = function () {
    "use strict";
    this.assets_file = "assets/assets.json";
};

gameObject.PreloadState.prototype.preload = function () {
    "use strict";
    this.load.text('assetsJSON', this.assets_file);
};

gameObject.PreloadState.prototype.create = function () {
    "use strict";
    this.game.assets_data = JSON.parse(this.cache.getText('assetsJSON'));
    this.game.state.start("LoadingState", true, false);
};
