
var userInput = document.getElementById('search');
var userInputYear = document.getElementById('year');
var submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function(event) {
	event.preventDefault();
	movieSearch();
} );



function movieSearch () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var results = JSON.parse(xhr.responseText);
			var movies = results.Search;
			console.log(movies);
			var movieHTML = '';
			//check to see if they were any movies found
			//if - display no movies found else - create list item
			if (results.Response === "False") {
				movieHTML += ' <li class="no-movies"><i class="material-icons icon-help">';
				movieHTML += ' help_outline</i>No movies found that match: ';
				movieHTML +=  userInput.value;
			}  else {
				for (var i=0; i < movies.length; i += 1) {
		      		movieHTML += ' <li><a href="http://www.imdb.com/title/' + movies[i].imdbID + '"><div class="poster-wrap"> ';
		      		
		      		if (movies[i].Poster === 'N/A') {
		      			movieHTML += ' <i class="material-icons poster-placeholder">crop_original</i></div> ';
		      		} else {
		      			movieHTML += ' <img class="movie-poster" src="' + movies[i].Poster + '"></div>';
		      		}
		      		
		      		movieHTML += ' <span class="movie-title"> ' + movies[i].Title + ' </span> ';
		      		movieHTML += ' <span class="movie-year"> ' + movies[i].Year + ' </span></a></li> ';
	    		}
	    	}
	    	document.getElementById('movies').innerHTML = movieHTML;
		}
	};
	xhr.open('GET', 'http://www.omdbapi.com/?s=' + userInput.value + '&y=' + userInputYear.value);
	xhr.send();
}


