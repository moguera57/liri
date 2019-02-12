require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios')

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const search = process.argv[2]

const term = process.argv.slice(3).join(' ')

if(search=="concert-this"){
    concertSearch(term)
}

else if(search=="spotify-this-song"){
    if(!term)
        spotifySearch("The Sign")
    else
        spotifySearch(term)
}

else if(search=="movie-this"){
    omdbSearch(term)
}

else if(search=="do-what-it-says"){
    fs.readFile('./random.txt', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        spotifySearch(data)
    });
}

else{
    console.log("Please enter a valid command")
}

function spotifySearch(term){
    spotify.search({
        type: 'track',
        query: term
        }).then(function(response) {
            response = response.tracks.items[0]
            console.log(`Name: ${response.name}\nArtist: ${response.artists[0].name}\nURL: ${response.external_urls.spotify}\nAlbum: ${response.album.name}\n`)
        }).catch(function(error) {
            console.log(error);
        });
}

function omdbSearch(term){
    url='http://www.omdbapi.com/?apikey=trilogy&t=' + term
    axios.get(url).then(function(response){
        response = response.data
        console.log(`Title: ${response.Title}\nYear: ${response.Year}\nIMDB Rating: ${response.imdbRating}\nCountry: ${response.Country}\nLanguage: ${response.Language}\nPlot: ${response.Plot}\nActors: ${response.Actors}\n`)
    }).catch(function(error) {
        console.log(error);
    });
}

function concertSearch(term){
    var url = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(url).then(function(response){
        console.log(`Searching for shows by ${term}!:\n`)
        if(response.data.length!=0){
            response.data.forEach(function(e){
                console.log(`Venue Name: ${e.venue.name}\nVenue Location: ${e.venue.city}\nShow Date: ${e.datetime}\n`)})
        }
        else{
            console.log("No shows")
        }
        }).catch(function(error) {
            console.log(error);
        });
}