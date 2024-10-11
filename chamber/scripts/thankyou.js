import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const submitInfo = document.querySelector('#submitInfo');

const currentUrl = window.location.href.split('?');
let formData = currentUrl[1].split('&')
console.log(formData);
let submission = null;

function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            submission = decodeURIComponent(element.split('=')[1]);

            if (data === 'guild-name') {
                submission = submission.replace(/\+/g, ' ');
            }
        }
    })
    return(submission);
}

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

submitInfo.innerHTML = `
    <p><strong>Name:</strong> ${show('first')} ${show('last')}</p>
    <p><strong>Email:</strong> ${show('email')}</p>
    <p><strong>Mobile Phone Number:</strong> ${show('phone')}</p>    
    <p><strong>Guild Name:</strong> ${show('guild-name')}</p>
    <p><strong>Submission Date:</strong> ${new Date(Number(show('timestamp'))).toLocaleString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
`;

displayFooter();