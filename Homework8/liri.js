// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//npm modules
var dataKeys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var writeLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}


var getArtistNames = function(artist) {
  return artist.name;
};

//Function for finding songs on Spotify
var getSpotify = function(songName) {

  if (songName === undefined) {
    songName = 'The Sign';
  };

var spotify = new Spotify({
  id: "0a1597fac3db4ed990214f0563061d2f",
  secret: "b73f7134936a4f76927162f6e10726c1"
});

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error : ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; //empty array to hold data

    for (var i = 0; i < 10; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    for (i=0; i < data.length; i++) {
      console.log(data[i]);
    }
    writeLog(data);
  });
};


var getTweets = function() {
  var client = new twitter(dataKeys);

  var params = { screen_name: 'Goobeez', count: 20 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeLog(data);
    }
  });
};

var getMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json&apikey=fc3e776d";
  console.log(urlHit);
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // var data = [];
      var responseData = JSON.parse(body);

      var data = {
      Title: 'Title: ' + responseData.Title,
      Year: 'Year: ' + responseData.Year,
      IMDB: 'IMDB Rating: ' + responseData.imdbRating,
      RT: 'Rotten Tomatoes Rating: ' + responseData.tomatoRating,
      Country: 'Country: ' + responseData.Country,
      Language: 'Language: ' + responseData.Language,
      Plot: 'Plot: ' + responseData.Plot,
      Actors: 'Actors: ' + responseData.Actors
      };

      console.log(data.Title + '\n' + data.Year + '\n' + data.IMDB + '\n' + data.RT + '\n' + data.Country + '\n' + data.Language + '\n' + data.Plot + '\n' + data.Actors);
      writeLog(data);
    }
  });

}

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      choice(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      choice(dataArr[0]);
    }

  });
}

var choice = function(choiceEntry, argData) {
  switch (choiceEntry) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getSpotify(argData);
      break;
    case 'movie-this':
      getMovie(argData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI doesn\'t know that');
  }
}

//run this on load of js file
var master = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

master(process.argv[2], process.argv[3]);