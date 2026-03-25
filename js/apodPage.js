// apodPage.js
import { loadRandomAPOD, loadAPODByDate, loadAPODRange, setupAPODForm } from "./apod.js";
import { API_KEY } from "./config.js";

// --- Setup form for single-date APOD ---
setupAPODForm(API_KEY);

// --- Load Random APODs ---
loadRandomAPOD(API_KEY);

// --- Load APOD by URL date if present ---
loadAPODByDate(API_KEY);

// --- Setup date range button ---
document.getElementById("range-btn").addEventListener("click", (e) => {
    e.preventDefault(); // prevent form reload
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    if (!start || !end) return;

    loadAPODRange(API_KEY, start, end);
});