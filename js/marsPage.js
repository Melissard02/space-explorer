import { loadMarsPhotos, setupModal } from "./mars.js";
import { setupDropdownMenu } from "./dropdown.js";
import { API_KEY } from "./config.js";

setupModal();
setupDropdownMenu();
loadMarsPhotos(API_KEY);
