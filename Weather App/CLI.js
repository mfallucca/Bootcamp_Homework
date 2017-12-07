var WeatherAdmin = require('./WeatherAdmin.js');

var userName = process.argv[2];
var location = process.argv[3];

var AdminUser = new WeatherAdmin(userName, location);
console.log(AdminUser);

if (userName === 'Admin') {
	AdminUser.getData();
}

else {
	AdminUser.newUserSearch();
}

