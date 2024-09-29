const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const url = 'https://erin-major.github.io/wdd231/chamber/data/members.json';
const cards = document.querySelector('#cards');
let members = null;

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

async function getDirectoryData() {
    const response = await fetch(url);
    const data = await response.json();
    return data.members;
};

const displayDirectory = (members) => {
    cards.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        let picture = document.createElement('img');
        let name = document.createElement('span');
        let address = document.createElement('span');
        let phone = document.createElement('span');
        let website = document.createElement('a');

        picture.setAttribute('src', member.image);
        picture.setAttribute('alt', `Icon for ${member.name}`);
        picture.setAttribute('loading', 'lazy');       
        name.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phone.textContent = `${member.number}`;
        website.setAttribute('href', member.website);
        website.textContent = `${member.website}`;

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });    
};

(async () => {
    members = await getDirectoryData();
    displayDirectory(members);
})();
