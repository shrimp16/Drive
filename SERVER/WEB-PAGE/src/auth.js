import * as card from './cards.js'
import * as config from './config.js';

export function login(username, pw) {
    fetch(`${config.ADDRESS}/login`, {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': pw
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.text()).then((response) => {
        let id = parseInt(response);
        if (isNaN(id)) {
            unsucess(response);
        } else {
            success(username, id);
        }
    })
}

export function register(...data) {
    console.log(data);

    let newUser = {
        username: data[0],
        email: data[1],
        password: data[2],
        question: data[3]
    }

    fetch(`${config.ADDRESS}/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.text()).then((response) => {
        console.log(response);
        if (response === 'Account created with success!') {
            login(newUser.username, newUser.password);
        } else {
            unsucess(response);
        }
    })
}

function success(un, id) {
    card.show(`Welcome ${un}!`);
    document.querySelector('#login-body').style.display = 'none';
    document.querySelector('#register-body').style.display = 'none';
    document.querySelector('#options').style.display = 'block';
    config.setCurrentUser(id);
    updateStorageInfo(id);
}

function unsucess(text) {
    card.show(text);
}

function updateStorageInfo(id) {
    let storageBar = document.getElementById('storage-bar');
    let storageInfo = document.getElementById('storage-info');

    fetch(`${config.ADDRESS}/space/${id}`)
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        storageBar.style.width = `${Math.floor((response.usedStorage / response.storage) * 100)}%`;
        storageInfo.innerText = `${(response.usedStorage).toFixed(2)} GB / ${(response.storage).toFixed(2)} GB`;
    })
}