// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); // Import the MongoDB connection function
const Recipe = require('./models/Recipe'); // Import the Recipe model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', './views'); // Set the views directory

// Connect to MongoDB
connectDB();

// Routes

// Render the home page
app.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.render('home', { recipes }); // Render the home.ejs template with recipes
    } catch (error) {
        res.status(500).send('Error fetching recipes');
    }
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const { name, ingredients, method } = req.body; // Destructure recipe data from the request body
        const newRecipe = new Recipe({ name, ingredients, method }); // Create a new recipe instance
        await newRecipe.save(); // Save the recipe to the database
        res.redirect('/'); // Redirect to the home page after submission
    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe' });
    }
});

// Read a single recipe by ID
app.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id); // Fetch the recipe by ID
        res.render('recipe', { recipe }); // Render the recipe.ejs template with the recipe details
    } catch (error) {
        res.status(500).send('Error fetching recipe');
    }
});

// Edit a recipe by ID
app.get('/edit/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id); // Fetch the recipe by ID
        res.render('edit', { recipe }); // Render the edit.ejs template with the recipe details
    } catch (error) {
        res.status(500).send('Error fetching recipe');
    }
});

// Search for recipes by name
app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const recipes = await Recipe.find({ name: { $regex: searchQuery, $options: 'i' } }); // Case-insensitive search
        res.render('home', { recipes });
    } catch (error) {
        res.status(500).send('Error searching for recipes');
    }
});

// Update a recipe by ID
app.post('/api/recipes/:id', async (req, res) => {
    try {
        const { name, ingredients, method } = req.body; // Destructure updated recipe data from the request body
        await Recipe.findByIdAndUpdate(req.params.id, { name, ingredients, method }); // Update the recipe in the database
        res.redirect('/'); // Redirect to the home page after updating
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe' });
    }
});

// Delete a recipe by ID
app.delete('/api/recipes/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id); // Delete the recipe from the database
        res.status(204).send(); // Send a 204 No Content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
