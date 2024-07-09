const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    async register(req, res) {
        // register by checking if user already exists
        let user = await userModel.findOne({ username: req.body.username });
        if (user) return res.status(400).send('User already registered.');
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let newUser = new userModel({
            username: req.body.username,
            password: req.body.password
        });
        let result = await newUser.save();
        if (result) return res.status(200).send('User registered successfully');
        return res.status(400).send('User registration failed');
    },
}