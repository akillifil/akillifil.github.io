var gameObject = gameObject || {};

gameObject.LoadingState = function(){
  "use strict";
  Phaser.State.call(this);
};

gameObject.LoadingState.prototype = Object.create(Phaser.State.prototype);
gameObject.LoadingState.prototype.constructor = gameObject.LoadingState;

gameObject.LoadingState.prototype.preload = function () {
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
};

gameObject.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start('GameState', true, false);
};

gameObject.LoadingState.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {

	this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  // this.game.paused = true;
}
