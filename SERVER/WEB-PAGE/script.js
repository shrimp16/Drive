import * as uploadManager from './src/upload.js';
import * as card from './src/cards.js';
import * as config from './src/config.js';

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');

let images = [];

function cleanBody() {
    body.innerHTML = "";
    progress.style.display = "none";
}

function createNewImage(image, id) {
    let img = new Image();
    img.src = URL.createObjectURL(image);
    img.alt = image.type;
    img.id = id;
    body.appendChild(img);
    images.push(URL.createObjectURL(image));
}

async function getFiles(number) {
    for (let i = 0; i < number; i++) {
        await fetch(`${config.ADDRESS}/file/${i}`)
            .then(response => response.blob())
            .then((imageBlob) => {
                createNewImage(imageBlob, i);
            })
    }
    card.setupOptionsCard();
    card.setFilesURL(images);
}

input.addEventListener('change', () => {
    uploadManager.uploadFiles(input.files);
})

$('#upload').click(() => {
    body.innerHTML = `
    <div id="drag" class="drag">
        <p>Drag your files to here or click to select files</p>
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
    </div>`;
    progress.style.display = 'block';
    optionsCard.style.display = 'none';
    uploadManager.setupUpload();
})

$('#files').click(() => {
    cleanBody();
    fetch(`${config.ADDRESS}/files`)
        .then((response) => response.json())
        .then((response) => getFiles(response));
})