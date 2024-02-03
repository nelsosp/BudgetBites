
        // Your JavaScript code
        const apiKey = '5c3f62a679e74709a953dc430262a44b';

        // Function to fetch recipes under a specified price (FIX?)
        function fetchRecipesUnderPrice(maxPrice) {
            const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?maxPrice=${maxPrice}&apiKey=${apiKey}`;

            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    return data.results; // Assuming results is an array of recipes
                })
                .catch(error => {
                    console.error('Error fetching recipes:', error);
                });
        }

        // Function to fetch recipe details by recipe ID
        function fetchRecipeDetails(recipeId) {
            const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    return data; // Details of the recipe
                })
                .catch(error => {
                    console.error(`Error fetching recipe details for recipe ID ${recipeId}:`, error);
                });
        }

        // Function to handle user search
        function handleSearch() {
            const maxPrice = parseFloat(document.getElementById('maxPrice').value);
            if (isNaN(maxPrice)) {
                alert('Please enter a valid price.');
                return;
            }

            fetchRecipesUnderPrice(maxPrice)
                .then(recipes => {
                    const recipeListDiv = document.getElementById('recipeList');
                    recipeListDiv.innerHTML = '';

                    recipes.forEach(recipe => {
                        const recipeDiv = document.createElement('div');
                        recipeDiv.classList.add('recipe');

                        // Create recipe title with image
                        const recipeTitle = document.createElement('h2');
                        recipeTitle.textContent = recipe.title;
                        const recipeImage = document.createElement('img');
                        recipeImage.src = recipe.image;
                        recipeDiv.appendChild(recipeImage);
                        recipeDiv.appendChild(recipeTitle);

                        // Create recipe details div
                        const recipeDetailsDiv = document.createElement('div');
                        recipeDetailsDiv.classList.add('recipe-details');
                        recipeDiv.appendChild(recipeDetailsDiv);

                        // Add click event listener to show/hide recipe details
                        recipeTitle.addEventListener('click', () => {
                            if (recipeDetailsDiv.style.display === 'block') {
                                recipeDetailsDiv.style.display = 'none';
                            } else {
                                // Fetch recipe details and display
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
            recipeDetailsDiv.innerHTML = '';

            // Display ingredients
            const ingredientsHeading = document.createElement('h3');
            ingredientsHeading.textContent = 'Ingredients:';
            recipeDetailsDiv.appendChild(ingredientsHeading);

            const ingredientsList = document.createElement('ul');
            recipe.extendedIngredients.forEach(ingredient => {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${ingredient.original}`;
                ingredientsList.appendChild(ingredientItem);
            });
            recipeDetailsDiv.appendChild(ingredientsList);

            // Display cooking instructions
            const instructionsHeading = document.createElement('h3');
            instructionsHeading.textContent = 'Instructions:';
            recipeDetailsDiv.appendChild(instructionsHeading);

            const instructions = document.createElement('p');
            instructions.textContent = recipe.instructions;
            recipeDetailsDiv.appendChild(instructions);

            recipeDetailsDiv.style.display = 'block'; // Show the recipe details
        }