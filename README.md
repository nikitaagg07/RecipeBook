# Recipe Book

Welcome to the Recipe Book project! This is a simple web application where users can add, view, edit, and delete cooking recipes. The application uses Node.js, Express, and MongoDB as its backend and EJS as the templating engine for rendering the frontend.

## Features

- **Add Recipes**: Users can add new recipes with details such as name, ingredients, and method of preparation.
- **View Recipes**: All added recipes can be viewed on the home page.
- **Edit Recipes**: Users can update existing recipes.
- **Delete Recipes**: Recipes can be deleted after confirmation.
- **Data Persistence**: Recipes are stored in a MongoDB database.

## Prerequisites

- Node.js
- MongoDB

## Structure 

Recipe-Book-Main/
├── app.js             # Main application file
├── model/
│   └── Recipe.js      # Mongoose model for recipes
├── views/
│   ├── home.ejs       # Main view for displaying recipes
│   ├── edit.ejs       # View for editing a recipe
│   └── recipe.ejs     # View for displaying a single recipe
├── data/
│   └── recipes.json    # Sample recipe data (from database)
└── importRecipes.js    # Script to import sample recipes


