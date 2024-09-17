const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')


const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: "Movie Not Found" })
})

app.post('/movies', (req, res) => {
    const {
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(), // uuid v4
        title,
        genre,
        year,
        director,
        duration,
        rate: rate ?? 0,
        poster
    }

    //esto no es REST, porque estoy guardando el estado de la aplicacion en memoria
    movies.push(newMovie)

    res.status(201) //actualizar la ache del cliente al mandar el newMovie
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);

}) 