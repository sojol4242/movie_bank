const API_KEY = "4cc9ae371138690468656ddee066c770";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const TOP_RATED_API_URL = `
https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const popular__list = document.getElementById("popular__list");
const top__list = document.getElementById("top__rated__list");
const search__list = document.getElementById("search__list");
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const hero = document.getElementById("hero__section");
const see__more = document.querySelector(".see__more");
const see__more__text = document.querySelector(".hero__desc");
const search__heading = document.querySelector(".search__list");

// trailer modal

const video__modal = document.querySelector(".video__modal");
// const trailer__btn=document.querySelector(".hero__button");

// trailer__btn.addEventListener("click",(e)=>{
//   console.log(e);
// })

// loading spinner
const preloader = document.querySelector(".preloader");
function ladingSpinner(show) {
  if (show) {
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1000);
  } else {
    preloader.style.display = "flex";
  }
}
ladingSpinner(true);

// navbar
const ham = document.querySelector(".header .nav-bar .ham");

const nav = document.querySelector(".header .nav-bar nav");
ham.addEventListener("click", () => {
  nav.classList.toggle("nav-toggle");
  ham.classList.toggle("close");
});

// initially get popular  movies
getMovies(API_URL);
// initially get top rated  movies

getTopMovies(TOP_RATED_API_URL);

getSearchResults(SEARCH_API);

async function getTopMovies(url) {
  try {
    const resp = await fetch(url);

    const respData = await resp.json();
    ladingSpinner(true);
    showTopRatedMovies(respData.results);
    ladingSpinner(false);
  } catch (error) {
    console.log("Error ", err.message);
  }
}

function showTopRatedMovies(movies) {
  let html = "";

  if (movies) {
    movies.forEach((movie) => {
      const { id, poster_path, title, vote_average, overview, vote_count } =
        movie;

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
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
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
    search__list.innerHTML = "";
  } else {
    console.log("Error");
  }
}
async function getMovies(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    ladingSpinner(true);
    showMovies(respData.results);
    ladingSpinner(false);
  } catch (error) {
    console.log("Error ", err.message);
  }
}
function showMovies(movies) {
  let html = "";

  if (movies) {
    movies.forEach((movie) => {
      const { id, poster_path, title, vote_average, overview, vote_count } =
        movie;

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
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
                    <i class="fas fa-star hero__star"></i>
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
async function getSearchResults(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    ladingSpinner(true);
    showSearchMovies(respData.results);
    ladingSpinner(false);
  } catch (error) {
    alert("Search movie not called yet", error.message);
  }
}

function showSearchMovies(movies) {
  let html = "";
  if (movies) {
    movies.forEach((movie) => {
      const { id, poster_path, title, vote_average, overview, vote_count } =
        movie;
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
                      <i class="fas fa-star hero__star"></i>
                      <i class="fas fa-star hero__star"></i>
                      <i class="fas fa-star hero__star"></i>
                      <i class="fas fa-star hero__star"></i>
                      <i class="fas fa-star hero__star"></i>
                    </div>
                    <div class="rating__count">
                      <p class="rating__likes">${vote_average} <span>(${vote_count})</span></p>
                    </div>
                  </div>
                </div>
               </div>
                `;
    });

    search__list.innerHTML = html;
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
    getSearchResults(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    alert("Please search with valid keyword");
  }
});

// event delegation for getting single movies

main.addEventListener("click", getMovieDetails);

async function getMovieDetails(event) {
  try {
    let movie__id = event.target.dataset.id;
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${movie__id}?api_key=${API_KEY}&language=en-US`
    );
    ladingSpinner(false);
    const respData = await resp.json();
    ladingSpinner(true);
    scrollTop();
    showSingleMovie(respData);
  } catch (error) {
    console.log(error.message);
  }
}
async function getTrailer(event) {
  try {
    let movie__id = event.target.dataset.id;
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${movie__id}/videos?api_key=${API_KEY}&language=en-US;
      `
    );

    const respData = await resp.json();
    console.log(respData);
    // showSingleMovie(respData);
  } catch (error) {
    console.log(error.message);
  }
}

function showSingleMovie(movie) {
  if (movie) {
    const {
      genres,
      title,
      vote_average,
      overview,
      vote_count,
      release_date,
      backdrop_path,
    } = movie;

    let rate = Math.round(vote_average / 2);
    // rate=Array(rate).fill().map((_,i)=>{
    //    "*"
    // })

    let html = `
     
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
    ${overview.slice(0, 120)}
    <span class="dots">....</span>
     
    <span class="hidden__text">
    ${overview.slice(100, overview.length)}
    </span>  <span class="see__more"> See More</span> 
  
    </p>
    
   
    <div class="hero__ratings">
      <div class="ratings">
      <i class="fas fa-star hero__star"></i>
      <i class="fas fa-star hero__star"></i>
      <i class="fas fa-star hero__star"></i>
      <i class="fas fa-star hero__star"></i>
      </div>
      <div class="rating__count">
        <p class="rating__likes">${rate} <span>(${vote_count})</span></p>
      </div>
    </div>
    <button
      class="
        MuiButtonBase-root
        sMuiButton-root
        MuiButton-contained
        hero__button
      "
      tab-index="0"
      type="button"
    >
      <i class="fas fa-play video__icon"></i>
      <span class="MuiButton-label">Play Trailer</span
      ><span class="MuiTouchRipple-root"></span>
    </button>
  
    <div class="video__modal">
    <div class="close__modal__icon">
  
    </div>
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/"
      
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
    `;
    hero__section.innerHTML = html;
  } else {
    hero__section.innerHTML = "Something is wrong";
  }
}

// get trailer

// async function getTrailer(e){
//   const movie__id=e.target.dataset

// }

// function star(){
//   Array(rate).fill().map((_,i)=>{

//   })
// }

// smooth scroll after clicked on single movies
const scrollTop = () => window["scrollTo"]({ top: 0, behavior: "smooth" });

// see more and play trailer
hero.addEventListener("click", heroFunction);

function heroFunction(e) {
  const { className, tagName } = e.target;
  if (className === "see__more") {
    const desc = e.target.parentElement;
    if (desc) {
      desc.classList.toggle("see__more__text");
      if (see__more.innerText === "See More") {
        see__more.innerText = "See Less";
      } else {
        see__more.innerText = "See More";
      }
    }
    see__more__text.classList.toggle("see__more__text");
  }

  // else if (tagName.toLowerCase() === "button") {

  //    const hero__section=e.target.parentElement;
  //    let html='';

  // }
  //  movie__url=https://www.youtube.com/embed/
}
