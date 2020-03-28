import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const limits = {
  files: 50,
  fileSize: 1024 * 1024, // 1 MB (max file size)
};
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg') {
      return cb(new Error('Bạn phải đổi sang .jpeg'));
    }
    cb(null, true);
  },
  limits: limits
})


/* GET Upload page. */
router.get('/', function (req, res, next) {
  res.render('upload', { title: 'Upload' });
});
router.post('/profile', upload.array('wallpaper', 12), function (req, res, next) {
  try{
    const files = req.files;
    if (!files.length) {
        res.status(400).json({
            "status": "failed",
            "code" : "400",
            "message" : "Please upload file"
        });
    }
    res.status(200).json({
        "status": "success",
        "code" : "200",
        "message" : "file uploaded successfully"
    });
}catch(err){
    console.log(err.message);
    res.status(200).json({
        "status": "failed",
        "code" : "500",
        "message" : err.message
    });
}
})
module.exports = router;