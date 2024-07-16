const app = require('./app');
const request = require('supertest');

var task = ''

describe('CREATE /api/tasks', () => {
    test("It should create a task", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // create a task
        const response2 = await request(app).post('/api/tasks').send({title : 'test', description : 'test', category : 'test'}).set('Authorization', 'Bearer ' + token);
        task = response2.body.task._id;
        expect(response2.statusCode).toBe(201);
    })
    test("Can't create without JWT", async () => {
        const response = (await request(app).post('/api/tasks').send({title : 'test', description : 'test', category : 'test'}).set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Try to create without title", async () => {
         // connect and get the token
         const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
         const token = response.body.token;
         // create a task
         const response2 = await request(app).post('/api/tasks').send({description : 'test', category : 'test'}).set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(500);
    })
})