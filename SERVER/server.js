const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
})

const upload = multer({ storage: fileStorageEngine });

app.listen(5000);
app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Single File Upload Success')
});