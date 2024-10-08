import { temples } from "../data/temples.js";
console.log(temples);

import { url } from "../data/temples.js";
console.log(url);

const showHere = document.querySelector('#showHere');
const templeDialog = document.querySelector('#mydialog');
const templeTitle = document.querySelector('#mydialog h2');
const closeButton = document.querySelector('#mydialog button');
const templeDesc = document.querySelector(`#mydialog p`);

closeButton.addEventListener('click', () => templeDialog.close());

function displayTemples(data) {
    // console.log(data);
    data.forEach(x => {
        // console.log(x);
        const photo = document.createElement('img');
        photo.src = `${url}${x.path}`;
        photo.alt = `${x.name} temple`;

        photo.addEventListener('click', () => showStuff(x));

        showHere.appendChild(photo);
    })
};

displayTemples(temples);

function showStuff(x) {
    templeTitle.innerHTML = x.name;
    templeDesc.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}.`
    templeDialog.showModal();
}


