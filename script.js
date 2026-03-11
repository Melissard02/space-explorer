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

// CURRENTLY BROKEN
// TODO NEXT WEEK
async function loadMarsPhotos() {

    const container = document.getElementById("mars-container");

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=1792&api_key=${API_KEY}`;

    console.log("Requesting URL:", url);

    try {

        const response = await fetch(url);

        console.log("Response received");
        console.log("Status code:", response.status);
        console.log("Status text:", response.statusText);
        console.log("Response OK?:", response.ok);

        // See raw response text first
        const rawText = await response.text();
        console.log("Raw response:", rawText);

        // Convert text back into JSON
        const data = JSON.parse(rawText);

        console.log("Parsed JSON:", data);
        console.log("Number of photos returned:", data.photos.length);

        container.innerHTML = "";

        if (data.photos.length === 0) {
            console.warn("No photos returned from API");
            container.innerHTML = "<p>No photos found.</p>";
            return;
        }

        data.photos.slice(0,6).forEach(photo => {

            console.log("Rendering photo:", photo.id);

            const card = document.createElement("div");

            card.innerHTML = `
                <img src="${photo.img_src}" width="300">
                <p>${photo.camera.full_name}</p>
            `;

            container.appendChild(card);

        });

    } catch(error) {

        console.error("Error loading Mars photos:", error);
        container.innerHTML = `<p>Error loading Mars photos. Enjoy this image instead.</p>
        <img src="https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01349/ids/edr/browse/zcam/ZL0_1349_0786710496_928EBY_N0633564ZCAM09416_1100LMJ03_1200.jpg" width=700 alt="Mars, Rover Perseverance, Sol 1349">`;

    }

}

function searchNASA() {

}

async function loadNearEarth() {
    
}

function init() {
    loadAPOD();
    loadMarsPhotos();
}

window.onload = init;