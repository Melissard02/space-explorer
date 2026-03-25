// apod.js

export async function loadAPODByDate(API_KEY) {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get("date"); // get date from URL

    const container = document.getElementById("date-apod");

    if (!date) {
        container.innerHTML = "<p>Please select a date to see the APOD.</p>";
        return;
    }

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );
    const data = await response.json();

    // Skip videos
    if (data.media_type !== "image") {
        container.innerHTML = "<p>This APOD is a video. Try another date!</p>";
        return;
    }

    container.innerHTML = `
        <img class="apod-image" src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
    `;

    // Prefill the form
    const dateInput = document.getElementById("apod-date");
    if (dateInput) dateInput.value = date;
}

// ---- Setup form submission ----
export function setupAPODForm(API_KEY) {
    const form = document.getElementById("single-date-form");
    const dateInput = document.getElementById("apod-date");

    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Update URL without reloading
        const newUrl = `${window.location.pathname}?date=${selectedDate}`;
        window.history.pushState({ path: newUrl }, "", newUrl);

        // Load APOD for selected date
        loadAPODByDate(API_KEY);
    });
}

export async function loadAPODRange(API_KEY, start, end) {

    const container = document.getElementById("apod-range");

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
    );

    const data = await response.json();

    container.innerHTML = "";

    data.forEach(item => {

        if(item.media_type !== "image") return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.url}" alt="APOD from ${item.date}">
            <h4>${item.date}</h4>
        `;

        container.appendChild(card);

    });
}