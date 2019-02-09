require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios')

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const search = process.argv[2]

const term = process.argv.slice(3).join(' ')

if(search=="concert-this"){
    var url = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(url).then(function(response){
        console.log(`Searching for shows by ${term}!:\n`)
        response.data.forEach(function(e){
            console.log(`Venue Name: ${e.venue.name}\nVenue Location: ${e.venue.city}\nShow Date: ${e.datetime}\n`)
        })
    })
}

else if(search=="spotify-this-song"){
    spotify.search({
        type: 'track',
        query: term
        }).then(function(response) {
            response = response.tracks.items[0]
            console.log(response.artists[0].name)
          })
}

else if(search=="movie-this"){
   url='http://www.omdbapi.com/?apikey=trilogy&t=' + term
    axios.get(url).then(function(response){
        response = response.data
        console.log(`Title: ${response.Title}\nYear: ${response.Year}\nIMDB Rating: ${response.imdbRating}\nCountry: ${response.Country}\nLanguage: ${response.Language}\nPlot: ${response.Plot}\nActors: ${response.Actors}\n`)
    })
}

else if(search=="do-what-it-says"){
    
}

else{
    console.log("Please enter a valid command")
}