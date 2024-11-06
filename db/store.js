//SETTING CONSTS
const util = require('util');
const fs = require('fs');
const uuidv11 = require('uuid/v11');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//SETTING CLASS STORE TO HELP CONSOLIDATE INFO
class Store {
    //READ INFO
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }

    //WRITE INFO
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    //GET NOTES
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    //ADD NEW NOTES
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("You've gottat write something, buddy");
        }
        const newNote = { title, text, id: uuidv11() };
        return this.getNotes().then((notes) => [
            ...notes, newNote]).then((updatedNotes) =>
            this.write(updatedNotes))
            .then(() => newNote);
    }

    //REMOVE NOTES WITH A GIVEN ID
    removeNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

//EXPORT STORE
module.exports = new Store();