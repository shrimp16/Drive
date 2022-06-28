const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const database = require('../Persistance/Database/db');

const User = require('../Persistance/Database/Tables/users');
const File = require('../Persistance/Database/Tables/files');
const Limit = require('../Persistance/Database/Tables/limits');

router.post('/register', jsonParser, async (req, res) => {

    await database.sync();

    let user = await User.findOne(
        { where: { name: req.body.name } }
    )

    let userByEmail = await User.findOne(
        { where: {email: req.body.email }}
    )

    if (user !== null){
        res.send('Username already in use!');
        return;
    }

    if (userByEmail !== null) {
        res.send("Email already in use!");
        return;
    }

    if (user === null && userByEmail === null) {
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

        res.send('User created with success');
        return;
    }

    res.send('Something went wrong');

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