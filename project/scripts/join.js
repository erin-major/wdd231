import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const timeStamp = document.querySelector('#timestamp');
const joinForm = document.querySelector('#join-form');

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

joinForm.addEventListener('submit', () => {
    timeStamp.value = Date.now();
})

displayFooter();