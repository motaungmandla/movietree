// alert("Greetings from Motaung Johannese Motaung");

// Motaung Links to the content.
const apiLink = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cb59f014c8c0f6911728fff3e3b277f2&page=1';  // Link to the API, works over the web only
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchApi = 'https://api.themoviedb.org/3/search/movie?&api_key=cb59f014c8c0f6911728fff3e3b277f2&query=';

const userQuery = document.getElementById("section");
const formInfo = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(apiLink);

function returnMovies(url) {
    fetch(url).then(res => res.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                div_card.setAttribute('data-movie-id', element.id); // Add movie ID for reference

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const images = document.createElement('img');
                images.setAttribute('class', 'thumbnail');
                images.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const mycenter = document.createElement('div');
                mycenter.className = "centered"; // To access and style this later

                title.innerHTML = `${element.title}`;
                images.src = imgPath + element.poster_path;
                mycenter.appendChild(images);
                div_card.appendChild(mycenter);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                userQuery.appendChild(div_row);  // Main

                // Add event listener to make the movie clickable
                div_card.addEventListener('click', () => {
                    //window.location.href = `details.html?id=${element.id}`;
                    alert(`Contact Mandla about ${element.title`);
                });

            });
        });
}

formInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    userQuery.innerHTML = ''; // Remove old search results

    const searchItem = search.value;
    if (searchItem) {
        returnMovies(searchApi + searchItem);
        search.value = "";
    }
});

