const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.use('/api/users', require('../routes/user.route'));
app.use('/api/categories', require('../routes/category.route'));
app.use('/api/tasks', require('../routes/task.route'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;