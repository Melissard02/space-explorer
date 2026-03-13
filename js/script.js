// script.js
import { loadAPOD } from "./apodHero.js";
import { loadMarsPhotos } from "./mars.js";
import { loadNearEarth } from "./asteroid.js";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function init() {
    loadAPOD(API_KEY);
    loadMarsPhotos(API_KEY);
    loadNearEarth(API_KEY);
}

window.onload = init;