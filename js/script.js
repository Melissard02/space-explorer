// script.js
import { loadAPOD } from "./apodHero.js";
import { loadMarsPhotos } from "./mars.js";
import { loadNearEarth } from "./asteroid.js";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

async function loadFeaturedImage() {

    const container = document.getElementById("featured-container");

    const response = await fetch(
        "https://images-api.nasa.gov/search?q=galaxy&media_type=image"
    );

    const data = await response.json();

    const item = data.collection.items[0];

    container.innerHTML = `
        <div class="card">
            <img src="${item.links[0].href}">
            <p>${item.data[0].title}</p>
        </div>
    `;
}



function init() {
    loadAPOD(API_KEY);
    loadMarsPhotos(API_KEY);
    loadNearEarth(API_KEY);
    loadFeaturedImage();
}

window.onload = init;