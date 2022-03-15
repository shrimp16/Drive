import * as uploadManager from './src/upload.js'

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress-menu');

function cleanBody() {
    body.innerHTML = "";
    progress.style.display = "none";
}

function createNewImage(image) {
    let img = new Image();
    img.src = URL.createObjectURL(image);
    body.appendChild(img);
}

function getFiles(number) {
    for (let i = 0; i < number; i++) {
        fetch('http://192.168.1.103:5000/file/' + i)
            .then(response => response.blob())
            .then((imageBlob) => {
                createNewImage(imageBlob);
            })
    }
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
    progress.style.display = 'flex';
    uploadManager.setupDragAndDrop();
})

$('#files').click(() => {
    cleanBody();
    fetch('http://192.168.1.103:5000/files')
    .then((response) => response.json())
    .then((response) => getFiles(response));
})