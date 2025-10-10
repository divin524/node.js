const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import uuid

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Temporary array to store users
const users = [];

// POST /users endpoint
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create a new user object with unique ID
    const newUser = {
        id: uuidv4(), 
        name,
        email
    };

    // Add to the array
    users.push(newUser);

    // Respond with success
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});