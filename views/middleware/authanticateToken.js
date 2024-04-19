const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['Authorization'];
    console.log(token,'mm')
    if (!token) {
        return res.status(401).json({ message: 'Token hai tere Pass' });
    }

    

    jwt.verify(token, 'NikhilDagame', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not good bro.' });
        }
        req.userId = decoded.userId; 
        next();
    });
}

module.exports = authenticateToken;
