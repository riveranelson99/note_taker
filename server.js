// Begin by bringing in all the necessary tools required of this portfolio piece
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')

// Bring in a uuid randomizer that was utilized in previous activities
const uuid = require('./public/assets/helpers/uuid')

// Use port method required by heroku and default to 3001 otherwise
const PORT = process.env.PORT || 3001;
const app = express();

// Basic middleware required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get methods to ensure that the user is presented with the appropriate information
app.get('/', (req,res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('/api/notes', (req, res) => 
    res.json(notes)
);

// Post method is creating a new note by title, text, and unique id and pushing that new note to the existing db.json
// After the new note is created and pushed, return the notes one more time to properly display the new note as it is saved to the list
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

// To delete a note, establish a for loop that goes over the entirety of the db.json as it can be read as an array
// Any instance in which a note id lines up with the pre-established code that triggers when a user clicks on the delete icon, the note itself will delete
// After a note is deleted, once again return the notes to properly display the new notes lists
app.delete('/api/notes/:id', (req, res) => {
    for (i = 0; i <notes.length; i++) {
        if (notes[i].id === req.params.id)
        notes.splice(i, 1);
    }

    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    res.json(notes);
});

// Tells the app what port to listen to so users can interact with it
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);