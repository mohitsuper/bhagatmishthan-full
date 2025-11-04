const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    stock:Number,
    weight:Number,
    category:String,
    ingredients:String,
    mainimage:String,
    productType:[String],
    subimage:[String],
    isActive:{
        type:Boolean,
        default:true
    }
})

const ProductModel = mongoose.model('best-seller',ProductSchema)

module.exports={ProductModel}