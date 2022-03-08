const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
})

const upload = multer({ storage: fileStorageEngine });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});
app.use(cors());

app.post('/upload', upload.array('files', 10), (req, res) => {
    console.log(req.files);
    res.send('Done!');
});