const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Temporary array to store users
const users = [];

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// Helper function to get request body
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body || '{}'));
            } catch (err) {
                reject(err);
            }
        });
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;
    const method = req.method;

    // POST /users - Create new user
    if (method === 'POST' && pathname === '/users') {
        try {
            const body = await getRequestBody(req);
            const { name, email } = body;

            if (!name || !email) {
                return sendJSON(res, 400, { error: 'Name and email are required' });
            }

            const newUser = { id: uuidv4(), name, email };
            users.push(newUser);

            return sendJSON(res, 201, { message: 'User created successfully', user: newUser });
        } catch {
            return sendJSON(res, 400, { error: 'Invalid JSON' });
        }
    }

    // GET /users - Get all users
    if (method === 'GET' && pathname === '/users') {
        return sendJSON(res, 200, users);
    }

    // GET /users/id - Get a user by ID
    if (method === 'GET' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const user = users.find(u => u.id === id);
        if (!user) return sendJSON(res, 404, { error: 'User not found' });
        return sendJSON(res, 200, user);
    }

    // PUT /users/id - Update a user by ID
    if (method === 'PUT' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const user = users.find(u => u.id === id);
        if (!user) return sendJSON(res, 404, { error: 'User not found' });

        try {
            const body = await getRequestBody(req);
            const { name, email } = body;
            if (!name && !email) return sendJSON(res, 400, { error: 'Provide name or email to update' });

            if (name) user.name = name;
            if (email) user.email = email;

            return sendJSON(res, 200, { message: 'User updated successfully', user });
        } catch {
            return sendJSON(res, 400, { error: 'Invalid JSON' });
        }
    }

    //PATCH /users/id - Partially update a user by ID
    if (method === 'PATCH' && pathname.startsWith('/users/')){
        const id = pathname.split('/')[2];
        const user = users.find(u => u.id === id);
        if (!user) return sendJSON(res,404, { error: 'User not found'});
        try {
            const body = await getRequestBody(req);
            const { name, email } = body;
            if (!name && !email) return sendJSON(res,404, {error: 'Provide name or email to update'});
            if (name) user.name = name;
            if (email) user.email = email;
            return sendJSON(res,200, { message: 'User updated successfully', user});
        } catch {
            return sendJSON(res,404, { error: 'Invaild JSON'});
        }
    }

    //DELETE /users/id - Delete a user by ID
    if (method === 'DELETE' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return sendJSON(res,404, { error: 'User not found' });
        users.splice(userIndex, 1);
        return sendJSON(res,200, { message: 'User deleted sucessfully' });
    }
    
    // Fallback for unknown routes
    sendJSON(res, 404, { error: 'Route not found' });
});

// Start server
server.listen(3004, () => {
    console.log('Server running at http://localhost:3004');
});
