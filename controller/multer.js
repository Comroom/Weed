var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function(req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  }
});

var upload = multer({storage: storage});

module.exports = upload;
