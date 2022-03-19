let infoCard = document.getElementById('alert');
let infoCardText = document.getElementById('alert-text');

let optionsCard = document.getElementById('options-card');

let deleteButton = document.getElementById('delete');
let openButton = document.getElementById('open');
let closeButton = document.getElementById('close');


export function show(text){
    infoCardText.innerText = text;
    infoCard.style.display = "block";
}

export function setupOptionsCard() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {

        images[i].addEventListener('click', () => {

            optionsCard.style.display = "block";

            deleteButton.myParam = images[i];
            openButton.myParam = images[i];
            
            deleteButton.addEventListener('click', remove);
            openButton.addEventListener('click', open);
            closeButton.addEventListener('click', close);
        })
    }
}

function remove(x) {
    close();
    alert("removing   " + x.currentTarget.myParam);
}

function open(x) {
    close();
    window.open(x.currentTarget.myParam.src);
}

function close() {
    optionsCard.style.display = 'none';
}