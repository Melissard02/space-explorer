// script.js
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
async function loadAPOD() {
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

// CURRENTLY BROKEN
// TODO NEXT WEEK
// ==============================
// Load Mars Rover Photos
// ==============================

async function loadMarsPhotos() {

    const container = document.getElementById("mars-container");

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=1792&api_key=${API_KEY}`;

    console.log("Requesting URL:", url);

    try {

        const response = await fetch(url);

        console.log("Response received");
        console.log("Status code:", response.status);
        console.log("Status text:", response.statusText);
        console.log("Response OK?:", response.ok);

        const rawText = await response.text();
        console.log("Raw response:", rawText);

        const data = JSON.parse(rawText);

        console.log("Parsed JSON:", data);
        console.log("Number of photos returned:", data.photos.length);

        container.innerHTML = "";

        if (data.photos.length === 0) {
            console.warn("No photos returned from API");
            loadFakeMarsGallery();
            setupCarousel();
            return;
        }

        data.photos.slice(0,6).forEach(photo => {

            const slide = document.createElement("div");
            slide.classList.add("carousel-slide");

            slide.innerHTML = `
                <img src="${photo.img_src}" alt="Mars Rover Photo">
                <p>${photo.camera.full_name}</p>
            `;

            container.appendChild(slide);

        });

        setupCarousel();

    } catch(error) {

        console.error("Error loading Mars photos:", error);

        loadFakeMarsGallery();
        setupCarousel();

    }
}


// ==============================
// Fake Mars Gallery (Fallback)
// ==============================

const fakeMarsPhotos = [

    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01349/ids/edr/browse/zcam/ZL0_1349_0786710496_928EBY_N0633564ZCAM09416_1100LMJ03_1200.jpg",
        camera: "Mars Perseverance Sol 1349: Left Mastcam-Z Camera"
    },
    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01555/ids/edr/browse/shrlc/SIF_1555_0804985824_601EBY_N0770000SRLC00336_0000LMJ02_1200.jpg",
        camera: "Mars Perseverance Sol 1555: WATSON Camera"
    },
    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01080/ids/edr/browse/fcam/FLF_1080_0762818583_989ECM_N0501618FHAZ00215_04_090J01_1200.jpg",
        camera: "Mars Perseverance Sol 1080: Front Left Hazard Avoidance Camera"
    },
    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01785/ids/edr/browse/shrlc/SIF_1785_0825408112_437EBY_N0860510SRLC00741_0000LMJ02_1200.jpg",
        camera: "Mars Perseverance Sol 1785: WATSON Camera"
    },
    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/00495/ids/edr/browse/fcam/FLF_0495_0710900226_737ECM_N0261004FHAZ02008_10_095J01_1200.jpg",
        camera: "Mars Perseverance Sol 495: Front Left Hazard Avoidance Camera"
    },
    {
        img: "https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01681/ids/edr/browse/zcam/ZR0_1681_0816168612_957EBY_N0802956ZCAM04271_1100LMJ01_1200.jpg",
        camera: "Mars Perseverance Sol 1681: Right Mastcam-Z Camera"
    }

];

function loadFakeMarsGallery() {

    const container = document.getElementById("mars-container");

    container.innerHTML = "";

    fakeMarsPhotos.forEach(photo => {

        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        slide.innerHTML = `
            <img src="${photo.img}" alt="Mars surface">
            <p>${photo.camera}</p>
        `;

        container.appendChild(slide);

    });

}


// ==============================
// Carousel Logic
// ==============================

function setupCarousel() {

    let currentSlide = 0;

    const track = document.getElementById("mars-container");
    const slides = track.querySelectorAll(".carousel-slide");

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    nextBtn.onclick = () => {

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        track.style.transform = `translateX(-${currentSlide * 100}%)`;

    };

    prevBtn.onclick = () => {

        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        track.style.transform = `translateX(-${currentSlide * 100}%)`;

    };

}


async function loadNearEarth() {
    const nearSection = document.getElementById("near-earth");
    const rangeForm = document.createElement("div");
    rangeForm.id = "range-form";

    rangeForm.innerHTML = `
    <h2>Search Near-Earth Objects by Date</h2>
    <p>Please Note that Smaller Ranges Work Best</p>
    <form id="asteroid-form">
        <label for="start-date">Start Date:</label><br>
        <input type="date" id="start-date" name="start-date" required><br><br>

        <label for="end-date">End Date:</label><br>
        <input type="date" id="end-date" name="end-date" required><br><br>
        
        <button type="submit">Submit</button>  
    </form>

    <div id="form-results" class="card-container"></div>
    `;

    nearSection.appendChild(rangeForm);

    const form = document.getElementById("asteroid-form");
    const formResults = document.getElementById("form-results");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        if (!startDate || !endDate) return;

        formResults.innerHTML = "";

        try {
            const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            // Iterate over each date
            Object.keys(data.near_earth_objects).forEach(date => {
                const asteroids = data.near_earth_objects[date];

                asteroids.forEach(asteroid => {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <h3>${asteroid.name}</h3>
                        <p>Close approach date: ${asteroid.close_approach_data[0].close_approach_date}</p>
                        <p>Estimated diameter: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                        <p>Potentially hazardous: ${asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
                    `;

                    formResults.appendChild(card);
                });
            });

        } catch (error) {
            console.error("Error fetching Near-Earth Objects:", error);
            formResults.innerHTML = "<p>Failed to load asteroids for that date range.</p>";
        }
    });
}

function init() {
    loadAPOD();
    loadMarsPhotos();
    loadNearEarth();
}

window.onload = init;