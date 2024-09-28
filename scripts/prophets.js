const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const all = document.querySelector('#all');
const utahBorn = document.querySelector('#utahBorn');
const outsideUsBorn = document.querySelector('#outsideUsBorn');
const livedLong = document.querySelector('#livedLong');
const children = document.querySelector('#children');
const servedLength = document.querySelector('#servedLength');
let prophets = null;

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data);
    return data.prophets;
};

const displayProphets = (prophets) => {
    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dob = document.createElement('p');
        let birthplace = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${getOrdinal(parseInt(prophet.order))} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });    
};

function getOrdinal(n) {
    let ord = 'th';
  
    if (n % 10 == 1 && n % 100 != 11)
    {
      ord = 'st';
    }
    else if (n % 10 == 2 && n % 100 != 12)
    {
      ord = 'nd';
    }
    else if (n % 10 == 3 && n % 100 != 13)
    {
      ord = 'rd';
    }
  
    return ord;
};

function getAgeAtDeathInYears(birthdate, deathdate) {
	let birth = new Date(birthdate);
	let death = new Date(deathdate);
	if (deathdate === null) {
		death = new Date();
	}
	return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

(async () => {
    prophets = await getProphetData();
    displayProphets(prophets);
})();

all.addEventListener('click', () => {
    displayProphets(prophets);
    all.classList.add('active');
    utahBorn.classList.remove('active');
    outsideUsBorn.classList.remove('active');
    livedLong.classList.remove('active');
    children.classList.remove('active');
    servedLength.classList.remove('active');
});

utahBorn.addEventListener('click', () => {
    displayProphets(prophets.filter(prophet => prophet.birthplace == 'Utah'));
    utahBorn.classList.add('active');
    all.classList.remove('active');    
    outsideUsBorn.classList.remove('active');
    livedLong.classList.remove('active');
    children.classList.remove('active');
    servedLength.classList.remove('active');
});

outsideUsBorn.addEventListener('click', () => {
    displayProphets(prophets.filter(prophet => prophet.birthplace == 'England'));
    outsideUsBorn.classList.add('active');
    all.classList.remove('active');
    utahBorn.classList.remove('active');    
    livedLong.classList.remove('active');
    children.classList.remove('active');
    servedLength.classList.remove('active');
});

livedLong.addEventListener('click', () => {
    displayProphets(prophets.filter(prophet => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95));
    livedLong.classList.add('active');
    all.classList.remove('active');
    utahBorn.classList.remove('active');
    outsideUsBorn.classList.remove('active');
    children.classList.remove('active');
    servedLength.classList.remove('active');
});

children.addEventListener('click', () => {
    displayProphets(prophets.filter(prophet => parseInt(prophet.numofchildren) >= 10));
    children.classList.add('active');
    all.classList.remove('active');
    utahBorn.classList.remove('active');
    outsideUsBorn.classList.remove('active');
    livedLong.classList.remove('active');    
    servedLength.classList.remove('active');
});

servedLength.addEventListener('click', () => {
    displayProphets(prophets.filter(prophet => parseInt(prophet.length) >= 15));
    servedLength.classList.add('active');
    all.classList.remove('active');
    utahBorn.classList.remove('active');
    outsideUsBorn.classList.remove('active');
    livedLong.classList.remove('active');
    children.classList.remove('active');    
});