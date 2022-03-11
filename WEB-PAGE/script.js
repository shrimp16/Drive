let input = document.getElementById('file');
let body = document.getElementById('body');
let card = document.getElementById('alert');
let cardText = document.getElementById('alert-text');
let uploaded_image;

let images = [];

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

function getFiles(number){
    for (let i = 0; i < number; i++) {
        fetch('http://192.168.1.103:5000/file/' + i)
            .then(response => response.blob())
            .then((imageBlob) => {
                createNewImage(imageBlob);
            })
    }
    showCard('Files loaded', 'lightgreen')
}

function showCard(message, color){
    card.style.backgroundColor = color;
    cardText.innerText = message;
    card.style.display = "block";
}

input.addEventListener('change', () => {
    const data = new FormData();

    if(input.files.length > 10){
        showCard('Too much files', 'red');
        return;
    }

    for (let i = 0; i < input.files.length; i++) {
        data.append('files', input.files[i]);
    }

    fetch('http://192.168.1.103:5000/upload', {
        method: 'POST',
        body: data,
    }).then((result) => {
        console.log("File Sent Successful");
        showCard("File sent successfully", "lightgreen");
    }).catch((err) => {
        console.log(err.message);
        showCard(err.message, "red")
    })
})

$('#upload').click(() => {
    $('#file').trigger('click');
})

$('#files').click(() => {
    cleanBody();
    fetch('http://192.168.1.103:5000/files').then((response) => response.json()).then((response) => getFiles(response));
})