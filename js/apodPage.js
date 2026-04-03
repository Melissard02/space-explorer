// apodPage.js
import { loadAPODByDate, loadAPODRange, setupAPODForm } from "./apod.js";
import { setupDropdownMenu } from "./dropdown.js";
const API_KEY = "o3WCg5Zn4fqQiHNQoG3ThVOh4AYWrKQjO5oLzNTK";


// --- Setup date range button ---
document.getElementById("range-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;

    if (!start || !end) return;

    // Update URL
    const newUrl = `${window.location.pathname}?start=${start}&end=${end}`;
    window.history.pushState({}, "", newUrl);

    // Load data
    loadAPODRange(API_KEY, start, end);
});

// --- Set up the Drop Down Menu ---
setupDropdownMenu();

// --- Setup form for single-date APOD ---
setupAPODForm(API_KEY);

// --- Load APOD by URL date if present ---
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const date = params.get("date");
    const start = params.get("start");
    const end = params.get("end");

    if (date) {
        loadAPODByDate(API_KEY);
    } 
    else if (start && end) {
        loadAPODRange(API_KEY, start, end);
    }
}

loadFromURL();

window.addEventListener("popstate", loadFromURL);