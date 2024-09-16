const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);

}) 