var gameObject = gameObject || {};

gameObject.LoadingState = function(){
  "use strict";
  Phaser.State.call(this);
}

gameObject.LoadingState.prototype = Object.create(Phaser.State.prototype);
gameObject.LoadingState.prototype.constructor = gameObject.LoadingState;

gameObject.LoadingState.prototype.init = function () {
    "use strict";
};

gameObject.LoadingState.prototype.preload = function () {
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

};

gameObject.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start('MenuState', true, false, this.level_data);
};
