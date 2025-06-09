// API Constants
const apiLink = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cb59f014c8c0f6911728fff3e3b277f2&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=cb59f014c8c0f6911728fff3e3b277f2&query=';

// DOM Elements
const movieGrid = document.getElementById('movie-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('query');

// Fetch and render movies
function fetchAndRenderMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            movieGrid.innerHTML = ''; // Clear previous results
            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.setAttribute('data-movie-id', movie.id);

                movieCard.innerHTML = `
                    <img src="${imgPath + movie.poster_path}" alt="${movie.title}" class="thumbnail">
                    <h3>${movie.title}</h3>
                `;

                movieCard.addEventListener('click', () => {
                    showMovieDetails(movie.id);
                });

                movieGrid.appendChild(movieCard);
            });
        })
        .catch(err => console.error('Error fetching movies:', err));
}

// Initial load of popular movies
fetchAndRenderMovies(apiLink);

// Handle search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchAndRenderMovies(searchApi + query);
        searchInput.value = '';
    }
});

// Show movie details in modal
function showMovieDetails(movieId) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=cb59f014c8c0f6911728fff3e3b277f2`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=cb59f014c8c0f6911728fff3e3b277f2`;

    // Fetch movie details
    fetch(detailsUrl)
        .then(res => res.json())
        .then(movie => {
            const modal = document.getElementById('movie-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalOverview = document.getElementById('modal-overview');
            const modalDate = document.getElementById('modal-date');
            const modalRating = document.getElementById('modal-rating');
            const modalPoster = document.getElementById('modal-poster');
            const trailerContainer = document.getElementById('trailer-container');

            // Basic Info
            modalTitle.innerText = movie.title;
            modalOverview.innerText = movie.overview || 'No overview available.';
            modalDate.innerText = movie.release_date || 'N/A';
            modalRating.innerText = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
            modalPoster.src = imgPath + (movie.poster_path || '');
            trailerContainer.innerHTML = 'Loading trailer...';

            // Show the modal
            modal.style.display = 'block';

            // Fetch trailer info
            fetch(videosUrl)
                .then(res => res.json())
                .then(data => {
                    const trailer = data.results.find(video =>
                        video.type === "Trailer" && video.site === "YouTube"
                    );

                    if (trailer) {
                        const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
                        trailerContainer.innerHTML = `
                            <iframe width="100%" height="315" 
                              src="${youtubeUrl}" 
                              frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                            </iframe>
                        `;
                    } else {
                        trailerContainer.innerHTML = "<p>No trailer available.</p>";
                    }
                })
                .catch(err => {
                    trailerContainer.innerHTML = "<p>Error loading trailer.</p>";
                    console.error('Trailer fetch failed:', err);
                });
        })
        .catch(err => console.error('Error fetching movie details:', err));
}

// Close modal when clicking X or outside
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('movie-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('movie-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// Only add these event listeners if the elements exist
if (document.getElementById('theme-toggle')) {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
}

if (document.querySelector('.add-watchlist')) {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('add-watchlist')) {
            const id = e.target.dataset.id;
            let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            if (!watchlist.includes(id)) watchlist.push(id);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert("Added to watchlist!");
        }
    });
}
