const {express} = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,res,cd)=>{
        cd(null,'upload/Product');
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now() +'-'+ file.originalname )
    }
})

const ProductImageUplode = multer({storage})

module.exports={ProductImageUplode}