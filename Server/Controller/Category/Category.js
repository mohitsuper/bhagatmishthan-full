const path = require("path");
const { CategoryImage } = require("../../Modle/Category/CategoryModel")

const fs = require('fs')
const Category = async (req, res) => {
    try {
        const responce = await CategoryImage.find();
        res.send({
            status: 1,
            message: "category data get successfull",
            data: responce,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "category data get failed",
            data: error.message,
        })
    }
}

const GetCategory = async (req, res) => {
    try {
        const responce = await CategoryImage.find({isActive:true});
        res.send({
            status: 1,
            message: "category data get successfull",
            data: responce,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "category data get failed",
            data: error.message,
        })
    }
}
const PostCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file.filename;
        const data = new CategoryImage({
            name,
            image: `http://localhost:3000/upload/category/${image}`
        })
        const responce = await data.save()
        res.send({
            status: 1,
            message: "Category add Successfull",
            data: responce
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "Category add failed",
            data: error.message
        })
    }
}

const CategoryDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const oldImage = await CategoryImage.findById({ _id: id })
        const responce = await CategoryImage.deleteOne({ _id: id })
        const oldImageName = oldImage.image.split('/').pop()
        const pathName = path.join('upload/category', oldImageName)
        if (fs.existsSync(pathName)) {
            fs.unlinkSync(pathName)
        }
        res.send({
            status: 1,
            message: "category delete successfull",
            data: responce
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "category delete failed",
            error: error.message
        })
    }
}

const CategoryUpdate = async (req, res) => {
    const {id} = req.params;
    const { name, isActive } = req.body;
    const image = req.file && req.file.filename;
    let UpdateObj;
    try {
        if(image){
            const oldImage = await CategoryImage.findById(id)
            if(oldImage && oldImage.image){
                const oldImageName = oldImage.image.split('/').pop()
                const pathName = path.join('upload/category', oldImageName)
                if (fs.existsSync(pathName)) {
                    fs.unlinkSync(pathName)
                }
            }
        }
        if(image){
            UpdateObj.image = `http://localhost:3000/upload/category/${image}`;
        }
        UpdateObj = {isActive,name}
        const responce = await CategoryImage.updateOne(
            { _id: id },
            {
                $set: UpdateObj
            }
        )

        res.send({
            status: 1,
            message: "category update successfull",
            data: responce
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "category update failed",
            error: error.message
        })
    }
}
module.exports = { PostCategory, Category, CategoryDelete, CategoryUpdate,GetCategory }