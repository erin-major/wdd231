import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');

const url = '/data/membership.json';

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

async function getMembershipLevels() {
    const response = await fetch(url);
    const data = await response.json();
    return data.levels;
};




(async () => {
    levels = await getMembershipLevels();
    console.log(levels);
    // displayCardDirectory(members);
})();

displayFooter();