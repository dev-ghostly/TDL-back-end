const app = require('./app');
const request = require('supertest');

var task = ''

describe('CREATE /api/tasks', () => {
    test("It should create a task", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        const response2 = await request(app).post('/api/tasks').send({title : 'test', description : 'test', category : 'test', user : "668cfebecee8150feb91372d", category : "668cfebecee8150feb91372e" }).set('Authorization', 'Bearer ' + token);
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

describe('READ /api/tasks', () => {
    test("It should return a list of tasks", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // get the list of tasks
        const response2 = await request(app).get('/api/tasks').set('Authorization', 'Bearer ' + token);
        expect(response2.body).not.toBeNull();
    })
    test("Can't get list without JWT", async () => {
        const response = (await request(app).get('/api/tasks').set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Should be an array of object", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // get the list of tasks
        const response2 = await request(app).get('/api/tasks').set('Authorization', 'Bearer ' + token);
        expect(response2.body).toBeInstanceOf(Array);
    })
})

describe('UPDATE /api/tasks', () => {
    test("It should update a task", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // update the task
        const response2 = await request(app).put('/api/tasks/' + task).send({title : 'test2', description : 'test2'}).set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(200);
    })
    test("Can't update without JWT", async () => {
        const response = (await request(app).put('/api/tasks/' + task).send({title : 'test2', description : 'test2'}).set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Try to update without title", async () => {
         // connect and get the token
         const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
         const token = response.body.token;
         // update the task
         const response2 = await request(app).put('/api/tasks/' + task).send({description : 'test2', category : 'test2'}).set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(500);
    })
})