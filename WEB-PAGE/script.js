let input = document.getElementById('file');
let body = document.getElementById('body');
let uploaded_image;

let images = [];

input.addEventListener('change', () => {
    const data = new FormData();

    for(let i = 0; i < input.files.length; i++){
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
    let test = "";
    for (let i = 0; i < images.length; i++) {
        test += `<img src="${images[i].src}">`
    }
    body.innerHTML = test;
})