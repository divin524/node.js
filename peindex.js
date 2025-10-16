const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const port = 3000;

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

    // Create a new user with unique ID
    const newUser = {
    id: uuidv4(),
    name: name,
    email: email
};

    // Add to the array
    users.push(newUser);

    // Respond with success
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// GET /users endpoint
app.get('/users', (req, res) => {
    res.json(users);
});

// PUT /Update user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    // Find the user by ID
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Update 
    if (name) user.name = name;
    if (email) user.email = email;

    res.json({
        message: 'User updated successfully',
        user
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});