const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'rF2rspGE3q1T37jqTEGUzgs4JU2F7NWy-xW1QaFSkqU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imageLoaded++;
    console.log('image loaded');
    if (imageLoaded.length === totalImages.length){
        ready = true;
        loader.hidden = true;
        console.log('is ready = ', ready);
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Helper function to set attributes on Dom elements
function setAttributes(elements, attributes){
    for (const key in attributes){
        elements.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM
function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images ', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();

    } catch {
    // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
}) 

// On Load
getPhotos();