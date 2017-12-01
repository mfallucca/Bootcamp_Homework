var fs = require('fs');
var UserSearch = require('./UserSearch.js')

var WeatherAdmin = function(name, location) {
	this.newUserSearch = function() {
		fs.appendFile('./log.txt', '\n' + name + " " + location, function(error, data) {
			if (error) {
				return console.log(error);
			}
			console.log('Data was added to log!')
		})
	}

	this.getData = function() {
		fs.readFile('./log.txt', "utf8", function(error, data) {
			if (error) {     
				return console.log(error);
			}
			console.log(data);
			})
		}
	}

module.exports = WeatherAdmin;