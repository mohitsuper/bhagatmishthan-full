const { default: mongoose } = require("mongoose");
const HeroImageSchema = mongoose.Schema({
    image:String,
    isActive:{
        type:Boolean,
        default:true
    }
})


const HeroImage = mongoose.model('HeroImage',HeroImageSchema)
module.exports={HeroImage}