'use strict';

let moviesList = document.getElementById('movies');

/**
 * Add poster to page.
 * @param {string} posterURL
 */
function addMovies(posterURL) {
  let img = document.createElement('img');
  img.src = posterURL;
  moviesList.appendChild(img);
}

function request(movieTitle) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${movieTitle}`);

    xhr.onload = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data.Search);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = (error) => {
      reject(error);
    };

    xhr.send();
  });
}

document.search.onsubmit = (event) => {
  event.preventDefault();
  moviesList.innerHTML = '';
  let movieTitle = event.target.elements.movieTitle.value;

  request(movieTitle)
    .then((data) => {
      data.forEach((movie) => {
        addMovies(movie.Poster);
      });
    })
    .catch(error => console.log(error));
};

