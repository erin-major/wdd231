const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');

const today = new Date();

let todayFormatted = today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

currentYear.innerHTML = `©️ ${today.getFullYear()} Ul'dah Chamber of Commerce`;
lastModified.innerHTML = `Last Modified: ${todayFormatted}`;

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});
