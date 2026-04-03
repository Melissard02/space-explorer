// marsPage.js
import { loadMarsPhotos, setupModal } from "./mars.js";
import { setupDropdownMenu } from "./dropdown.js";

const API_KEY = "o3WCg5Zn4fqQiHNQoG3ThVOh4AYWrKQjO5oLzNTK";

document.addEventListener("DOMContentLoaded", () => {
    setupModal();
    setupDropdownMenu();
    loadMarsPhotos(API_KEY);
})

