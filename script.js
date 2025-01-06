const body = document.getElementById("body");
const main = document.getElementById("main");
const solarisContainer = document.getElementById("solarisSystemet");
const planet = document.getElementById("searchbar");

fetchData();

function fetchData() {
  const urlApi =
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";

  const urlApiKey =
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

  fetch(urlApiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Couldn't fetch the key");
      }
      return response.json();
    })
    .then((data) => {
      const apiKey = data.key;
      console.log("Fetched the API Key", apiKey);

      return fetch(urlApi, {
        method: "GET",
        headers: { "x-zocom": apiKey },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Couldn't fetch response");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data);

      const Name = document.getElementById("Name");
      const latinName = document.getElementById("latinName");
      const type = document.getElementById("type");
      const distanceSun = document.getElementById("distanceSun");
      const circumference = document.getElementById("circumference");
      const minTemp = document.getElementById("minTemp");
      const maxTemp = document.getElementById("maxTemp");
      const facts1 = document.getElementById("facts1");
      const facts2 = document.getElementById("facts2");
      const facts3 = document.getElementById("facts3");
      const moons = document.getElementById("moons");

      function userInput() {
        const searchbar = document.getElementById("searchbar").value.toLowerCase();
        const popUp = document.getElementById("popUp");
        const planet = data.bodies.find(
          (body) => body.name.toLowerCase() === searchbar
        );

        if (planet) {
          Name.textContent = `${planet.name}`;
          latinName.textContent = `${planet.latinName}`;
          type.textContent = `${planet.type}`;
          distanceSun.textContent = `${planet.distance} km`;
          circumference.textContent = `${planet.circumference} km`;
          maxTemp.textContent = `Dagtid: ${planet.temp.day} °C`;
          minTemp.textContent = `Natt: ${planet.temp.night} °C`;
          moons.textContent = `${planet.moons.length}`;
          facts1.textContent = `${planet.desc}`;
          facts2.textContent = `Jorddygn runt solen: ${planet.orbitalPeriod} dygn`;
          facts3.textContent = `Jorddygn runt sin egen axel: ${planet.rotation} dygn`;

          popUp.style.display = "block";
        } else {
          alert("Inte en planet eller stjärna, testa igen");
        }
      }

      const button = document.getElementById("button");
      button.addEventListener("click", userInput);
      button.addEventListener("mouseover", () => {
        button.style.cursor = "pointer";
      });

      const closeBtn = document.getElementById("btnClose");
      closeBtn.addEventListener("click", () => {
        if (popUp.style.display === "block") {
          popUp.style.display = "none";
        }
      });

      closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.cursor = "pointer";
      });

      starryStars();

      function starryStars() {
        const starContain = document.querySelector(".starryHeaven");
        const numberStars = 200;

        for (let i = 0; i < numberStars; i++) {
          const stars = document.createElement("div");
          stars.classList.add("stars");
          stars.style.top = `${Math.random() * 100}vh`;
          stars.style.left = `${Math.random() * 100}vw`;
          stars.style.animationDuration = `${Math.random() * 5 + 2}s`;
          stars.style.animationDelay = `${Math.random() * 2}s`;

          starContain.appendChild(stars);
        }
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
}
