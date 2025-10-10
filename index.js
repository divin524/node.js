const http = require('node:http');
const port = 3000;

// Array of services
const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Services",
  "SEO Optimization"
];

// Function to send plain text responses
function sendResponse(res, text, status = 200) {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(text);
}

// Create server
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    // Home page
    sendResponse(res, "Welcome! Hello, World from Node.js!");
  } else if (url === '/about') {
    // About page
    sendResponse(res, 
`About Our Company

We are a leading software development company specializing in creating modern, user-friendly, and scalable web and mobile applications.
Our mission is to help businesses transform their digital presence and reach more customers through technology.

Our Values:
- Innovation: We constantly explore new technologies and creative ideas.
- Quality: We deliver reliable, high-performance applications.
- Customer Focus: Our client's success is our top priority.
- Integrity: We believe in honesty, transparency, and long-term relationships.`);
  } else if (url === '/services') {
    // Services page
    const list = services.map((s, i) => `${i + 1}. ${s}`).join('\n');
    sendResponse(res, `Our Services:\n${list}`);
  } else if (url === '/contact') {
    // Contact page
    sendResponse(res, 
`Contact Us
If you're like to work with us, reach out via email or phone.
Email: contact@ourcompany.com
Phone: +91 98765 43210
Address: 123 Chennai, India`);
  } else {
    // Error page
    sendResponse(res, "404 - Page Not Found\nThe page you are looking for does not exist.", 404);
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Node.js server running at http://localhost:${port}/`);
});