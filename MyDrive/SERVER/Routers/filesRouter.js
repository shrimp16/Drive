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

    if(file === null) {
        res.send({
            message: `File doesn't exist!`
        })
        return;
    }

    console.log(file.fileType);

    if (file.fileType.includes('image')){
        res.sendFile(path.join(__dirname, `../Persistance/Storage/${file.path}`));
        return;
    } else if (file.fileType.includes('audio')){
        res.send('audio');
        return;
    } else if (file.fileType.includes('video')){
        res.send('video');
        return;
    } else if (file.fileType.includes('vnd.rar')){
        res.send('rar');
        return;
    } else if (file.fileType.includes('text')){
        res.send('normal text');
        return;
    } else if (file.fileType.includes('wordprocessingml')){
        res.send('word');
        return;
    } else if (file.fileType.includes('presentationml')){
        res.send('power point');
        return;
    } else if (file.fileType.includes('x-mspublisher')){
        res.send('publisher');
        return;
    } else if (file.fileType.includes('spreadsheetml')){
        res.send('excel');
        return;
    }

    res.send({
        message: 'Something went wrong!'
    });

    //applicationvnd.openxmlformats-officedocument.wordprocessingml.document
    //application/vnd.openxmlformats-officedocument.presentationml.presentation
    //application/x-mspublisher
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
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

    await File.destroy(
        { where: { fileID: req.params.file } }
    )

    fs.unlink(path.join(__dirname, `../Persistance/Storage/${file.path}`), async (err) => {
        
        if (err) {
            res.send({
                message: 'Something went wrong!',
                error: err.message
            })
        }

        res.send({
            message: 'File deleted!'
        })

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