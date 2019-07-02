var firebaseConfig = {
  apiKey: "AIzaSyCL-RRX9a62sv2w7V_M9Zjg1tXxTGb6rdc",
  authDomain: "find-in-five.firebaseapp.com",
  databaseURL: "https://find-in-five.firebaseio.com",
  projectId: "find-in-five",
  storageBucket: "",
  messagingSenderId: "325575958489",
  appId: "1:325575958489:web:0c9af4f6893f24d8"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var movieArray = [];
var netflixMovies = [];
var genre;
var startYear;
var endYear;
$(".genre").on("click", function () {
  genre = $(this).attr("id");
  console.log(genre);
});

$(".year").on("click", function () {
  startYear = parseInt($(this).attr("id"));
  endYear = startYear + 9;
  console.log(startYear);
  console.log(endYear);
});

$("#submit").on("click", function (event) {
  event.preventDefault();
  var queryURL;
  for (var i = 0; i < 100; i++) {
    queryURL = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieArray[i] + "&country=us";
    $.ajax({
      url: queryURL,
      method: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-RapidAPI-Host", "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com");
        xhr.setRequestHeader("X-RapidAPI-Key", "d9f5020bf5msh750d2aa0c867c03p1c6d01jsneb02922e33b5");
      }
    }).then(function (response) {
      console.log(response);

      for (var i = 0; i < response.results[0].locations.length; i++) {
        if (response.results[0].locations[i].display_name == "Netflix") {
          netflixMovies.push({ name: response.results[0].name, picture: response.results[0].picture });
        }
      }
    });
  }
  console.log(netflixMovies);
});

$("#movieCall").on("click", function () {
  for (var i = 1; i < 6; i++) {
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3c08d2c0cdfa9dd48041ef2cdea4b2f3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + i + "&release_date.gte=" + startYear + "&release_date.lte=" + endYear + "&with_genres=" + genre;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (i = 0; i < 20; i++) {
        movieArray.push(response.results[i].title);
      }
    });
  }
  console.log(movieArray);
});

$("#netflixCheck").on("click", function () {


});

$("#showMovies").on("click", function () {
  console.log(netflixMovies);
})

