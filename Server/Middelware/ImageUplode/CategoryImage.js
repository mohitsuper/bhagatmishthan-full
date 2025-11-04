const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/category')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() +'-'+ path.extname(file.originalname))
    }
})


const CategoryUplode = multer({storage})

module.exports={CategoryUplode}
