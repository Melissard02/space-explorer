// mars.js
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