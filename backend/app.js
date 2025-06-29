const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Moved after core libs

const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes
app.use('/api', authRoutes);

app.use('/api', postRoutes);


module.exports = app;
