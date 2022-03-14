import * as card from './src/cards.js';

let input = document.getElementById('file');
let body = document.getElementById('body');

function cleanBody() {
    body.innerHTML = "";
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
    card.show('Files loaded', 'lightgreen');
}

function uploadFiles(data) {

    let dataToSend = new FormData();

    if(data.length > 10){
        card.show('Thte file limit is 10', 'red');
        return
    }

    for(let i = 0; i < data.length; i++){
        dataToSend.append('files', data[i]);
    }

    sendToServer(dataToSend);

}

function sendToServer(files){

    fetch('http://192.168.1.103:5000/upload', {
        method: 'POST',
        body: files,
    }).then(() => {
        card.show('Files sent with success', 'lightgreen');
    }).catch((err) => {
        card.show(err.message, 'red');
    })

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
    fetch('http://192.168.1.103:5000/files').then((response) => response.json()).then((response) => getFiles(response));
})