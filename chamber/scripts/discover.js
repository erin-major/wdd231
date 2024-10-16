import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const visitMessage = document.querySelector('#visit-message');

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

function updateVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    let today = Date.now();   
     
    if (lastVisit == null) {        
        visitMessage.innerHTML = `Welcome! Let us know if you have any questions.`;
    }

    else {
        let timeSinceLastVisit = today - parseInt(lastVisit);

        if (timeSinceLastVisit < millisecondsInADay) {
            
            visitMessage.innerHTML = `Back so soon! Awesome!`;
        }

        else {
            let diffDays = Math.round(timeSinceLastVisit / millisecondsInADay);
            
            if (diffDays === 1) {
                visitMessage.innerHTML = `You last visited ${diffDays} day ago.`;
            }

            else {
                visitMessage.innerHTML = `You last visited ${diffDays} days ago.`;
            }
        }
    }

    localStorage.setItem('lastVisit', today);
};

updateVisit();

displayFooter();