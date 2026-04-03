// apod.js

function isValidDate(dateString) {
    // Check format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const today = new Date();
    const minDate = new Date("1995-06-16");

    return date <= today && date >= minDate;
}

export async function loadAPODByDate(API_KEY, passedDate = null) {
    const rangeContainer = document.getElementById("apod-range");
    if (rangeContainer) rangeContainer.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const date = passedDate || urlParams.get("date");

    const container = document.getElementById("date-apod");

    // If no date → hide
    if (!date) {
        container.style.display = "none";
        container.innerHTML = "";
        return;
    }

    // Show container
    container.style.display = "block";

    // VALIDATION CHECK
    if (!isValidDate(date)) {
        container.innerHTML = `
            <p style="color:red;">
                Invalid date. Please enter a valid date between 1995-06-16 and today.
            </p>
        `;
        return;
    }

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
        );

        // Handle bad API response
        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        // Skip videos
        if (data.media_type !== "image") {
            container.innerHTML = `
                <p>This APOD is a video. Try another date!</p>
            `;
            return;
        }

        container.innerHTML = `
            <img class="apod-image" src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;

        // Prefill input
        const dateInput = document.getElementById("apod-date");
        if (dateInput) dateInput.value = date;

    } catch (error) {
        container.innerHTML = `
            <p style="color:red;">
                Something went wrong. Please try again.
            </p>
        `;
        console.error(error);
    }
}

// ---- Setup form submission ----
export function setupAPODForm(API_KEY) {
    const singleContainer = document.getElementById("date-apod");
    if (singleContainer) singleContainer.innerHTML = "";
    
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
    container.innerHTML = ""; // always clear first

    // Validation
    if (!start || !end) {
        container.innerHTML = `<p style="color:red;">Please provide both start and end dates!</p>`;
        return;
    }

    if (!isValidDate(start) || !isValidDate(end)) {
        container.innerHTML = `<p style="color:red;">Invalid dates. Enter dates between 1995-06-16 and today in YYYY-MM-DD format.</p>`;
        return;
    }

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (endDateObj < startDateObj) {
        container.innerHTML = `<p style="color:red;">End date must be after start date!</p>`;
        return;
    }

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
        );

        if (!response.ok) throw new Error("API error");

        const data = await response.json();

        if (!data || data.length === 0) {
            container.innerHTML = `<p>No APOD images found for these dates.</p>`;
            return;
        }

        data.forEach(item => {
            if (item.media_type !== "image") return;

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${item.url}" alt="APOD from ${item.date}">
                <h4>${item.date}</h4>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Something went wrong. Please try again.</p>`;
        console.error(error);
    }
}