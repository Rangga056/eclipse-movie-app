// * HTML DOM Variable
const search = document.querySelector(".search_input");
const main = document.getElementById("content");
const searchBtn = document.querySelector(".search-btn");
const topRatedBtn = document.querySelector(".top_rated_button");
const trendingBtn = document.querySelector(".trending_button");
const errorMessage = document.querySelector(".error-message");

//* API
const apikey = "c65a2cdc245291ed6b0df91dafa436e1";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=c65a2cdc245291ed6b0df91dafa436e1";
const URLByRating =
  "https://api.themoviedb.org/3/discover/movie?api_key=c65a2cdc245291ed6b0df91dafa436e1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";
const IMGPATH = "https://image.tmdb.org/t/p/w500/";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=c65a2cdc245291ed6b0df91dafa436e1&query=";
  

// * Data fetching
getMovieData(APIURL);

async function getMovieData(url) {
  await fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      data.results.forEach((movie) => {
        const { poster_path, title, vote_average, overview, release_date } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title}" class="movie_img"/>
      <div class="movie_details">
        <h3 class="movie_title">${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}<i class="fa-solid fa-star"></i></span>
      </div>
  
      <div class="overview">
        ${overview}
      </div>
      <span class="release_date">${release_date}</span>
      `;
        main.appendChild(movieEl);
      });
    });

  function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
}

searchBtn.addEventListener("click", () => {
  main.innerHTML = "";
  let searchedItem = search.value;


  try {
    getMovieData(SEARCHAPI + searchedItem);
    search.value = "";
  } catch (error) {
    console.log(error);
    errorMessage.style.display = "flex";
  }
});

search.addEventListener("keypress", (e) => {
  let searchedItem = search.value;

  if (e.key === "Enter") {
    e.preventDefault();

    main.innerHTML = "";

    try {
      getMovieData(SEARCHAPI + searchedItem);
      search.value = "";
    } catch (error) {
      console.log(error);
      errorMessage.style.display = "flex";
    }
  }
});

topRatedBtn.addEventListener("click", () => {
  main.innerHTML = "";
  let searchedItem = search.value;


  try {
    getMovieData(URLByRating);
    searchedItem = "";
  } catch (error) {
    console.log(error);
    errorMessage.style.display = "flex";
  }
});

trendingBtn.addEventListener("click", () => {
  let searchedItem = search.value;
  main.innerHTML = "";

  try {
    getMovieData(APIURL);
    searchedItem = "";
  } catch (error) {
    console.log(error);
    errorMessage.style.display = "flex";
  }
});

