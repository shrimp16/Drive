import * as uploadManager from './src/upload.js'

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');

let deleteButton = document.getElementById('delete');
let openButton = document.getElementById('open');
let closeButton = document.getElementById('close');

function cleanBody() {
    body.innerHTML = "";
    progress.style.display = "none";
}

function createNewImage(image, id) {
    let img = new Image();
    img.src = URL.createObjectURL(image);
    img.id = id;
    body.appendChild(img);
}

async function getFiles(number) {
    for (let i = 0; i < number; i++) {
        await fetch('http://192.168.1.103:5000/file/' + i)
            .then(response => response.blob())
            .then((imageBlob) => {
                console.log(i);
                createNewImage(imageBlob, i);
            })
    }
    setupDelete();
}

function setupDelete() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', () => {
            optionsCard.style.display = "block";
            deleteButton.myParam = images[i];
            openButton.myParam = images[i];
            deleteButton.addEventListener('click', remove);
            openButton.addEventListener('click', open);
            closeButton.addEventListener('click', close);
        })
    }
}

function remove(x) {
    close();
    alert("removing   " + x.currentTarget.myParam);
}

function open(x) {
    close();
    window.open(x.currentTarget.myParam.src);
}

function close() {
    optionsCard.style.display = 'none';
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
    uploadManager.start();
})

$('#files').click(() => {
    cleanBody();
    fetch('http://192.168.1.103:5000/files')
        .then((response) => response.json())
        .then((response) => getFiles(response));
})