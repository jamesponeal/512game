$(document).ready(function() {

  var game = new Game();
  var view = new GameView(game);
  var outcome;
  view.updateView();
  var keys = ["left", "right", "up", "down"]
  Mousetrap.bind(keys, function(e, direction) {
    game.move(direction);
    if (outcome = game.checkGameEnd()) {
      Mousetrap.unbind(keys)
      view.updateView();
      alert(outcome);
    } else {
      game.spawn();
      view.updateView();
    }
  });

});