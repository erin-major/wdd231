import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');

let ipUrl = "https://api.aruljohn.com/ip/json";
let ipAddress = null;
let locationUrl = null;
let location = null;

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

async function getIpAddress() {
    const response = await fetch(ipUrl);
    const ipAddress = await response.json();
    return ipAddress.ip;
};

async function getLocation() {
    const response = await fetch(locationUrl);
    const location = await response.json();
    return location;
};

(async () => {
    ipAddress = await getIpAddress();    
    locationUrl = `https://ipapi.co/${ipAddress}/json/`;
    
    (async () => {
        location = await getLocation();
        console.log(location);
    })();
})();




displayFooter();