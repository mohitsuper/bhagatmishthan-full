const  mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema({
    name:String,
    isActive:{
        type:Boolean,
        default:true
    }
})

const ProductTypeModle = mongoose.model('product-type',ProductTypeSchema)

module.exports={ProductTypeModle}