// script.js
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
async function loadAPOD() {
    try {

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        );

        const data = await response.json();
        console.log(data.url);
        console.log(data.media_type);

        const heroMedia = document.getElementById("hero-media");
        heroMedia.innerHTML = "";

        if (data.media_type === "image") {

            heroMedia.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
            `;

        } else if (data.media_type === "video") {

            heroMedia.innerHTML = `
                <video autoplay muted loop playsinline>
                    <source src="${data.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;

        }

        document.getElementById("apod-title").textContent = data.title;
        document.getElementById("apod-description").textContent =
            data.explanation.slice(0, 250) + "...";

    } catch (error) {
        console.error("Error loading APOD", error);
    }
}

async function loadMarsPhotos() {

    const container = document.getElementById("mars-container");

    const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=100&api_key=${API_KEY}`
    );

    const data = await response.json();

    container.innerHTML = "";

    data.photos.slice(0, 6).forEach(photo => {

        const card = document.createElement("div");

        card.innerHTML = `
            <img src="${photo.img_src}" style="width:300px">
            <p>${photo.camera.full_name}</p>
        `;

        container.appendChild(card);

    });

}

function searchNASA() {

}

function init() {
    loadAPOD();
    loadMarsPhotos();
}

window.onload = init;