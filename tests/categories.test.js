const app = require('../app');
const request = require('supertest');

var category = ''

describe('CREATE /api/categories', () => {
    test("It should create a category", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // create a task
        const response2 = await request(app).post('/api/categories').send({name : 'test'}).set('Authorization', 'Bearer ' + token);
        category = response2.body._id;
        expect(response2.statusCode).toBe(201);
    })
    test("Can't create without JWT", async () => {
        const response = await request(app).post('/api/categories').send({name : 'test'});
        expect(response.statusCode).toBe(401);
    })
    test("Try to create without name", async () => {
        const response = await request(app).post('/api/categories').send({name : ''});
        expect(response.statusCode).toBe(500);
    })
})

describe('READ /api/categories', () => {

})

describe('UPDATE /api/categories', () => {

})

describe('DELETE /api/categories', () => {

})