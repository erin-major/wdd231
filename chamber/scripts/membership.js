import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const membershipForm = document.querySelector('#membership-form');
const membershipSection = document.querySelector('#membership-level-info');
const membershipDialog = document.querySelector('#membership-dialog');
const membershipTitle = document.querySelector('#membership-dialog h4');
const closeButton = document.querySelector('#membership-dialog button');
const membershipCost = document.querySelector(`#membership-dialog #cost`);
const membershipBenefits = document.querySelector(`#membership-dialog #benefits`);
const timeStamp = document.querySelector('#timestamp');
let levels = null;

const url = 'data/membership.json';

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

closeButton.addEventListener('click', () => {
    membershipDialog.close()    
});

membershipForm.addEventListener('submit', () => {
    timeStamp.value = Date.now();
})

async function getMembershipLevels() {
    const response = await fetch(url);
    const data = await response.json();
    return data.levels;
};

function displayMembershipCards(levels) {
    membershipSection.innerHTML = `
        <h2>Membership Levels</h2>
    `;

    levels.forEach((level) => {
        let card = document.createElement('section');
        let levelTitle = document.createElement('h3');
        let learnMore = document.createElement('span');

        levelTitle.innerHTML = `${level.level} Membership Level`;
        learnMore.textContent = 'Learn More!';

        card.appendChild(levelTitle);
        card.appendChild(learnMore);

        membershipSection.appendChild(card);
        
        learnMore.querySelector('#learn-more');
        learnMore.addEventListener('click', () => showCards(level)); 
    });
};

function showCards(level) {
    membershipTitle.innerHTML = `${level.level}`;
    membershipCost.innerHTML = `<strong>Cost</strong><br>${level.cost.toLocaleString()} gil annually`;
    membershipBenefits.innerHTML = `<strong>Benefits</strong><br>${level.benefits.map(benefit => `&#10023; ${benefit}`).join('<br>')}`;
    membershipDialog.showModal();
};

(async () => {
    levels = await getMembershipLevels();    
    displayMembershipCards(levels);
})();

displayFooter();