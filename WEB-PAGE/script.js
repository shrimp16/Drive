let input = document.getElementById('file');
let body = document.getElementById('body');
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
}

input.addEventListener('change', () => {
    const data = new FormData();

    for (let i = 0; i < input.files.length; i++) {
        data.append('files', input.files[i]);
    }

    fetch('http://192.168.1.103:5000/upload', {
        method: 'POST',
        body: data,
    }).then((result) => {
        console.log("File Sent Successful");
    }).catch((err) => {
        console.log(err.message);
    })
})

$('#upload').click(() => {
    $('#file').trigger('click');
})

$('#files').click(() => {
    let filesNumber;
    cleanBody();
    fetch('http://192.168.1.103:5000/files').then((response) => response.json()).then((response) => getFiles(response));
})