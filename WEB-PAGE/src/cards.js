let card = document.getElementById('alert');
let cardText = document.getElementById('alert-text');

export function show(text, color){
    card.style.backgroundColor = color;
    cardText.innerText = text;
    card.style.display = "block";
}