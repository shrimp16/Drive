import * as card from './src/cards.js';

let input = document.getElementById('file');
let body = document.getElementById('body');
let progressBar = document.getElementById('progress');
let progressText = document.getElementById('progress-text');
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

function uploadFiles(data) {

    let dataToSend = new FormData();

    if(data.length > 10){
        card.show('The file limit is 10', 'lightgray');
        return
    }

    for(let i = 0; i < data.length; i++){
        dataToSend.append('files', data[i]);
    }

    sendToServer(dataToSend);

}

function sendToServer(files){

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.1.103:5000/upload');

    xhr.upload.addEventListener('progress', ({loaded, total}) => {
        let load = Math.floor((loaded / total) * 100);
        progressBar.max = 100;
        progressBar.value = load;
        progressText.innerText = load + '%';
        if(loaded === total){
            progressText.innerText = 'File sent!'
        }
    })
    xhr.send(files);

}

input.addEventListener('change', () => {
    uploadFiles(input.files);
})

$('#upload').click(() => {
    body.innerHTML = `
    <div id="drag" class="drag">
        <p>Drag your files to here or click to select files</p>
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
    </div>`;

    progress.style.display = 'flex';

    let uploadMenu = document.querySelector('#drag');

    uploadMenu.addEventListener('click', () => {
        $('#file').trigger('click');
    })

    uploadMenu.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadMenu.classList.add('drag-hover');
    })

    uploadMenu.addEventListener('dragleave', () => {
        uploadMenu.classList.remove('drag-hover');
    })

    uploadMenu.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadFiles(e.dataTransfer.files);
    })

})

$('#files').click(() => {
    cleanBody();
    fetch('http://192.168.1.103:5000/files')
    .then((response) => response.json())
    .then((response) => getFiles(response));
})