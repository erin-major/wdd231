import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const viewingChance = document.querySelector('#viewing-chance');
const spotlights = document.querySelector('#spotlights')

const ipUrl = "https://api.aruljohn.com/ip/json";
let ipAddress = null;
let locationUrl = null;
let lat = null;
let long = null;
let auroraUrl = null;
let auroraPercent = null;
let galleryUrl = "data/gallery.json"

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

async function getIpAddress(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();           
            ipAddress = data.ip;
            locationUrl = `https://get.geojs.io/v1/ip/geo/${ipAddress}.json`;
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
};

async function getLocation(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();           
            lat = data.latitude;
            long = data.longitude;
            auroraUrl = `https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast=false&threeday=false`;
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
};

async function getAuroraInformation(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            auroraPercent = data.probability.value;
            displayViewingChance();           
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
};

async function getGalleryImages(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            let images = data.gallery;
            displayGallery(images);     
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
};

function displayViewingChance() {

    if (auroraPercent < 30)
    {
        viewingChance.textContent = `Sorry, you have a ${auroraPercent}% chance of seeing aurora borealis right now.`;
    }
    else if (auroraPercent < 60) {
        viewingChance.textContent = `Fingers crossed! You have a ${auroraPercent}% chance of seeing aurora borealis right now.`;
    }
    else {
        auroraPercent.textContent = `Get outside! You have a ${auroraPercent}% chance of seeing aurora borealis right now!`;
    }
};

function displayGallery(images) {
    spotlights.innerHTML = '';

    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [images[i], images[j]] = [images[j], images[i]];
    }
    
    images.length = 4;

    images.forEach((image) => {
        let card = document.createElement('section');
        let picture = document.createElement('img');        

        picture.setAttribute('src', image.url);        
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('alt', image.alt);       
        
        card.appendChild(picture);

        spotlights.appendChild(card);
    });    
};


// function displayGallery(images) {
//     spotlights.innerHTML = '';

//     images.forEach((image) => {
//         let card = document.createElement('section');
//         let picture = document.createElement('img');
//         // let name = document.createElement('span');
//         // let address = document.createElement('span');
//         // let phone = document.createElement('span');
//         // let website = document.createElement('a');

//         picture.setAttribute('src', image.url);
//         // picture.setAttribute('alt', `Icon for ${member.name}`);
//         // picture.setAttribute('loading', 'lazy');       
//         // name.textContent = member.name;
//         // address.textContent = member.address;
//         // phone.textContent = member.number;
//         // website.setAttribute('href', member.website);
//         // website.textContent = member.website;

//         card.appendChild(picture);
//         // card.appendChild(name);
//         // card.appendChild(address);
//         // card.appendChild(phone);
//         // card.appendChild(website);

//         spotlights.appendChild(card);
//     });    
// }

(async () => {
    await getIpAddress(ipUrl);
    await getLocation(locationUrl);
    await getAuroraInformation(auroraUrl);
    await getGalleryImages(galleryUrl);
})();

displayFooter();