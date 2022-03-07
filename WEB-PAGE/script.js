let input = document.getElementById('file');
let body = document.getElementById('body');
let uploaded_image;

let images = [];

input.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        images.push(img);
    }
    reader.readAsDataURL(input.files[0]);
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