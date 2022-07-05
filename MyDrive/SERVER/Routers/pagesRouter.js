const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/page/vanilla', (req, res) => {
    res.sendFile(path.join(__dirname, '../../WEB-PAGE (Vanilla)/index.html'));
})

module.exports = router;
