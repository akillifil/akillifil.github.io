var gameObject = gameObject || {};

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(450, 800, Phaser.Auto,'');
game.state.add("BootState", new gameObject.BootState());
game.state.add("PreloadState", new gameObject.PreloadState());
game.state.add("LoadingState", new gameObject.LoadingState());
game.state.add("MenuState", new gameObject.MenuState());
game.state.start("BootState", true, false);
