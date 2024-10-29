import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const submitInfo = document.querySelector('#submitInfo');

const currentUrl = window.location.href.split('?');
let formData = currentUrl[1].split('&')
let submission = null;

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            submission = decodeURIComponent(element.split('=')[1]);
        }
    })
    return(submission);
}

submitInfo.innerHTML = `
    <p><strong>Name:</strong> ${show('first')} ${show('last')}</p>
    <p><strong>Email:</strong> ${show('email')}</p>
    <p><strong>Mobile Phone Number:</strong> ${show('phone')}</p>
    <p><strong>Submission Date:</strong> ${new Date(Number(show('timestamp'))).toLocaleString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
`;



displayFooter();