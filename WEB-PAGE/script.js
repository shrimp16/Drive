let input = document.getElementById('file');
let uploaded_image;

let images = [];

input.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        images.push(img.src);
    }
    reader.readAsDataURL(input.files[0]);
})

$('#upload').click(() => {
    $('#file').trigger('click');
})

$('#files').click(() => {
    console.log(images);
})