const apiKey = 'cb59f014c8c0f6911728fff3e3b277f2'; // Your API key
const movieDetailsDiv = document.getElementById('movie-details');

// Function to get the movie ID from the URL
function getMovieId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch movie details using the movie ID
function fetchMovieDetails(movieId) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

// Display movie details on the page
function displayMovieDetails(movie) {
    const title = document.createElement('h1');
    title.textContent = movie.title;

    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${movie.release_date}`;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${movie.vote_average}`;

    movieDetailsDiv.appendChild(title);
    movieDetailsDiv.appendChild(poster);
    movieDetailsDiv.appendChild(overview);
    movieDetailsDiv.appendChild(releaseDate);
    movieDetailsDiv.appendChild(rating);
}

// Initialize the process
const movieId = getMovieId();
if (movieId) {
    fetchMovieDetails(movieId);
} else {
    movieDetailsDiv.textContent = 'Movie ID not found.';
}
