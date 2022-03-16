import * as card from './cards.js';

let progressBar = document.getElementById('progress-bar');
let progressText = document.getElementById('progress-text');

export function start() {
    let uploadMenu = document.querySelector('#drag');

    progressText.innerText = "0%";
    progressBar.style.width = '0%';

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

}

export function uploadFiles(data) {

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
        progressBar.style.width = `${load}%`;
        progressText.innerText = load + '%';
        if(loaded === total){
            progressText.innerText = 'File sent!'
        }
    })
    xhr.send(files);

}