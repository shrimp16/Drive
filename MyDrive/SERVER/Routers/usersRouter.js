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
        { where: { email: req.body.email } }
    )

    if (user !== null) {
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

router.post('/login', jsonParser, async (req, res) => {

    let user = await User.findOne(
        { where: { name: req.body.name } }
    )

    let userByEmail = await User.findOne(
        { where: { email: req.body.name } }
    )

    if (user === null && userByEmail === null) {
        res.send({
            message: 'Wrong credentials'
        });
        return;
    }

    if ((user === null) && (userByEmail.password === req.body.password)) {
        res.send({
            message: 'Success!',
            id: userByEmail.id
        });
        return;
    }else if((user === null) && (userByEmail.password !== req.body.password)) {
        res.send({
            message: 'Wrong password!'
        })
        return;
    }

    if ((user.password === req.body.password) && (userByEmail === null)) {
        res.send({
            message: 'Success!',
            id: user.id
        });
        return;
    }else if((user.password !== req.body.password) && (userByEmail === null)) {
        res.send({
            message: 'Wrong password!'
        })
        return;
    }

    res.send({
        message: 'Something went wrong!'
    });
})

module.exports = router;