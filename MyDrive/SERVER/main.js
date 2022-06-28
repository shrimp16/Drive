(async () => {

    const database = require('./Persistance/Database/db');
    const User = require('./Persistance/Database/Tables/users');
    const File = require('./Persistance/Database/Tables/files');
    const Limit = require('./Persistance/Database/Tables/limits');
    
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