// apodPage.js
import { loadRandomAPOD } from "./apod.js";
import { loadAPODByDate } from "./apod.js";
import { loadAPODRange } from "./apod.js";
import { API_KEY } from "./config.js";

document.getElementById("range-btn").addEventListener("click", () => {

    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;

    loadAPODRange(API_KEY, start, end);

});

loadRandomAPOD(API_KEY);
loadAPODByDate(API_KEY);
loadAPODRange(API_KEY, start, end);