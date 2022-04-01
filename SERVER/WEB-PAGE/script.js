import * as uploadManager from './src/upload.js';
import * as card from './src/cards.js';
import * as config from './src/config.js';
import * as userAuth from './src/auth.js';
import { setIcon } from './icons/icons.js';

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');
let drag = document.getElementById("drag");

let loginBody = document.getElementById('login-body');
let registerBody = document.getElementById('register-body');
let goToLoging = document.getElementById('go-to-login');
let goToRegister = document.getElementById('go-to-register');

let images = [];

goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerBody.style.display = 'flex';
    loginBody.style.display = 'none';
})

goToLoging.addEventListener('click', (e) => {
    e.preventDefault();
    registerBody.style.display = "none";
    loginBody.style.display = "flex";
})

$('#login').click(() => {
    userAuth.login(document.querySelector('#login_un').value, document.querySelector('#login_pw').value);

    document.querySelector('#login_un').value = '';
    document.querySelector('#login_pw').value = '';
})

$('#register').click(() => {
    let username = document.querySelector("#register_un").value;
    let email = document.querySelector("#register_email").value;
    let password = document.querySelector("#register_pw").value;
    let question = document.querySelector("#register_question").value;

    document.querySelector('#register_un').value = '';
    document.querySelector('#register_email').value = '';
    document.querySelector('#register_pw').value = '';
    document.querySelector('#register_question').value = '';

    if(document.querySelector('#secret-question').value === 'default'){
        card.show('Please select a secret question for account safety!');
    }

    userAuth.register(username, email, password, question);
})

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
        await fetch(`${config.ADDRESS}/file/${config.currentUser}/${i}`)
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
    fetch(`${config.ADDRESS}/files/${config.currentUser}`)
        .then((response) => response.json())
        .then((response) => getFiles(response));
})

$('#logout').click(() => {
    config.setCurrentUser('');
    
    document.querySelector('#options').style.display = 'none';

    goToLoging.click();
})