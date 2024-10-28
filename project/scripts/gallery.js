import displayFooter from "./footer.mjs";

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#animation');
const gallery = document.querySelector('#album');
const photographerDialog = document.querySelector('#photographer-info');
const imageTitle = document.querySelector('#photographer-info h3');
const photographer = document.querySelector('#photographer');
const closeButton = document.querySelector('#photographer-info button');

let galleryUrl = "data/gallery.json"

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});

closeButton.addEventListener('click', () => {
    photographerDialog.close()    
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

        picture.setAttribute('src', image.url);
        picture.setAttribute('alt', image.alt);
        picture.setAttribute('loading', 'lazy');

        card.appendChild(picture);
        gallery.appendChild(card);
        picture.addEventListener('click', () => showAuthor(image)); 
    });    
}

function showAuthor(image) {
    imageTitle.innerHTML = image.title;   
    photographer.innerHTML = `<strong>Photo By:</strong> ${image.photographer}`
    photographerDialog.showModal();
};

(async () => {
    await getGalleryImages(galleryUrl);
})();

displayFooter();