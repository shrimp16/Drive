import * as uploadManager from './src/upload.js';
import * as card from './src/cards.js';
import * as config from './src/config.js';
import { setIcon } from './icons/icons.js';

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');
let drag = document.getElementById("drag");

let images = [];

function cleanBody() {
    body.innerHTML = "";
    progress.style.display = "none";
    drag.style.display = "none";
}

function createNewImage(image) {
    let img = new Image();
    let str = image.type;
    let arr = str.split('/');

    if(arr[0] === 'image'){
        img.src = URL.createObjectURL(image);
    }else{
        img.src = setIcon(str);
    }
    console.log(str);
    body.appendChild(img);
    images.push(URL.createObjectURL(image));
}

async function getFiles(number) {
    for (let i = 0; i < number; i++) {
        await fetch(`${config.ADDRESS}/file/${i}`)
            .then(response => response.blob())
            .then((imageBlob) => {
                createNewImage(imageBlob);
            })
    }
    card.setupOptionsCard();
    card.setFilesURL(images);
}

input.addEventListener('change', () => {
    uploadManager.uploadFiles(input.files);
})

$('#upload').click(() => {
    cleanBody();
    drag.style.display = 'block';
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