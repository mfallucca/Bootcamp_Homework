var fs = require('fs');
var UserSearch = require('./UserSearch.js')

var WeatherAdmin = function(name, location) {
	this.newUserSearch = function() {
		var newUser = new UserSearch(name, location);
		fs.appendFile('./log.txt', '\n' + newUser.user + " " + newUser.loc + " " + newUser.date, function(error, data) {
			if (error) {
				return console.log(error);
			}
			console.log('Data was added to log!')
			newUser.getWeather();
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