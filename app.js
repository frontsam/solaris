// Ta bort planetId eftersom det inte används längre
// let planetId = document.querySelector(".planet-id");

async function getApiKey() {
  try {
    // Hämta API-nyckeln genom att göra en POST-begäran till /keys
    let response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST", // Använd POST-metoden
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch API key");
    }

    let data = await response.json();
    // Returnera API-nyckeln
    return data.key;
  } catch (error) {
    console.error("Error fetching API key:", error);
  }
}

async function fetchPlanets(apiKey) {
  try {
    // Hämta planetdata genom att använda GET-begäran med API-nyckeln
    let response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": apiKey }, // Skicka API-nyckeln i headers
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); // Kasta ett fel om något går fel
    }

    let data = await response.json();
    // Returnera planetdata
    return data;
  } catch (error) {
    console.error("Error fetching planets:", error);
  }
}

async function loadSolarSystemData() {
  // Hämta API-nyckeln
  const apiKey = await getApiKey();

  // Om API-nyckeln inte kunde hämtas, visa felmeddelande och stoppa exekveringen
  if (!apiKey) {
    console.error("Failed to retrieve API key. Cannot continue.");
    return;
  }

  // Hämta planetdata med den hämtade API-nyckeln
  const planets = await fetchPlanets(apiKey);

  // Om planetdata inte finns eller är felaktig, visa felmeddelande
  if (!planets || !planets.bodies) {
    console.error("Planets data is missing or malformed.");
    return;
  }

  // Skriv ut planetdata för att kolla
  console.log("Planets data:", planets.bodies);

  // Hämta information om varje planet genom index
  const sun = planets.bodies[0];
  const mercury = planets.bodies[1];
  const venus = planets.bodies[2];
  const earth = planets.bodies[3];
  const mars = planets.bodies[4];
  const jupiter = planets.bodies[5];
  const saturn = planets.bodies[6];
  const uranus = planets.bodies[7];
  const neptune = planets.bodies[8];

  // Logga information om Jorden (earth)
  console.log(earth.name); // Exempel på hur du kan använda planetdata
}

// Kör funktionen för att ladda solsystemets data
loadSolarSystemData();
