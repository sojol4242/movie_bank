const API_KEY = "4cc9ae371138690468656ddee066c770";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const TOP_RATED_API_URL = `
https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const popular__list = document.getElementById("popular__list");
const top__list = document.getElementById("top__rated__list");
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
// const movie__item = document.getElementById("list__item");
const hero__section = document.getElementById("hero__section");

// initially get fav movies
getMovies(API_URL);
getTopMovies(TOP_RATED_API_URL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);

  console.log(respData);
}
async function getTopMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showTopRatedMovies(respData.results);
  console.log(respData);
}

function showTopRatedMovies(movies) {
  let html = "";

  if (movies) {
    movies.forEach((movie) => {
      const { id, poster_path, title, vote_average, overview, vote_count } =
        movie;

      console.log(id);

      let truncOverview = "";
      if (overview.length > 50) {
        truncOverview = `${overview.slice(0, 50)}...`;
      }

      html += `
               <div class="list__item" data-id ="${id}">
               <img
               src="${IMG_PATH + poster_path}"
                  alt="${title}"
                  title="${title}"
                  
                />
                <div class="movie__info">
                  <h5 class="movie__title">
                    ${title}<span class="movie__year">(2021)</span>
                  </h5>
                  <p class="movie__overview" style="overflow: hidden">
                    <span
                      ><span
                        >${truncOverview}
                      </span></span
                    >
                  </p>
                  <div class="hero__ratings">
                    <div class="ratings">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="rating__count">
                      <p class="rating__likes">${vote_average} <span>(${vote_count})</span></p>
                    </div>
                  </div>
                </div>
               </div>
                `;
    });

    popular__list.innerHTML = html;
  } else {
    console.log("Error");
  }
}
function showMovies(movies) {
  let html = "";

  if (movies) {
    movies.forEach((movie) => {
      const { id, poster_path, title, vote_average, overview, vote_count } =
        movie;

      console.log(id);

      let truncOverview = "";
      if (overview.length > 50) {
        truncOverview = `${overview.slice(0, 50)}...`;
      }

      html += `
               <div class="list__item" data-id ="${id}">
               <img
               src="${IMG_PATH + poster_path}"
                  alt="${title}"
                  title="${title}"
                  
                />
                <div class="movie__info">
                  <h5 class="movie__title">
                    ${title}<span class="movie__year">(2021)</span>
                  </h5>
                  <p class="movie__overview" style="overflow: hidden">
                    <span
                      ><span
                        >${truncOverview}
                      </span></span
                    >
                  </p>
                  <div class="hero__ratings">
                    <div class="ratings">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="rating__count">
                      <p class="rating__likes">${vote_average} <span>(${vote_count})</span></p>
                    </div>
                  </div>
                </div>
               </div>
                `;
    });

    top__list.innerHTML = html;
  } else {
    console.log("Error");
  }
}

// function getClassByRate(vote) {
//   if (vote >= 8) {
//     return "green";
//   } else if (vote >= 5) {
//     return "orange";
//   } else {
//     return "red";
//   }
// }
// search movie
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    alert("Please search with valid keyword");
  }
});

// event delegation for getting single movies

main.addEventListener("click", getMovieDetails);

async function getMovieDetails(event) {
  let singleMovie = event.target;
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${singleMovie.dataset.id}?api_key=4cc9ae371138690468656ddee066c770&language=en-US`
  );
  const respData = await resp.json();
  //   console.log(respData);
  showSingleMovie(respData);
  scrollTop();
}

function showSingleMovie(movie) {
  let html = "";

  if (movie) {
    const {
     
      genres,
      poster_path,
      title,
      vote_average,
      overview,
      vote_count,
      release_date,
      backdrop_path
    } = movie;

    html += `
    <div class="hero__section">
    <div class="hero__overlay" 
    style="background-image: url(${IMG_PATH + backdrop_path})"
    ></div>

    <p class="hero__info">Hot in this week</p>
    <h1 class="hero__title">
      ${title}&nbsp;&nbsp;||<span class="hero__year">${release_date}</span>
    </h1>
    <h4 class="hero__genres">${genres[0].name}&nbsp;&nbsp;|&nbsp;&nbsp;${
      genres[1].name
    }</h4>
    <p class="hero__desc">
    ${overview}
    </p>
    <div class="hero__ratings">
      <div class="ratings">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <div class="rating__count">
        <p class="rating__likes">${vote_average} <span>(${vote_count})</span></p>
      </div>
    </div>
    <button
      class="
        MuiButtonBase-root
        sMuiButton-root
        MuiButton-contained
        hero__button
      "
      tabindex="0"
      type="button"
    >
      <i class="fas fa-play video__icon"></i>
      <span class="MuiButton-label">Play Trailer</span
      ><span class="MuiTouchRipple-root"></span>
    </button>
  </div>
    `;
    hero__section.innerHTML = html;
  } else {
    console.log("Error");
  }
}
 
// smooth scroll after clicked on single movies
const scrollTop = () => window["scrollTo"]({ top: 0, behavior: "smooth" });
