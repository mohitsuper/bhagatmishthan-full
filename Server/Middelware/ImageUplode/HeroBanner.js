const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req,res,cd){
        cd(null,'upload/hero')
    },
    filename: function(req,file,cd){
        cd(null,Date.now() + path.extname(file.originalname))
    },
})



const HeroUplode = multer({storage})

module.exports={HeroUplode}