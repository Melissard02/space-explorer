// asteroid.js
// ==============================
// Asteroids Near Earth
// ==============================
export async function loadNearEarth(API_KEY) {
    const nearSection = document.getElementById("near-earth");
    const rangeForm = document.createElement("div");
    rangeForm.id = "range-form";

    const resultsContainer = document.createElement("div");
    resultsContainer.id = "form-results";
    resultsContainer.className = "card-container";

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
    `;

    nearSection.appendChild(rangeForm);
    nearSection.appendChild(resultsContainer);

    const form = document.getElementById("asteroid-form");
    const formResults = resultsContainer;

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