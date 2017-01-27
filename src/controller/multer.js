import multer from 'multer';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function(req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  }
});

const upload = multer({storage: storage});
export default upload;
