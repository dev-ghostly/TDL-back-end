# To-do-List : Back-End Documentation

## 1. Introduction

- **Purpose**: Creating an online Todo-list with the possibilities of creating categories to arrange the tasks. This project is also the first project that I created in order to be hosted on an NGINX VPS server configurated with domain name etc...
- **Scope**: Serving a full API for it to be used by the front-end with a communication to database, verification of authentication etc...

## 2. Project Overview

- **Description**: Back-end server serving an API that handle login/register, management of categories and management of tasks.
- **Technologies Used**: Node.js, Express.js, Bcrypt, JsonWebToken, Mongoose, MongoDB.

## 3. Architecture

- **System Architecture**: Monolithic Architecture.
- **Communication**: REST

## 4. Development Setup

- **Prerequisites**: NodeJS (18.0.0+)
- **Installation and Running the Application**:

```js
npm install
npm start
```

## 5. API Documentation

- **Endpoints**: List of API endpoints.
- **Base route**: <http://localhost:3000/remindme>.

| Route     | Method           | Request  | Response Code | Response |
| ------------- |:-------------:|:-------------:|:-------------:|-------------:|
| /api/users/register      | POST | username && password | 201 | "User created." |
|      |  |  | 500 | "Error creating user." |
|      |  |  | 400 | "User already registered" |
| /api/users/login      | POST | username && password | 200 | {token, message : 'Logged in'} |
|      |  |  | 400 | "User not found" or "Invalid password" |
| /api/categories     | POST | name  | 201 | category |
|      |  |  | 500 | "Error creating category." |
| /api/categories     | GET |  | 200 | categories |
| /api/categories/:id     | PUT | name | 200 | 'Category updated.' |
|      |  |  | 500 | "Error updating category." |
|      |  |  | 404 | "Category not found." |
| /api/categories/:id     | DELETE |  | 200 | 'Category deleted.' |
|      |  |  | 500 | "Error deleting category." |
|      |  |  | 404 | "Category not found." |
| /api/tasks     | POST | title + description + category  | 201 | task |
|      |  |  | 500 | "Error creating task." |
|      |  |  | 404 | "Category not found." |
| /api/tasks    | GET |  | 200 | tasks |
| /api/tasks/:id     | PUT | title or description or category or completed  | 200 | "Task updated." |
|      |  |  | 500 | "Error updating task." |
|      |  |  | 404 | "Task not found." |
| /api/tasks/:id     | DELETE |  | 200 | 'Task deleted.' |
|      |  |  | 500 | "Error deleting task." |
|      |  |  | 404 | "Category not found." or "Task not found" |

## 6. Database Integration

- **Database Schema**: Each users have their own categories and each categories have their own tasks.
- **ORM/ODM**: Mongoose

## 7. Security

- **Authentication**: JWT
- **Authorization**: JWT middleware that verify the token sent in the authorization. If the token is bad, send an error 400 with "Invalid token".
- **Data Protection**: Encryption of datas in token only readable from back-end. Crypting of passwords with Bcryp module.

## 8. Testing

- **Testing Strategy**: Testing using Supertest to test all the API routes.
- **Unit Tests**: Jest and Supertest are testing each routes one by one. For it you can run:

```js
npm run test
```

## 9. Appendix

- **References and documentation**:

1. [NodeJS](https://nodejs.org/docs/latest/api/)
2. [ExpressJS](https://expressjs.com)
3. [Supertest](https://github.com/ladjs/supertest#readme)
4. [Jest](https://jestjs.io)
5. [Mongoose](https://mongoosejs.com)
