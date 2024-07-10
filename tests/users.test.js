const app = require('./app');
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