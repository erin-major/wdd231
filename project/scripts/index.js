const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});