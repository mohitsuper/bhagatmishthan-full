const { HeroImage } = require("../../Modle/HeroBanner/HeroBanner");
const path = require('path')
const fs = require('fs')
const HeroBanner = async (req, res) => {
    try {
        const responce = await HeroImage.find()
        res.send({
            status: 1,
            message: "Hero Banner Image Get Successfully",
            data: responce,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "Hero Banner Image Get Failed",
            error: error.message,
        })
    }
}
const GetHeroBanner = async (req, res) => {
    try {
        const responce = await HeroImage.find({isActive:true})
        res.send({
            status: 1,
            message: "Hero Banner Image Get Successfully",
            data: responce,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "Hero Banner Image Get Failed",
            error: error.message,
        })
    }
}
const PostHeroBanner = (req, res) => {
    try {
        const data = new HeroImage({
            image: `http://localhost:3000/upload/Hero/${req.file.filename}`
        })
        data.save()
        res.send({
            status: 1,
            message: "Hero Banner Image Upload Successfully",
            data
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "Hero Banner Image Upload Failed",
            error: error.message,
        })
    }
}


const HeroBannerDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const imageDelte = await HeroImage.findById(id)
        const data = await HeroImage.deleteOne({ _id: id })
        const imageRealName = imageDelte.image.split('/')[5];
        const imagePath = path.join('upload/hero', imageRealName)
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
            console.log("delted in upload")
        }
        else {
            console.log("delted uplode in hero failed")
        }
        res.send({
            status: 1,
            message: "Hero Banner Image Delete Successfully",
            data
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: "Hero Banner Image Delete Failed",
            error: error.message,
        })
    }
}


const HeroBannerUpdate = async (req, res) => {
    try {
        const { id, isActive } = req.body;
        let imageUrl;
        if(req.file){
            const image = req.file.filename;
            const UpdateImageFind = await HeroImage.findById(id)
            const updateImageName = UpdateImageFind.image.split('/')[5];
            const pathName = path.join('upload/hero', updateImageName)
            if (fs.existsSync(pathName)) {
                fs.unlinkSync(pathName)
                console.log("old image delete")
            }
            imageUrl = `http://localhost:3000/upload/Hero/${image}`;
        }

        const updateHeroObj = {};
        if (imageUrl) {
            updateHeroObj.image = imageUrl;
        }
        if(typeof isActive !== "undefined") updateHeroObj.isActive = isActive;
        const imageUpdate = await HeroImage.updateOne(
            { _id: id },
            {
                $set: updateHeroObj
            }
        )
        res.send({
            status: 1,
            message: "update banner image successfull",
            data: imageUpdate,
        })
    }
    catch (error) {
        console.log(error.message)
        res.send({
            status: 0,
            message: "update banner image failed",
            error: error.message
        })
    }


}


module.exports = { PostHeroBanner, HeroBanner, HeroBannerDelete, HeroBannerUpdate,GetHeroBanner }