const express = require('express')
const app = express()

const port = 3000

// include express-hadlebars from module
const exphbs = require('express-handlebars')

const movieList = require('./movies.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  // res.send('initializing')
  // create a variable to store movieOne
  // const movieOne = {
  //   id: 1,
  //   title: 'Jurassic World',
  //   image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
  // }
  // res.render('index', { movie: movieOne })
  res.render('index', { movies: movieList.results})
})
// display movie detail
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', {movie: movie})
})
// search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
  console.log(movies)
  res.render('index', {movies: movies, keyword: keyword})
})

app.listen(port, () => {
  console.log(`listening to localhost:${port}`)
})