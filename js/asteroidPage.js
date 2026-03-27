import { loadNearEarth } from "./asteroid.js";
import { setupDropdownMenu } from "./dropdown.js";
import { API_KEY } from "./config.js";

setupDropdownMenu();
loadNearEarth(API_KEY);