const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

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

function addFileName(files){
    let currentFiles = fs.readFileSync('files.json');
    currentFiles = JSON.parse(currentFiles);
    for(let i = 0; i < files.length; i++){
        currentFiles.push({'file': files[i].filename})
    }
    fs.writeFile('files.json', JSON.stringify(currentFiles, null, 2), (err) => {
        if(err){
            console.log(err.message);
        }
    })
}

function getFiles(){
    
}

// Sets the port that the server will listen to
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

// Allows Cross-origin resource sharing (cors)
app.use(cors());

app.post('/upload', upload.array('files', 10), (req, res) => {
    console.log(req.files[0]);
    addFileName(req.files);
    res.send('Done!');
});

app.get('/file/:id', (req, res) => {
    let files = getFiles();
    let options = {
        root: path.join(__dirname, 'storage'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    //WIP
    res.sendFile(files[req.params.id], options, (err) => {
        if(err){
            console.log(err.message);
        } else {
            console.log('Sent!')
        }
    })
})