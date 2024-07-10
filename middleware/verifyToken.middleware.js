const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    // token bearer
    const token = req.header('Authorization').split('Bearer ')[1];
    if (!token) return res.status(401).send('Access denied.');
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        console.log("Decoded");
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid token.');
    }
}