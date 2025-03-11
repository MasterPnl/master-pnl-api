const multer = require('multer');
const path = require('path');
const fs = require("node:fs");


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if (!fs.existsSync('images/')) {
            fs.mkdirSync('images/');
        }
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Sadece JPEG, PNG ve GIF formatları desteklenmektedir!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = upload;