const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const app = express();
const PORT = process.env.PORT || 4000;

// Use CORS middleware to allow requests from the frontend
app.use(cors());

// Import routes
const routes = require('./routes/route');

// Middleware
app.use(express.json());
app.use('/api', routes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
