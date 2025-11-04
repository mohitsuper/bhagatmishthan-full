const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  isActive:{
    type:Boolean,
    default:true
  }
});

const CategoryImage = mongoose.model("category", CategorySchema);

module.exports = { CategoryImage };
