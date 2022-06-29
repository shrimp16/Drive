const express = require('express');
const router = express.Router();

const File = require('../Persistance/Database/Tables/files');
const Limit = require('../Persistance/Database/Tables/limits');

const upload = require('../Persistance/uploadManager');

router.post('/upload', upload.array('files', 50), async (req, res) => {

    let userLimit = await Limit.findOne({
        where: {
            userID: req.body.userID
        }
    })

    let usage = userLimit.usage;
    
    for(let i = 0; i < req.files.length; i++){

        usage += bytesToGigabytes(req.files[i].size);

        await File.create({
            path: req.files[i].filename,
            dir: req.body.dir,
            userID: req.body.userID
        })
    }

    await Limit.update(
        { usage: usage },
        { where: { userID: req.body.userID}}
    )

    res.send({
        message: 'Files uploaded with success!'
    });

})

router.get('/storage/:user', async (req, res) => {

    let userLimits = await Limit.findOne({
        where: { userID: req.params.user }
    })

    res.send(userLimits);

})

function bytesToGigabytes(bytes) {
    return (((bytes / 1024) / 1024) / 1024);
}

module.exports = router;