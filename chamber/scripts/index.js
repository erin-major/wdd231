import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const joinNow = document.querySelector('#call-to-action');

const url = 'https://erin-major.github.io/wdd231/chamber/data/members.json';
const spotlights = document.querySelector('.spotlights');

let members = null;

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

joinNow.addEventListener('click', () => {
    joinNow.classList.toggle("clicked");
    // Will likely add an event here
});

async function getDirectoryData() {
    const response = await fetch(url);
    const data = await response.json();
    return data.members;
};

const displaySpotlights = (members) => {
    spotlights.innerHTML = '';

    let filteredMembers = members.filter(member => member.membershipLevel > 1);

    filteredMembers.forEach((member) => {
        let card = document.createElement('section');
        let picture = document.createElement('img');
        let name = document.createElement('span');
        // let address = document.createElement('span');
        let phone = document.createElement('span');
        let website = document.createElement('a');

        picture.setAttribute('src', member.image);
        picture.setAttribute('alt', `Icon for ${member.name}`);
        picture.setAttribute('loading', 'lazy');       
        name.textContent = member.name;
        // address.textContent = member.address;
        phone.textContent = `Phone: ${member.number}`;
        website.setAttribute('href', member.website);
        website.textContent = `Website: ${member.website}`;

        card.appendChild(picture);
        card.appendChild(name);
        // card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        spotlights.appendChild(card);
    });    
};


(async () => {
    members = await getDirectoryData();
    displaySpotlights(members);
})();

displayFooter();