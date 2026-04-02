// mars.js
// ==============================
// Mars Modal
// ==============================
export function setupModal() {
    const modal = document.getElementById("mars-modal");
    const closeBtn = document.getElementById("close-modal");

    const marsModalSeen = localStorage.getItem("marsModalSeen") === "true";

    if (!marsModalSeen) {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
    }

    closeBtn.onclick = () => {
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        localStorage.setItem("marsModalSeen", "true");
    };

    // Optional: click outside to close
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.opacity = "0";
            modal.style.visibility = "hidden";
            localStorage.setItem("marsModalSeen", "true");
        }
    };
}

// ==============================
// Load Mars Rover Photos
// ==============================
export async function loadMarsPhotos(API_KEY) {

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
        img: "images/mars5.jpg",
        camera: "Mars Perseverance Sol 1349: Left Mastcam-Z Camera"
    },
    {
        img: "images/mars3.jpg",
        camera: "Mars Perseverance Sol 1555: WATSON Camera"
    },
    {
        img: "images/mars2.jpg",
        camera: "Mars Perseverance Sol 1080: Front Left Hazard Avoidance Camera"
    },
    {
        img: "images/mars4.jpg",
        camera: "Mars Perseverance Sol 1785: WATSON Camera"
    },
    {
        img: "images/mars1.jpg",
        camera: "Mars Perseverance Sol 495: Front Left Hazard Avoidance Camera"
    },
    {
        img: "images/mars6.jpg",
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