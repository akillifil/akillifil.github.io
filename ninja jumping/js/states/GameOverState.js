var gameObject = gameObject || {};

gameObject.GameOverState = function(score){
  "use strict";
  Phaser.State.call(this);
}

gameObject.GameOverState.prototype = Object.create(Phaser.State.prototype);
gameObject.GameOverState.prototype.constructor = gameObject.GameOverState;

gameObject.GameOverState.prototype.preload = function () {
  var emitter = this.game.add.emitter(140, this.camera.y - 10 , 50);
  emitter.makeParticles('player');
  emitter.start(false, 5000, 1);
  this.score = this.game.score;
  // this.add.tween(this.player).to({angle:'+90'}, 850, Phaser.Easing.Linear.None, true, 100);
  this.game.add.text(45, this.camera.y + 200, "Game Over!", { font: "35px Arial", fill: "#ff0044", align: "center" });
  this.game.add.text(45, this.camera.y + 250, "Your Score : " + this.score, { font: "20px Arial", fill: "#ff0044", align: "center" });
  this.restartText = this.game.add.text(65, this.camera.y + 300, "Click to Restart", { font: "20px Arial", fill: "#ff0044", align: "center" });

};

gameObject.GameOverState.prototype.create = function () {
    "use strict";
    this.restartText.inputEnabled = true;
    this.game.menuSound.play();
    this.restartText.events.onInputDown.add(function (event) {
      this.game.menuSound.stop();
      this.game.state.start('GameState')
    }, this);

};
