var gameObject = gameObject || {};

var game = new Phaser.Game(280, 600, Phaser.CANVAS);
game.state.add("BootState", new gameObject.BootState());
game.state.add("PreloadState", new gameObject.PreloadState());
game.state.add("LoadingState", new gameObject.LoadingState());
game.state.add("MenuState", new gameObject.MenuState());
game.state.add("GameOverState", new gameObject.GameOverState());
game.state.add("GameState", new gameObject.GameState());
game.state.start("BootState", true, false);
