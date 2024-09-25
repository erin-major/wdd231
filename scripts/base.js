const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');

const today = new Date();

let todayFormatted = today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

currentYear.innerHTML = `©️ ${today.getFullYear()} | Erin Major | Utah, USA`;
lastModified.innerHTML = `Last Modified: ${todayFormatted}`;