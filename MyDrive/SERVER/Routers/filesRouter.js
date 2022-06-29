const express = require('express');
const router = express.Router();

const File = require('../Persistance/Database/Tables/files');
const Limit = require('../Persistance/Database/Tables/limits');

router.get('/files-data/:user', async (req, res) => {

    let filesToUser = [];
    let filesOnDB = await File.findAll(
        { where: { userID: req.params.user } }
    )

    for (let i = 0; i < filesOnDB.length; i++){
        let file = {
            fileID: filesOnDB[i].fileID,
            dir: filesOnDB[i].dir
        }
        filesToUser.push(file);
    }

    res.send(filesToUser);

})

module.exports = router;