const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, "upload/card"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
})

const Cardupload = multer({storage})
module.exports={Cardupload}