const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.use('/api/users', require('../routes/user.route'));

app.listen(3000);

const request = require('supertest');

describe('GET /api/users', () => {
    test('It should return a JWT', async () => {
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    test('It should return a 400 status code', async () => {
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'wrong'});
        expect(response.statusCode).toBe(400);
    });
});