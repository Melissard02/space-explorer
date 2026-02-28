const API_KEY = import.meta.env.VITE_NASA_API_KEY;

async function loadAPOD() {
    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        )
        const data = await response.json();
        if (data.media_type === "image") {
            document.getElementById("hero").style.backgroundImage = `url(${data.url})`;
            document.getElementById("apod-title").textContent = data.title;
            document.getElementById("apod-description").textContent = data.explanation;
        }
    } catch (error) {
        console.error("Error loading APOD", error);
    };
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