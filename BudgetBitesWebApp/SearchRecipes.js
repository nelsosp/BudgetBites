const apiKey = '5c3f62a679e74709a953dc430262a44b';

// Function to fetch recipes based on filters and keyword
function fetchRecipesWithFilters(maxPrice, cuisine, diet, keyword) {
    let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?maxPrice=${maxPrice}&apiKey=${apiKey}`;

    if (cuisine) apiUrl += `&cuisine=${cuisine}`;
    if (diet) apiUrl += `&diet=${diet}`;
    if (keyword) apiUrl += `&query=${keyword}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => {
            console.error('Error fetching recipes:', error);
            return [];
        });
}

// Function to fetch recipe details by recipe ID
async function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching recipe details for recipe ID ${recipeId}:`, error);
        return null;
    }
}

// Function to handle user search with filters and keyword
function handleSearch() {
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const cuisineFilters = Array.from(document.querySelectorAll('#cuisine input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const dietFilters = Array.from(document.querySelectorAll('#diet input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const keyword = document.getElementById('keyword').value.trim();

    if (isNaN(maxPrice)) {
        alert('Please enter a valid price.');
        return;
    }

    fetchRecipesWithFilters(maxPrice, cuisineFilters.join(','), dietFilters.join(','), keyword)
        .then(recipes => {
            if (recipes.length === 0) {
                alert('No recipes found.');
                return;
            }

            recipes.sort((a, b) => b.pricePerServing - a.pricePerServing);

            const recipeListDiv = document.getElementById('recipeList');
            recipeListDiv.innerHTML = '';

            recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');

                const recipeTitle = document.createElement('h2');
                recipeTitle.textContent = recipe.title;

                const recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;

                recipeDiv.appendChild(recipeImage);
                recipeDiv.appendChild(recipeTitle);

                const recipeDetailsDiv = document.createElement('div');
                recipeDetailsDiv.classList.add('recipe-details');
                recipeDiv.appendChild(recipeDetailsDiv);

                recipeTitle.addEventListener('click', () => {
                    if (recipeDetailsDiv.style.display === 'block') {
                        recipeDetailsDiv.style.display = 'none';
                    } else {
                        fetchRecipeDetails(recipe.id)
                            .then(recipeDetails => {
                                displayRecipeDetails(recipeDetails, recipeDetailsDiv);
                            });
                    }
                });

                recipeListDiv.appendChild(recipeDiv);
            });
        });
}

// Function to display recipe details
function displayRecipeDetails(recipe, recipeDetailsDiv) {
    if (!recipe) {
        recipeDetailsDiv.innerHTML = 'Recipe details not available.';
        return;
    }

    recipeDetailsDiv.innerHTML = '';

    const ingredientsHeading = document.createElement('h3');
    ingredientsHeading.textContent = 'Ingredients:';
    recipeDetailsDiv.appendChild(ingredientsHeading);

    const ingredientsList = document.createElement('p');
    recipe.extendedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = `${ingredient.original}`;
        ingredientsList.appendChild(ingredientItem);
    });
    recipeDetailsDiv.appendChild(ingredientsList);

    const instructionsHeading = document.createElement('h3');
    instructionsHeading.textContent = 'Instructions:';
    recipeDetailsDiv.appendChild(instructionsHeading);

// Removes any weird additions returned from api results in instructions and orders instructions
if (recipe.instructions.includes('<ol>') && recipe.instructions.includes('<li>')) {
    recipeDetailsDiv.innerHTML += recipe.instructions;
} else {
    const instructionSentences = recipe.instructions.split('. ');
    instructionSentences.forEach(sentence => {
        const instructionParagraph = document.createElement('p');
        instructionParagraph.textContent = sentence.trim();
        recipeDetailsDiv.appendChild(instructionParagraph);
    });
}

    recipeDetailsDiv.style.display = 'block';
}
