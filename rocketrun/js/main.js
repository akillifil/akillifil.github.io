var gameObject = gameObject || {};

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var curRatio = width/height;

var game = new Phaser.Game(1080, 1920, Phaser.Auto,'');
game.state.add("BootState", new gameObject.BootState());
game.state.add("LoadingState", new gameObject.LoadingState());
game.state.add("GameState", new gameObject.GameState());
game.state.start("BootState", true, false);
