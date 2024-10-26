import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const gallery = document.querySelector('#album');

let galleryUrl = "data/gallery.json"

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

async function getGalleryImages(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            let images = data.gallery;
            displayGallery(images);     
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
};

function displayGallery(images) {
    gallery.innerHTML = '';

    images.forEach((image) => {
        let card = document.createElement('section');
        let picture = document.createElement('img');
        // let name = document.createElement('span');
        // let address = document.createElement('span');
        // let phone = document.createElement('span');
        // let website = document.createElement('a');

        picture.setAttribute('src', image.url);
        // picture.setAttribute('alt', `Icon for ${member.name}`);
        // picture.setAttribute('loading', 'lazy');       
        // name.textContent = member.name;
        // address.textContent = member.address;
        // phone.textContent = member.number;
        // website.setAttribute('href', member.website);
        // website.textContent = member.website;

        card.appendChild(picture);
        // card.appendChild(name);
        // card.appendChild(address);
        // card.appendChild(phone);
        // card.appendChild(website);

        gallery.appendChild(card);
    });    
}

(async () => {
    await getGalleryImages(galleryUrl);
})();

displayFooter();