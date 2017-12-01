var weather = require('weather-js');

var UserSearch = function(userName, location) {
	this.user = userName;
	this.loc = location;
	this.date = Date.now();

	this.getWeather = function() {
		weather.find({search: this.user, degreeType: 'F'}, function(err, result) {
  			if(err) console.log(err);
 			console.log(JSON.stringify(result, null, 2));

		});
	}
}

module.exports = UserSearch;