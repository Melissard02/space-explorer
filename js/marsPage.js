import { loadMarsPhotos, setupModal } from "./mars.js";
import { API_KEY } from "./config.js";

setupModal();
loadMarsPhotos(API_KEY);
