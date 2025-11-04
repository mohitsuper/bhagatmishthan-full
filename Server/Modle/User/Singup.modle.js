const { default: mongoose } = require("mongoose");

const SingupSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

const SingupModel = mongoose.model('singup',SingupSchema)
module.exports={SingupModel}