// script.js
import { loadAPOD } from "./apodHero.js";
import { setupDropdownMenu } from "./dropdown.js";
// import { API_KEY} from "./config.js";

const API_KEY = "o3WCg5Zn4fqQiHNQoG3ThVOh4AYWrKQjO5oLzNTK";

async function loadRandomAPOD(API_KEY, count = 8) {
    const container = document.getElementById("random-apod");
    const modal = document.getElementById("apod-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const closeBtn = modal.querySelector(".close");

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${o3WCg5Zn4fqQiHNQoG3ThVOh4AYWrKQjO5oLzNTK}`
    );

    const data = await response.json();
    container.innerHTML = "";

    data.forEach(item => {
        if(item.media_type !== "image") return; // skip videos

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.url}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;

        // CLICK TO OPEN MODAL
        card.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = item.hdurl || item.url; // use HD if available
            modalCaption.textContent = item.title;
        });

        container.appendChild(card);
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if click outside image
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

async function visitAPOD() {
    const btn = document.getElementById("view-apod");
    const modal = document.getElementById("external-modal");
    const yesbtn = document.getElementById("confirm-yes");
    const nobtn = document.getElementById("confirm-no");

    const APOD_URL = "https://apod.nasa.gov/apod/";

    btn.addEventListener("click", () => {
        const hasAccepted = localStorage.getItem("externalAccepted");

        if (hasAccepted === "true") {
            window.open(APOD_URL,  "_blank");
            return
        }
        modal.classList.add("active");
    });


    yesbtn.addEventListener("click", () => {
        localStorage.setItem("externalAccepted", "true");
        modal.classList.remove("active");
        window.open(APOD_URL, "_blank");
    });

    nobtn.addEventListener("click", () => {
        modal.classList.remove("active");
    })
}

async function animateDoodle() {
    const doodle = document.getElementById("doodle");

    doodle.addEventListener("click", () => {
    // Remove class if already there to re-trigger
    doodle.classList.remove("animate-doodle");
    
    // Trigger reflow to restart animation
    void doodle.offsetWidth;
    
    doodle.classList.add("animate-doodle");
});
}



function init() {
    loadAPOD(API_KEY);
    loadRandomAPOD(API_KEY);
    setupDropdownMenu();
    animateDoodle();
    visitAPOD();
}

window.onload = init;