const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async register(req, res) {
        // register by checking if user already exists
        let user = await userModel.findOne({ username: req.body.username });
        if (user) return res.status(400).send('User already registered.');
        // encrypt password
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) return res.status(500).send('Error encrypting password.');
            // create user
            user = new userModel({
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(() => res.status(201).send('User created.'))
                .catch(err => res.status(500).send('Error creating user.'));
        })
    },
    async login(req, res) {
        // login by checking if user exists
        let user = await userModel.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('User not found.');
        // check password
        const validPassword = bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');
        // create token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        return res.status(200).send({ token, message : 'Logged in.'});
    }
}