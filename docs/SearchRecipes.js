// Need to implement backend for API key security
// import { config } from "./config.js";
// const apiKey = config.apiKey;

// Function to fetch recipes based on filters and keyword within handleSearch Function
function fetchRecipesWithFilters(
  maxPrice,
  maxPrepTime,
  cuisine,
  diet,
  keyword
) {
  let apiUrl =
    `https://api.spoonacular.com/recipes/complexSearch?maxPrice=${maxPrice}&apiKey=` +
    apiKey;

  if (cuisine) apiUrl += `&cuisine=${cuisine}`;
  if (diet) apiUrl += `&diet=${diet}`;
  if (keyword) apiUrl += `&query=${keyword}`;
  if (maxPrepTime) apiUrl += `&maxReadyTime=${maxPrepTime}`;

  apiUrl += "&addRecipeInformation=true";

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      return [];
    });
}

// Function to fetch recipe details by recipe ID once displayWithTotalCost is completed
async function fetchRecipeDetails(recipeId) {
  const apiUrl =
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=` +
    apiKey;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching recipe details for recipe ID ${recipeId}:`,
      error
    );
    return null;
  }
}

// Function to display recipe details below the respective recipe once fetchRecipeDetails is complete
function displayRecipeDetails(recipe, recipeItem) {
  if (!recipe) {
    recipeItem.innerHTML += "<p>Recipe details not available.</p>";
    return;
  }

  const recipeDetailsDiv = document.createElement("div");
  recipeDetailsDiv.classList.add("recipe-details");

  // Construct the recipe details
  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.textContent = "Ingredients:";
  recipeDetailsDiv.appendChild(ingredientsHeading);

  const ingredientsList = document.createElement("ul");
  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = `${ingredient.original}`;
    ingredientsList.appendChild(ingredientItem);
  });
  recipeDetailsDiv.appendChild(ingredientsList);

  const instructionsHeading = document.createElement("h3");
  instructionsHeading.textContent = "Instructions:";
  recipeDetailsDiv.appendChild(instructionsHeading);

  // Checking if instructions are in HTML format
  if (
    recipe.instructions &&
    recipe.instructions.length > 0 &&
    recipe.instructions.includes("<ol>") &&
    recipe.instructions.includes("<li>")
  ) {
    // If instructions are already in HTML format, display as is
    const instructionsDiv = document.createElement("div");
    instructionsDiv.innerHTML = recipe.instructions;
    recipeDetailsDiv.appendChild(instructionsDiv);
  } else {
    // If instructions are plain text, split by sentences and display each sentence as a paragraph
    const instructionSentences = recipe.instructions.split(". ");
    instructionSentences.forEach((sentence) => {
      const instructionParagraph = document.createElement("p");
      instructionParagraph.textContent = sentence.trim();
      recipeDetailsDiv.appendChild(instructionParagraph);
    });
  }

  // Append the recipe details below the respective recipe
  recipeItem.appendChild(recipeDetailsDiv);
}

// Function to displayRecipesWithTotalCost once handleSearch is completed
async function displayRecipesWithTotalCost(recipes, maxPrice) {
  const recipeContainer = document.getElementById("recipeList");
  recipeContainer.innerHTML = ""; // Clear previous content

  if (recipes.length === 0) {
    recipeContainer.textContent = "No recipes found.";
    return;
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const totalCost = await fetchTotalCost(recipe.id);
    if (totalCost && totalCost / 100 <= maxPrice) {
      const recipeItem = document.createElement("div");
      recipeItem.classList.add("recipe-item");

      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = recipe.title;

      const recipePrepTime = document.createElement("p");
      recipePrepTime.textContent = `Prep Time: ${recipe.readyInMinutes} minutes`;

      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image;

      recipeDiv.appendChild(recipeImage);
      recipeDiv.appendChild(recipeTitle);
      recipeDiv.appendChild(recipePrepTime);

      const totalCostInDollars = (totalCost / 100).toFixed(2);
      const totalCostElement = document.createElement("p");
      totalCostElement.textContent = `Total Cost: $${totalCostInDollars}`;
      recipeDiv.appendChild(totalCostElement);

      recipeItem.appendChild(recipeDiv);

      // Attach event listener to toggle recipe details when the title is clicked
      recipeTitle.addEventListener("click", async () => {
        // Check if recipe details are already displayed
        const recipeDetailsDiv = recipeItem.querySelector(".recipe-details");
        if (recipeDetailsDiv) {
          // If details are displayed, remove them
          recipeDetailsDiv.remove();
        } else {
          // If details are not displayed, fetch and display them
          const recipeDetails = await fetchRecipeDetails(recipe.id);
          displayRecipeDetails(recipeDetails, recipeItem);
        }
      });

      recipeContainer.appendChild(recipeItem);
    }
  }
}

async function handleSearch() {
  const maxPrice = parseFloat(document.getElementById("maxPrice").value);
  const maxPrepTime = parseInt(document.getElementById("maxPrepTime").value);
  const cuisineFilters = Array.from(
    document.querySelectorAll('#cuisine input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const dietFilters = Array.from(
    document.querySelectorAll('#diet input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const keyword = document.getElementById("keyword").value.trim();

  if (isNaN(maxPrice)) {
    alert("Please enter a valid price.");
    return;
  }

  const recipes = await fetchRecipesWithFilters(
    maxPrice,
    maxPrepTime,
    cuisineFilters.join(","),
    dietFilters.join(","),
    keyword
  );
  await displayRecipesWithTotalCost(recipes, maxPrice);
}

// Once displayRecipesTotalCost is processed, this function helps gather/calculate cost data using recipeId
async function fetchTotalCost(recipeId) {
  const totalCostUrl =
    `https://api.spoonacular.com/recipes/${recipeId}/priceBreakdownWidget.json?&apiKey=` +
    apiKey;
  try {
    const response = await fetch(totalCostUrl);
    const data = await response.json();
    return data.totalCost;
  } catch (error) {
    console.error(
      `Error fetching total cost for recipe ID ${recipeId}:`,
      error
    );
    return null;
  }
}

// Get the overlay elements
const cuisineButton = document.getElementById("cuisineButton");
const dietButton = document.getElementById("dietButton");
const cuisineOverlay = document.getElementById("cuisineOverlay");
const dietOverlay = document.getElementById("dietOverlay");
const closeCuisineButton = document.getElementById("closeCuisine");
const closeDietButton = document.getElementById("closeDiet");
// Show the overlay for cuisine options
cuisineButton.addEventListener("click", () => {
  cuisineOverlay.classList.add("show");
});
// Show the overlay for diet options
dietButton.addEventListener("click", () => {
  dietOverlay.classList.add("show");
});
// Close the overlay for cuisine options
closeCuisineButton.addEventListener("click", () => {
  cuisineOverlay.classList.remove("show");
});
// Close the overlay for diet options
closeDietButton.addEventListener("click", () => {
  dietOverlay.classList.remove("show");
});

window.handleSearch = handleSearch;
