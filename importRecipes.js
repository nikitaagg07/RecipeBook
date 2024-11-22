const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Recipe = require('./model/Recipe'); // Adjust the path if necessary

// Function to import recipes from JSON file
const importRecipes = async () => {
    try {
        const recipesData = JSON.parse(fs.readFileSync('./data/recipes.json'));
        await Recipe.insertMany(recipesData);
        console.log('Recipes imported successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error importing recipes:', error);
    }
};

importRecipes();
