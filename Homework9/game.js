var Word = require("./word.js");


var Game = function() {
	this.gameWords = ["nintendo","genesis","playstation","xbox","calico","dreamcast","gameboy"];

	this.randomWord = this.gameWords[ Math.floor(Math.random() * this.gameWords.length)];

	this.currentWord = new Word(this.randomWord);
	
}


module.exports = Game;