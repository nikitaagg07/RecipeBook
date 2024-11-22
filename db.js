// db.js
const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recipebook', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;
