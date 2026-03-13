// apod.js

export async function loadRandomAPOD(API_KEY) {

    const container = document.getElementById("random-apod");

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?count=6&api_key=${API_KEY}`
    );

    const data = await response.json();

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.url}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;

        container.appendChild(card);

    });

}

export async function loadAPODByDate(API_KEY) {

    const date = document.getElementById("apod-date").value;

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );

    const data = await response.json();

    const container = document.getElementById("date-apod");

    container.innerHTML = `
        <img src="${data.url}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
    `;
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
            <img src="${item.url}">
            <p>${item.date}</p>
        `;

        container.appendChild(card);

    });

}