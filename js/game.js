function Game(board_string) {
  if (board_string) {
    this.board_string = board_string
  } else {
    this.board_string = this.generateRandomBoardString();
  }
  this.board = this.generateBoard(this.board_string)
}

Game.prototype.generateBoard = function(board_string) {
  var board = [];
  var array1 = board_string.slice(0,4).split("").map(Number);
  var array2 = board_string.slice(4,8).split("").map(Number);
  var array3 = board_string.slice(8,12).split("").map(Number);
  var array4 = board_string.slice(12,16).split("").map(Number);
  board.push(array1, array2, array3, array4)
  return board;
}

Game.prototype.generateRandomBoardString = function() {
  var board_string = "0000000000000000";
  var num1 = Math.floor(Math.random() * 16);
  var num2 = Math.floor(Math.random() * 16);
  while (num2 === num1) {
    num2 = Math.floor(Math.random() * 16);
  }

  var output = board_string.slice(0,num1) + "2" + board_string.slice(num1 + 1,16)
  output = output.slice(0,num2) + "2" + output.slice(num2 + 1,16)
  return output;
}

Game.prototype.smash = function(array) {
  var newArray = [];
  var filteredArray = array.filter(function(value) {
    return value !== 0;
  })
  var i = 0;
  while(i < filteredArray.length){
    if(filteredArray[i] == filteredArray[i + 1]){
      newArray.push(filteredArray[i] * 2)
      i += 2;
    } else {
      newArray.push(filteredArray[i])
      i += 1;
    }
  }
  while(newArray.length < 4){
    newArray.push(0)
  };
  return newArray;
}


Game.prototype.move = function(direction) {
  switch(direction) {
    case "left":
      for (var i = 0; i < this.board.length; i++) {
        var row = this.getRow(i);
        row = this.smash(row);
        this.setRow(i, row);
      }
      break;
    case "right":
      // if move is right, pass rows reversed.
      for (var i = 0; i < this.board.length; i++) {
        var row = this.getRow(i);
        row = this.smash(row.reverse()).reverse();
        this.setRow(i, row);
      }
      break;
    case "up":
      // if move is up, pass columns as-is.
      for (var i = 0; i < this.board.length; i++) {
        var column = this.getColumn(i);
        column = this.smash(column);
        this.setColumn(i, column);
      }
      break;
    case "down":
      // if move is down, pass columns reversed.
      for (var i = 0; i < this.board.length; i++) {
        var column = this.getColumn(i);
        column = this.smash(column.reverse()).reverse();
        this.setColumn(i, column);
      }
      break;
  }
  return this.board;
}

Game.prototype.getRow = function(index) {
  return this.board[index];
}

Game.prototype.setRow = function(index, array) {
  this.board[index] = array;
}

Game.prototype.getColumn = function(index) {
  var nums = [];
  for (var i = 0; i < this.board.length; i++) {
    nums.push(this.board[i][index]);
  }
  return nums;
}

Game.prototype.setColumn = function(index, array) {
  for (var i = 0; i < this.board.length; i++) {
    this.board[i][index] = array[i];
  }
}

Game.prototype.checkForLoss = function() {
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[0].length; j++) {
      if (this.board[j][i] === 0) {
        return false
      }
    }
  }
  return true;
}

Game.prototype.checkForWin = function() {
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[0].length; j++) {
      if (this.board[j][i] === 512) {
        return true
      }
    }
  }
  return false;
}

Game.prototype.spawn = function() {
  var x = Math.floor(Math.random() * 4);
  var y = Math.floor(Math.random() * 4);
  while (this.board[y][x] !== 0) {
    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
  }
  this.board[y][x] = 2;
  return this.board;
}

Game.prototype.checkGameEnd = function() {
  if (this.checkForWin()) {
    return "Winner!";
  } else if (this.checkForLoss()) {
    return "Loser!";
  } else {
    return false;
  }
}


// View File:

function GameView(game) {
  this.game = game;
  this.board = game.board;
}

GameView.prototype.updateView = function() {
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      var square = $("#" + i.toString() + "-" + j.toString())
      square.text(this.board[i][j].toString());
      square.removeClass();
      square.addClass("c" + this.board[i][j].toString());
    }
  }
}

