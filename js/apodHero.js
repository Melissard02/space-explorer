// hero.js
// ==============================
// Hero APOD
// ==============================
export async function loadAPOD(API_KEY) {
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
        const heroMedia = document.getElementById("hero-media");

    heroMedia.innerHTML = `
        <img src="images/backuphero.jpg" alt="Fallback space image">
    `;

    document.getElementById("apod-title").textContent = "Space Explorer";
    document.getElementById("apod-description").textContent =
        "Unable to load NASA Astronomy Picture of the Day.";
    }
}