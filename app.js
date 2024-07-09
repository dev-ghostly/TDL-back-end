const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Server is running on port 3000'));