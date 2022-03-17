import * as uploadManager from './src/upload.js'

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');

let deleteButton = document.getElementById('delete');
let openButton = document.getElementById('open');

let images = [];

function cleanBody() {
    body.innerHTML = "";
    progress.style.display = "none";
}

function createNewImage(image, id) {
    let img = new Image();
    img.src = URL.createObjectURL(image);
    img.id = id;
    body.appendChild(img);
    images.push(img);
}

function getFiles(number) {
    images = [];
    for (let i = 0; i < number; i++) {
        fetch('http://192.168.1.103:5000/file/' + i)
            .then(response => response.blob())
            .then((imageBlob) => {
                console.log(i);
                createNewImage(imageBlob, i);
                if(i === number - 1){
                    setupDelete();
                }
            })
    }
}

function setupDelete() {
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', () => {
            optionsCard.style.display = "block";
            optionsCard.onclick = () => { optionsCard.style.display = 'none'; }
            deleteButton.myParam = images[i];
            openButton.myParam = images[i];
            deleteButton.addEventListener('click', remove);
            openButton.addEventListener('click', open);
        })
    }
}

function remove(x) {
    alert("removing   " + x.currentTarget.myParam);
}

function open(x) {
    window.open(x.currentTarget.myParam.src);
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