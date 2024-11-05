//SETTING CONSTS
const path = require('path');
const router = require('express').Router();

//GET FOR NOTES.HTML FILE
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//GET FOR INDEX.HTML FILE FOR ALL OTHER ROUTES
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//EXPORTING ROUTER
module.exports = router;