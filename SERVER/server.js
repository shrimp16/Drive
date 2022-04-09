const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const PORT = 5000;

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const app = express();

// Configure Multer
const fileStorageEngine = multer.diskStorage({
    // Where the file is going to be stored
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    // The name of the file, sets the type of file correctly
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: fileStorageEngine });

function addFileName(uploadFiles, user) {
    let fileList = getFiles();
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
}

function createFilesArray() {
    let files = getFiles();
    let newArray = {
        files: []
    }

    files.push(newArray);
    updateFile(files);
}

function getFiles() {
    let files = JSON.parse(fs.readFileSync('users_data/files.json'));
    return files;
}

function getUsers() {
    let users = JSON.parse(fs.readFileSync('users_data/users.json'));
    return users;
}

function checkUsername(username, email) {
    let users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username || users[i].email === email) {
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

function generateNewPassword() {
    let newPassword = "";
    for (let i = 0; i < 16; i++) {
        newPassword += DIGITS.charAt(Math.floor(Math.random() * DIGITS.length));
    }
    return newPassword;
}

function changePassword(email, question, password) {
    let users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].question !== question) {
            return "Invalid answer";
        }
        if (users[i].email === email && users[i].question === question) {
            users[i].password = password;
            addUser(users);
        }
    }

    return password;
}

function increaseUsedStorage(files, user) {
    let users = getUsers();
    for (let i = 0; i < files.length; i++) {
        users[user].usedStorage += bytesToGigabytes(files[i].size);
    }
    addUser(users);
}

function removeUsedStorage(size, user) {
    let users = getUsers();
    users[user].usedStorage -= bytesToGigabytes(size);
    addUser(users);
}

function bytesToGigabytes(bytes) {
    return (((bytes / 1024) / 1024) / 1024);
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
    increaseUsedStorage(req.files, req.params.user);
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

    if (file.includes('.rar', file.length - 4)) {
        res.send('rar file');
    } else {
        res.sendFile(file, options, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('File sent!');
            }
        })
    }
})

app.get('/files/:id', (req, res) => {
    let files = getFiles();
    res.send(JSON.stringify(files[req.params.id].files.length));
})

app.delete('/delete/:user/:id', (req, res) => {
    let filesList = getFiles();
    let userFiles = filesList[req.params.user].files;
    let id = parseInt(req.params.id);

    let file = fs.statSync('./storage/' + userFiles[id]);
    removeUsedStorage(file.size, req.params.user);

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

app.post('/register', (req, res) => {

    if (checkUsername(req.body.username, req.body.email)) {
        res.send("Username or E-mail already exists!");
        return;
    }

    let users = getUsers();
    let id = users.length;

    let newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        question: req.body.question,
        storage: 5,
        usedStorage: 0,
        id: id
    }

    users.push(newUser);

    addUser(users);

    createFilesArray();

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

app.post('/forgot', (req, res) => {
    if (checkUsername(null, req.body.email)) {
        res.send('Your new password is: ' + changePassword(req.body.email, req.body.question, generateNewPassword()));
    } else {
        res.send("Invalid Email");
        return;
    }
})

app.get('/space/:user', (req, res) => {
    let users = getUsers();
    let data = {
        storage: users[req.params.user].storage,
        usedStorage: users[req.params.user].usedStorage
    }
    res.send(data);
})

app.get('/test', (req, res) => {
    let files = getFiles();
    res.download(__dirname + '/storage/' + files[0].files[0]);
})