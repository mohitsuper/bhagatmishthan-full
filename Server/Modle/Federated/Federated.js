const { default: mongoose } = require("mongoose");

const favouriteSchema = mongoose.Schema({
    name:String,
    price:String,
    Ip_address: String,
    Image: String,
    user_id: String,
})

const FavouriteModle = mongoose.model("favourite",favouriteSchema)

module.exports={FavouriteModle}