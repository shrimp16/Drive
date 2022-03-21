const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

function addFileName(uploadFiles){
    let fileList = getFiles();
    for(let i = 0; i < uploadFiles.length; i++){
        fileList.push({'file': uploadFiles[i].filename})
    }
    updateFile(fileList);
}

function updateFile(data){
    fs.writeFile('files.json', JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.log(err.message);
        }
    })
}

function getFiles(){
    return JSON.parse(fs.readFileSync('files.json'));
}

// Sets the port that the server will listen to
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

app.use(express.static(__dirname + '/WEB-PAGE'));
// Allows Cross-origin resource sharing (cors)
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/WEB-PAGE/index.html');
})

app.post('/upload', upload.array('files', 10), (req, res) => {
    console.log(req.files[0]);
    addFileName(req.files);
    res.send('Done!');
});

app.get('/file/:id', (req, res) => {
    let files = getFiles();
    let file = files[req.params.id].file;
    let options = {
        root: path.join(__dirname, 'storage'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile(file, options, (err) => {
        if(err){
            console.log(err.message);
        } else {
            console.log('File sent!')
        }
    })
})

app.get('/files', (req, res) => {
    let files = getFiles();
    res.send(JSON.stringify(files.length));
})

app.delete('/delete/:id', (req, res) => {
    let files = getFiles();
    console.log(files[req.params.id]);
    try {
        fs.unlinkSync('./storage/' + files[req.params.id].file);
        if(req.params.id === 0){
            files.shift();
        }else{
            files.splice(req.params.id, req.params.id++);
        }
        updateFile(files);
        console.log("Done");
    } catch (err) {
        console.log(err);
    }
})