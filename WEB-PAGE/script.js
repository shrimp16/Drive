import * as card from './src/cards.js';

let input = document.getElementById('file');
let body = document.getElementById('body');

function cleanBody() {
    body.innerHTML = "";
}

function addImage(img) {
    body.appendChild(img);
}

function createNewImage(image) {
    let img = new Image();
    img.src = URL.createObjectURL(image);
    addImage(img);
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

input.addEventListener('change', () => {
    const data = new FormData();

    if (input.files.length > 10) {
        card.show('Too much files, the limit is 10', 'red');
        return;
    }

    for (let i = 0; i < input.files.length; i++) {
        data.append('files', input.files[i]);
    }

    fetch('http://192.168.1.103:5000/upload', {
        method: 'POST',
        body: data,
    }).then(() => {
        card.show('Files sent with success', 'lightgreen');
    }).catch((err) => {
        card.show(err.message, 'red');
    })
})

$('#upload').click(() => {
    body.innerHTML = `
    <div id="drag" class="drag">
        <p>Drag your files to here or click to select files</p>
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
        console.log(e.dataTransfer.files);
    })

})

$('#files').click(() => {
    cleanBody();
    fetch('http://192.168.1.103:5000/files').then((response) => response.json()).then((response) => getFiles(response));
})