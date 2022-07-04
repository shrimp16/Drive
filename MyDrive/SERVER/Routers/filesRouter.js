const express = require('express');
const router = express.Router();

const path = require('path');

const fs = require('fs');

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

router.get('/file/:file', async (req, res) => {

    let file = await File.findOne({
        where: { fileID: req.params.file }
    })

    console.log(file.fileType);

    if(file.fileType.includes('image')){
        res.sendFile(path.join(__dirname, `../Persistance/Storage/${file.path}`));
        return;
    }

    res.send({
        message: 'Something went wrong!'
    });

})

router.get('/download-file/:file', async (req, res) => {

    let file = await File.findOne(
        { where: { fileID: req.params.file } }
    )

    res.download(path.join(__dirname, `../Persistance/Storage/${file.path}`));

})

router.delete('/delete-file/:file', async (req, res) => {

    let file = await File.findOne(
        { where: { fileID: req.params.file } }
    )

    fs.unlink(path.join(__dirname, `../Persistance/Storage/${file.path}`), (err) => {
        if (err) throw err;
        res.send({
            message: 'File deleted!'
        })
        return;
    })

    res.send({
        message: 'Something went wrong!'
    })

})

router.get('/limit/:user', async (req, res) => {

    let limit = await Limit.findOne(
        { where: { userID: req.params.user }}
    )

    res.send({
        limit: limit.limit,
        usage: limit.usage
    });

})

module.exports = router;