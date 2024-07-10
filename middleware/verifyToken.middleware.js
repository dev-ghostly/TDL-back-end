const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Ensure header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access denied.');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        console.log("Decoded");
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid token.');
    }
};
