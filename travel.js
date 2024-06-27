document.addEventListener("DOMContentLoaded", () => {
  const recommendationContainer = document.getElementById(
    "recommendation-container"
  );
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resetButton = document.getElementById("reset-button");

  const fetchRecommendations = (keyword) => {
    fetch("travel.json")
      .then((response) => response.json())
      .then((data) => {
        recommendationContainer.innerHTML = "";

        const recommendations = data.filter((place) => {
          const placeKeywords = place.keywords.map((k) => k.toLowerCase());
          return placeKeywords.includes(keyword.toLowerCase());
        });

        recommendations.forEach((place) => {
          const placeCard = document.createElement("div");
          placeCard.className = "place-card";

          const placeImage = document.createElement("img");
          placeImage.src = place.imageUrl;
          placeImage.alt = place.name;

          const placeName = document.createElement("h3");
          placeName.textContent = place.name;

          const placeDescription = document.createElement("p");
          placeDescription.textContent = place.description;

          placeCard.appendChild(placeImage);
          placeCard.appendChild(placeName);
          placeCard.appendChild(placeDescription);
          recommendationContainer.appendChild(placeCard);
        });
      })
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  };

  const clearResults = () => {
    recommendationContainer.innerHTML = "";
    searchInput.value = "";
  };

  searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
      fetchRecommendations(keyword);
    }
  });

  resetButton.addEventListener("click", clearResults);
});

const displayTimeForCountry = (timeZone) => {
  const options = {
    timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const countryTime = new Date().toLocaleTimeString("en-US", options);
  console.log(`Current time in ${timeZone}:`, countryTime);
};
