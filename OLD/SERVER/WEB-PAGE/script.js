import * as uploadManager from './src/upload.js';
import * as card from './src/cards.js';
import * as config from './src/config.js';
import * as userAuth from './src/auth.js';
import { setIcon } from './icons/icons.js';
import * as storage from './src/storage.js';

let input = document.getElementById('file');
let body = document.getElementById('body');
let progress = document.getElementById('progress');
let optionsCard = document.getElementById('options-card');
let drag = document.getElementById("drag");

let loginBody = document.getElementById('login-body');
let registerBody = document.getElementById('register-body');
let forgotPasswordBody = document.getElementById('forgot-password-body');
let goToLoging = document.getElementById('go-to-login');
let goToRegister = document.getElementById('go-to-register');
let forgotPassword = document.getElementById('forgot-password');

let images = [];

goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerBody.style.display = 'flex';
    loginBody.style.display = 'none';
    forgotPasswordBody.style.display = 'none';
})

goToLoging.addEventListener('click', (e) => {
    e.preventDefault();
    registerBody.style.display = "none";
    loginBody.style.display = "flex";
    forgotPasswordBody.style.display = 'none';
})

forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    registerBody.style.display = 'none';
    loginBody.style.display = 'none';
    forgotPasswordBody.style.display = 'flex';
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

    if (document.querySelector('#secret-question').value === 'default') {
        card.show('Please select a secret question for account safety!');
    }

    userAuth.register(username, email, password, question);
})

$('#recover').click(() => {
    let email = document.querySelector("#forgot-email").value;
    let question = document.querySelector("#forgot-question").value;
    fetch(`${config.ADDRESS}/forgot`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            question: question
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.text()).then((response) => {
        card.show(response);
        setTimeout(() => {
            goToLoging.click();
        })
    })
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

    if (arr[0] === 'image') {
        img.src = URL.createObjectURL(image);
    } else {
        img.src = setIcon(str);
    }

    body.appendChild(img);
    images.push(URL.createObjectURL(image));
}

function createFakeImage() {
    let img = new Image();
    img.src = './icons/rar.png';
    body.appendChild(img);
    images.push('xdxdxd');
}

async function isRar(file) {
    let answer = await file.text()
        .then((response) => {
            if(response === 'rar file'){
                return true;
            }else {
                return false;
            }
        })

    return answer;
}

async function getFiles(number) {
    for (let i = 0; i < number; i++) {
        await fetch(`${config.ADDRESS}/file/${config.currentUser}/${i}`)
            .then(response => response.blob())
            .then(async (imageBlob) => {
                if (await isRar(imageBlob)) {
                    createFakeImage();
                } else {
                    console.log('no rar');
                    createNewImage(imageBlob);
                }
            })
    }
    card.setupOptionsCard();
    card.setFilesURL(images);
    storage.updateStorageInfo(config.currentUser);
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
    cleanBody();
    document.querySelector('#options').style.display = 'none';
    card.show('See you next time!');
    goToLoging.click();
})