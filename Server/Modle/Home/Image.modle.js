//images schema 
const mongoose = require('mongoose')
const ImageSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    }
})

const Image = mongoose.model('images',ImageSchema);
module.exports=Image;