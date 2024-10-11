import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const membershipForm = document.querySelector('#membershipForm');
const membershipSection = document.querySelector('#membership-level-info');
const membershipDialog = document.querySelector('#membershipDialog');
const membershipTitle = document.querySelector('#membershipDialog h4');
const closeButton = document.querySelector('#membershipDialog button');
const membershipCost = document.querySelector(`#membershipDialog #cost`);
const membershipBenefits = document.querySelector(`#membershipDialog #benefits`);
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
    membershipTitle.innerHTML = `${level.level} Membership`;
    membershipCost.innerHTML = `Cost <br> ${level.cost.toLocaleString()} gil annually`;
    membershipBenefits.innerHTML = `Benefits <br> ${level.benefits.map(benefit => `&#10023; ${benefit}`).join('<br>')}`;
    membershipDialog.showModal();
};

(async () => {
    levels = await getMembershipLevels();    
    displayMembershipCards(levels);
})();

displayFooter();