const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/uploads'); // Set upload folder
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, function ( err, name ) {
            const fn = name.toString("hex")+path.extname(file.originalname);
            cb(null,fn); // Set unique file name
        })
    }
});

const upload = multer({ storage: storage });

module.exports = upload;