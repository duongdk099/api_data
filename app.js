require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');  // Import CORS
const app = express();

// Configure Helmet
app.use(helmet());

// Configure CORS to allow your front-end domain
app.use(cors({
  origin: '*',  // Replace with your front-end domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  credentials: true  // Allow credentials (e.g., cookies, authorization headers)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Import user routes
const userRoutes = require('./routes/userRoutes');

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});