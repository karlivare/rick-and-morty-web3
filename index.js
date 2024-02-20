const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const port = 3000

// Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true
});

const characterData = require('./static/character-data.json')

// Static Files
app.use(express.static('static'))

// Endpoint for /characters shows all characters
app.get('/characters', function(req, res) {
    res.render('characters.njk', { characters: characterData.results });
});

// Endpoint for /characters/:id shows details for ONE characer
app.get('/character/:id', function(req, res) {
    const id = req.params.id;
    const character = characterData.results.find(char => char.id == id);
    res.render('character.njk', { character: character });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
