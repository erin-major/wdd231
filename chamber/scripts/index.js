import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const joinNow = document.querySelector('#call-to-action');

// const url = 'https://erin-major.github.io/wdd231/chamber/data/members.json';
// const cards = document.querySelector('#cards');
// const cardView = document.querySelector('#cardView');
// const tableView = document.querySelector('#tableView');
// let members = null;

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

joinNow.addEventListener('click', () => {
    joinNow.classList.toggle("clicked");
    // Will likely add an event here
});

// cardView.addEventListener('click', () => {
//     cardView.classList.toggle('active');
//     tableView.classList.toggle('active');    
//     displayCardDirectory(members);
// });

// tableView.addEventListener('click', () => {
//     tableView.classList.toggle('active');
//     cardView.classList.toggle('active');   
//     displayTableDirectory(members);
// });

// async function getDirectoryData() {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.members;
// };

// const displayCardDirectory = (members) => {
//     cards.innerHTML = '';

//     members.forEach((member) => {
//         let card = document.createElement('section');
//         let picture = document.createElement('img');
//         let name = document.createElement('span');
//         let address = document.createElement('span');
//         let phone = document.createElement('span');
//         let website = document.createElement('a');

//         picture.setAttribute('src', member.image);
//         picture.setAttribute('alt', `Icon for ${member.name}`);
//         picture.setAttribute('loading', 'lazy');       
//         name.textContent = member.name;
//         address.textContent = member.address;
//         phone.textContent = member.number;
//         website.setAttribute('href', member.website);
//         website.textContent = member.website;

//         card.appendChild(picture);
//         card.appendChild(name);
//         card.appendChild(address);
//         card.appendChild(phone);
//         card.appendChild(website);

//         cards.appendChild(card);
//     });    
// };

// const displayTableDirectory = (members) => {
//     cards.innerHTML = '';

//     let table = document.createElement('table');
//     let thead = document.createElement('thead');
//     let tbody = document.createElement('tbody');

//     let headerRow = document.createElement('tr');
//     let headers = ['Name', 'Address', 'Phone Number', 'Website'];

//     headers.forEach(headerText => {
//         let th = document.createElement('th');
//         th.textContent = headerText;
//         headerRow.appendChild(th);
//     });

//     thead.appendChild(headerRow);

//     members.forEach((member) => {
//         let row = document.createElement('tr');        
        
//         let name = document.createElement('td');
//         let address = document.createElement('td');
//         let phone = document.createElement('td');
//         let websiteCell = document.createElement('td');
//         let websiteLink = document.createElement('a');
      
//         name.textContent = member.name;
//         address.textContent = member.address;
//         phone.textContent = member.number;

//         websiteLink.setAttribute('href', member.website);
//         websiteLink.textContent = member.website;
//         websiteCell.appendChild(websiteLink);

//         row.appendChild(name);
//         row.appendChild(address);
//         row.appendChild(phone);
//         row.appendChild(websiteCell);

//         tbody.appendChild(row);
//     });
    
//     table.appendChild(thead);
//     table.appendChild(tbody);

//     cards.appendChild(table);
// };

// (async () => {
//     members = await getDirectoryData();
//     displayCardDirectory(members);
// })();

displayFooter();