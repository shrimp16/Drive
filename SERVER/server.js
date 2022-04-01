const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

const PORT = 5000;

const app = express();

// Configure Multer
const fileStorageEngine = multer.diskStorage({
    // Where the file is going to be stored
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    // The name of the file, sets the type of file correctly
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine });

function addFileName(uploadFiles, user) {
    let fileList = getFiles();
    console.log(fileList[user]);
    for (let i = 0; i < uploadFiles.length; i++) {
        fileList[user].files.push(uploadFiles[i].filename);
    }
    updateFile(fileList);
}

function updateFile(data) {
    fs.writeFile('users_data/files.json', JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err.message);
    })
}

function addUser(user) {
    fs.writeFile('users_data/users.json', JSON.stringify(user, null, 2), (err) => {
        if (err) console.log(err.message);
    })
    createFilesArray();
}

function createFilesArray() {
    let files = getFiles();
    let newArray = {
        files: []
    }
    
    files.push(newArray);
    updateFile(files)
}

function getFiles() {
    let files = JSON.parse(fs.readFileSync('users_data/files.json'));
    return files;
}

function getUsers() {
    let users = JSON.parse(fs.readFileSync('users_data/users.json'));
    return users;
}

function checkUsername(username) {
    let users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return true;
        }
    }
    return false;
}

function auth(user) {
    let users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if ((users[i].username === user.username || users[i].email === user.username) && users[i].password === user.password) {
            return users[i].id;
        }
    }
    return "Wrong";
}

// Sets the port that the server will listen to
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

app.use(express.static(__dirname + '/WEB-PAGE'));
// Allows Cross-origin resource sharing (cors)
app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/WEB-PAGE/index.html');
})

app.post('/upload/:user', upload.array('files', 10), (req, res) => {
    addFileName(req.files, req.params.user);
    res.send('Done!');
});

app.get('/file/:user/:id', (req, res) => {
    let files = getFiles();
    let file = files[req.params.user].files[req.params.id];
    let options = {
        root: path.join(__dirname, 'storage'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile(file, options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('File sent!');
        }
    })
})

app.get('/files/:id', (req, res) => {
    let files = getFiles();
    res.send(JSON.stringify(files[req.params.id].files.length));
})

app.delete('/delete/:user/:id', (req, res) => {
    let filesList = getFiles();
    let userFiles = filesList[req.params.user].files;
    let id = parseInt(req.params.id);

    try {
        fs.unlinkSync('./storage/' + userFiles[id]);
        console.log("Deleted File");
    } catch (err) {
        console.log(err);
    }

    if (id === 0) {
        filesList[req.params.user].files.shift();
    } else {
        filesList[req.params.user].files.splice(id, 1);
    }

    updateFile(filesList);

    res.send("Deleted File");
})

app.post('/test/:userID', (req, res) => {
    let xd = JSON.parse(fs.readFileSync('users_data/users.json'));
    console.log(xd.length);
    res.send(xd);
})

app.post('/register', (req, res) => {

    if (checkUsername(req.body.username)) {
        res.send("Username already exists!");
        return;
    }

    let users = getUsers();
    let id = users.length;

    let newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        question: req.body.question,
        id: id
    }

    users.push(newUser);

    addUser(users);

    res.send("Account created with success!");
})

app.post('/login', (req, res) => {

    let log = auth(req.body);

    if (log === 'Wrong') {
        res.send('Username or password is wrong');
        return;
    }

    res.send(`${log}`);
})