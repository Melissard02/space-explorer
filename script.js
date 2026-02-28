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

function loadMarsPhotos() {

}

function searchNASA() {

}

window.onload = loadAPOD;