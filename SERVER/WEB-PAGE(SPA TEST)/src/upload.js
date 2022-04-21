import * as card from './cards.js';
import * as config from './config.js';
import * as storage from './storage.js';

let progressBar = document.getElementById('progress-bar');
let progressText = document.getElementById('progress-text');

export function setupUpload() {
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

    if(data.length > config.FILE_LIMIT){
        card.show(`The file limit is 10`);
        return
    }

    for(let i = 0; i < data.length; i++){
        dataToSend.append('files', data[i]);
    }

    sendToServer(dataToSend);

}

function sendToServer(files){

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${config.ADDRESS}/upload/${config.currentUser}`);

    xhr.upload.addEventListener('progress', ({loaded, total}) => {
        let load = Math.floor((loaded / total) * 100);
        progressBar.max = 100;
        progressBar.style.width = `${load}%`;
        progressText.innerText = load + '%';
        if(loaded === total){
            progressText.innerText = 'File sent!';
        }
    })
    xhr.send(files);
    storage.updateStorageInfo(config.currentUser);

}