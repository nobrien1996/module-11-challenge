//SETTING CONSTS
const router = require('express').Router();
const store = require('../db/store');

//GET FOR NOTES
router.get('/notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//POST FOR NOTES
router.post('/notes', (req, res) => {
    store.addNote(req.body).then((note) => res/json(note))
        .catch((err) => res.status(500).json(err));
});

//DELETE FOR NOTES SPECIFICS
router.delete('/notes/:id', (req, res) => {
    store.removeNote(req.params.id)
        .then(() => res.json({ ok : true }))
        .catch((err) => res.status(500).json(err));
});

//EXPORTING ROUTER
module.exports = router;