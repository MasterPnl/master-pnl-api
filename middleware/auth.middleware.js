const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid or expired token'});
        }
        req.user = decoded;
        next();
    });
}

function isAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid or expired token'});
        }
        if (decoded.isAdmin === false) {
            return res.status(403).json({message: 'Access denied'});
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken,
    isAdmin
};