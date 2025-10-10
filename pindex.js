const http = require('http');
const url = require('url');

// user array
const users = [];

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  // Enable JSON responses
  res.setHeader('Content-Type', 'application/json');

  // POST /users — create a new user
  if (path === '/users' && method === 'POST') {
    let body = '';

    // Collect data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When request data is complete
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { name, email } = data;

        // Basic validation
        if (!name || !email) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Name and email are required' }));
        }

        // Create new user
        const newUser = { id: users.length + 1, name, email };
        users.push(newUser);

        res.statusCode = 201;
        res.end(JSON.stringify({ message: 'User created successfully', user: newUser }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });

  // GET /users — list all users
  } else if (path === '/users' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(users));

  // 404 for all other routes
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start the server
const PORT = 3004;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});