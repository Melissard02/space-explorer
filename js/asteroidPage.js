import { loadNearEarth } from "./asteroid.js";
import { setupDropdownMenu } from "./dropdown.js";
const API_KEY = "o3WCg5Zn4fqQiHNQoG3ThVOh4AYWrKQjO5oLzNTK";

setupDropdownMenu();
loadNearEarth(API_KEY);
console.log("Asteroid Initialized");