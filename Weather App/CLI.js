var WeatherAdmin = require('./WeatherAdmin.js');
var UserSearch = require ('./UserSearch.js');

var userName = process.argv[2];
var location = process.argv[3];

var AdminUser = new WeatherAdmin(userName, location);
console.log(AdminUser);

if (userName === 'Admin') {
	var AdminUser = new WeatherAdmin(userName, location);
	AdminUser.getData();
}

else {
	var newUser = new WeatherAdmin(userName, location);
	newUser.newUserSearch(userName, location);

	var newSearch = new UserSearch(userName, location);
	newSearch.getWeather();
}

