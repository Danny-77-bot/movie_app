//step 2 write the api and save in variable
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const colorChangeBtn = document.getElementById('colorChangeBtn');

const body = document.body;
const overviews = document.querySelectorAll('.overview');

//how the seach functionality works geneally
//get the search value and save in variable
//

getMovies(API_URL)




async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}
//rate functionality which changes the color
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
//seach functioality
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})


colorChangeBtn.addEventListener('click', () => {
   

    // Toggle colors
    if (body.style.backgroundColor === 'black') {
        colorChangeBtn.innerHTML='light'
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        main.classList.remove('dark-hover');
        
        // Change overview color for light mode
        overviews.forEach(overview => {
            overview.style.backgroundColor ='black'; // Light background for overview
            overview.style.color = 'white'; // Dark text for overview
        });
    } else {
        colorChangeBtn.innerHTML='dark'

        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        main.classList.add('dark-hover');
        
        // Change overview color for dark mode
        overviews.forEach(overview => {
            overview.style.backgroundColor = 'white'; // Semi-transparent white for overview
            overview.style.color = 'black'; // Light text for overview
        });
    }
});