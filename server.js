const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')
const uuid = require('./public/assets/helpers/uuid')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => 
    res.json(notes)
);


app.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    }

    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes,null, 2));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    res.json(notes);
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);