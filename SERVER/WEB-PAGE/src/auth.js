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
        if(isNaN(id)){
            unsucess(response);
        }else{
            success(username);
        }
    })
}

function success(un){
    card.show(`Welcome ${un}!`);
    document.querySelector('#login-body').style.display = 'none';
    document.querySelector('#register-body').style.display = 'none';
    document.querySelector('#options').style.display = 'block';
}

function unsucess(text){
    card.show(text);
}
