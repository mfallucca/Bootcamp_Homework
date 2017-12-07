var Letter = require('./letter.js');

var Word = function(currentWord){

	this.currentWord = currentWord;
	this.guessedWord = [];
	this.victory = false;
	this.guesses = [];


	this.pushArray = function(){
		for(var i = 0; i <this.currentWord.length; i++){
			var theNewLetter = new Letter(this.currentWord[i]);
			this.guessedWord.push(theNewLetter);

		}
	}
	this.pushArray();

	this.foundLetter = function(guessLetter){
		for(var i = 0; i <this.guesses.length; i++){
			if(guessLetter == this.guesses[i]){
				return true;
			}
		}
		console.log(guessLetter);
		var added = false;

		this.guesses.push(guessLetter);

		for(var i = 0; i <this.guessedWord.length;i++){
			if(this.guessedWord[i].letterin(guessLetter)){
				this.guessedWord[i].showsLetter = true;
				added = true;
			} 
		}
		return added;

	}

 	this.comparingWords = function(){
 		for(var i = 0; i < this.currentWord.length; i++){

 			if(this.currentWord.charAt(i) != this.guessedWord[i].current){
 				return false;
 			}

 		}
 				return true;
 	}

	this.display = function(){
		var emptyString = "";
			
		for(var i = 0; i <this.guessedWord.length; i++){
			emptyString += this.guessedWord[i].current + " ";
		}
		return emptyString;
	}
}

module.exports = Word;