const express = require('express');
const router = express.Router();

const File = require('../Persistance/Database/Tables/files');
const Limit = require('../Persistance/Database/Tables/limits');

const upload = require('../Persistance/uploadManager');

router.post('/upload', upload.array('files', 50), async (req, res) => {

    for(let i = 0; i < req.files.length; i++){
        await File.create({
            path: req.files[i].filename,
            dir: req.body.dir,
            userID: req.body.userID
        })
    }

    res.send({
        message: 'Files uploaded with success!'
    });

})

module.exports = router;