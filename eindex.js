const express = require('express');
const app = express();
const port = 3001;

// Array of services
const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Services",
  "SEO Optimization"
];

// Home route
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Welcome! Hello, World from Express!');
});

// About route
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send(
`About Our Company

We are a leading software development company specializing in creating modern, user-friendly, and scalable web and mobile applications.
Our mission is to help businesses transform their digital presence and reach more customers through technology.

Our Values:
- Innovation: We constantly explore new technologies and creative ideas.
- Quality: We deliver reliable, high-performance applications.
- Customer Focus: Our client's success is our top priority.
- Integrity: We believe in honesty, transparency, and long-term relationships.`
  );
});

// Services route
app.get('/services', (req, res) => {
  res.type('text/plain');
  const list = services.map((s, i) => `${i + 1}. ${s}`).join('\n');
  res.send(`Our Services:\n${list}`);
});

// Contact route
app.get('/contact', (req, res) => {
  res.type('text/plain');
  res.send(
`Contact Us
If you're like to work with us, reach out via email or phone.
Email: contact@ourcompany.com
Phone: +91 98765 43210
Address: 123 Chennai, India`
  );
});

// Error route for unknown paths
app.use((req, res) => {
  res.status(404).type('text/plain').send('404 - Page Not Found\nThe page you are looking for does not exist.');
});

// Start the server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});