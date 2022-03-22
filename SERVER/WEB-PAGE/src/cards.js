import * as config from './config.js';

let infoCard = document.getElementById('alert');
let infoCardText = document.getElementById('alert-text');

let optionsCard = document.getElementById('options-card');

let deleteButton = document.getElementById('delete');
let openButton = document.getElementById('open');
let closeButton = document.getElementById('close');

let filesURL = [];

export function setFilesURL(data){
    filesURL = data;
}

export function show(text){
    infoCardText.innerText = text;
    infoCard.style.display = "block";
}

export function setupOptionsCard() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {

        images[i].addEventListener('click', () => {

            optionsCard.style.display = "block";

            deleteButton.myParam = i;
            openButton.myParam = i;
            
            deleteButton.addEventListener('click', remove);
            openButton.addEventListener('click', open);
            closeButton.addEventListener('click', close);
        })
    }
}

function remove(x) {
    console.log(x.currentTarget.myParam);

    if(x.currentTarget.myParam === 0){
        filesURL.shift();
    }else{
        filesURL.splice(x.currentTarget.myParam, 1);
    }

    close();
    fetch(`${config.ADDRESS}/delete/${x.currentTarget.myParam}`, {
        method: 'DELETE',
    }).then(response => response.text())
    .then((response) => {
        console.log(response);
        $('#files').trigger('click');
    })
}

function open(x) {
    close();
    window.open(filesURL[x.currentTarget.myParam]);
}

function close() {
    optionsCard.style.display = 'none';
}