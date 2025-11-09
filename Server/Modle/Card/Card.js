const { default: mongoose } = require("mongoose");


const cardschema = mongoose.Schema({
    name:String,
    price:String,
    Ip_address: String,
    Image: String,
    user_id: String,
})

const CardModle = mongoose.model("card",cardschema)

module.exports={CardModle}