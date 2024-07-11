const app = require('./app');
const request = require('supertest');

var category = ''

describe('CREATE /api/categories', () => {
    test("It should create a category", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // create a task
        const response2 = await request(app).post('/api/categories').send({name : 'test'}).set('Authorization', 'Bearer ' + token);
        console.log(response2.body);
        category = response2.body.category._id;
        expect(response2.statusCode).toBe(201);
    })
    test("Can't create without JWT", async () => {
        const response = (await request(app).post('/api/categories').send({name : 'test'}).set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Try to create without name", async () => {
         // connect and get the token
         const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
         const token = response.body.token;
         // create a task
         const response2 = await request(app).post('/api/categories').send().set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(500);
    })
})

describe('READ /api/categories', () => {
    test("It should return a list of categories", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // get the list of categories
        const response2 = await request(app).get('/api/categories').set('Authorization', 'Bearer ' + token);
        expect(response2.body).not.toBeNull();
    })
    test("Can't get list without JWT", async () => {
        const response = (await request(app).get('/api/categories').set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Should be an array of object", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // get the list of categories
        const response2 = await request(app).get('/api/categories').set('Authorization', 'Bearer ' + token);
        expect(response2.body).toBeInstanceOf(Array);
    })
})

describe('UPDATE /api/categories', () => {
    test("It should update a category", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // update the category
        const response2 = await request(app).put('/api/categories/' + category).send({name : 'test2'}).set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(200);
    })
    test("Can't update without JWT", async () => {
        const response = (await request(app).put('/api/categories/' + category).send({name : 'test2'}).set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
    test("Try to update without name", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // update the category
        const response2 = await request(app).put('/api/categories/' + category).send().set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(500);
    })
})

describe('DELETE /api/categories', () => {
    test("It should delete a category", async () => {
        // connect and get the token
        const response = await request(app).post('/api/users/login').send({username : 'test', password : 'test'});
        const token = response.body.token;
        // delete the category
        const response2 = await request(app).delete('/api/categories/' + category).set('Authorization', 'Bearer ' + token);
        expect(response2.statusCode).toBe(200);
    })
    test("Can't delete without JWT", async () => {
        const response = (await request(app).delete('/api/categories/' + category).set('Authorization', 'Bearer ' + 'wrong'))
        expect(response.statusCode).toBe(400);
    })
})