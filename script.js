const planets = {
    "Merkurius": { distance: "57.91 milj. km", diameter: "4,879 km", moons: "0" },
    "Venus": { distance: "108.2 milj. km", diameter: "12,104 km", moons: "0" },
    "Jorden": { distance: "149.6 milj. km", diameter: "12,742 km", moons: "1" },
    "Mars": { distance: "227.9 milj. km", diameter: "6,779 km", moons: "2" },
    "Jupiter": { distance: "778.5 milj. km", diameter: "139,820 km", moons: "79" },
    "Saturnus": { distance: "1,429 milj. km", diameter: "116,460 km", moons: "82" },
    "Uranus": { distance: "2,871 milj. km", diameter: "50,724 km", moons: "27" },
    "Neptunus": { distance: "4,495 milj. km", diameter: "49,244 km", moons: "14" }
};

const planetNameInput = document.getElementById('planetName');
const planetBox = document.querySelector('.planetBox');
const closeBtn = document.getElementById('closeBtn');
const nameElement = document.getElementById('name');
const factsElement = document.getElementById('facts');

function showPlanetInfo(planet) {
    nameElement.textContent = planet;
    factsElement.innerHTML = `
        <p>Avstånd från solen: ${planets[planet].distance}</p>
        <p>Diameter: ${planets[planet].diameter}</p>
        <p>Antal månar: ${planets[planet].moons}</p>
    `;
    planetBox.style.display = 'flex';
}

document.querySelector('.planets').addEventListener('click', function() {
    const planetName = planetNameInput.value.trim();
    if (planets[planetName]) {
        showPlanetInfo(planetName);
    } else {
        alert('Planet inte funnen!');
    }
});

closeBtn.addEventListener('click', function() {
    planetBox.style.display = 'none';
});
