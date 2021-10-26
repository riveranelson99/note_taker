# Note Taker

Modifying established code in order to build a functioning note taker app.

# Pseudo Code

* WANT to be able to write and save notes THAT I can organize my thoughts and keep track of tasks I need to complete
* WHEN Note Taker is opened, THEN a landing page is presented with a link to a notes page
* WHEN the link to the notes page is clicked on, THEN a page with existing notes listed on the left-hand column, plus empty fields to enter a new note title and text in the right-hand column are presented
* WHEN a new note title and text is entered, THEN a save icon appears in the navigation at the top of the page
* WHEN the save icon is clicked on, THEN the new note is saved and appears on the left-hand column with the other existing notes
* WHEN an existing note in the list on the left-hand column is clicked on, THEN that note appears in the right-hand column
* WHEN the write icon in the navigation at the top of the page is clicked on, THEN empty fields to enter a new note title and text in the right-hand column is presented

On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes should be created:

* `GET /notes` should return the `notes.html` file.

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

# Bonus

You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
