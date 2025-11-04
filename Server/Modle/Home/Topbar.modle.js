const mongoose = require('mongoose')
const TopBarSchema = mongoose.Schema({
    title: String,
    isActive:{
        type:Boolean,
        default:true,
    }
})
const TopBarModel = mongoose.model('topbar',TopBarSchema)
module.exports=TopBarModel