import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const viewingChance = document.querySelector('#viewing-chance');

const ipUrl = "https://api.aruljohn.com/ip/json";
let ipAddress = null;
let locationUrl = null;
let lat = null;
let long = null;
let auroraUrl = null;
let auroraPercent = null;

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

(async () => {
    await getIpAddress(ipUrl);
    await getLocation(locationUrl);
    await getAuroraInformation(auroraUrl);
})();

displayFooter();