const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const database = require('../Persistance/Database/db');

const User = require('../Persistance/Database/Tables/users');
const File = require('../Persistance/Database/Tables/files');
const Limit = require('../Persistance/Database/Tables/limits');

router.post('/register', jsonParser, async (req, res) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const newLimit = await Limit.create({
        limit: 10,
        usage: 0,
        userID: newUser.id
    })

    await database.sync();

    res.send('User created with success!');

})

module.exports = router;
/*


(async () => {

    cost database = require('./Persistance/Database/db');
    const User = require('./Persistance/Database/Tables/users');
    const File = require('./Persistance/Database/Tables/files');
    const Limit = require('./Persistance/Database/Tables/limits');n
    
    await database.sync({force: true});

    const newUser = await User.create({
        name: 'root',
        email: 'root@root.com',
        limit: 10,
        password: 'root'
    })

    const newFile = await File.create({
        path: 'example/path',
        dir: 'root',
        userID: newUser.id
    })

    const newLimit = await Limit.create({
        limit: 10,
        usage: 0,
        userID: newUser.id
    })

})();


*/

router.post('/')