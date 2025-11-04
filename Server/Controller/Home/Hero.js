const Image = require("../../Modle/Home/Image.modle")

const Hero =async(req,res)=>{
    console.log(req.file.filename)
    try{
        const reponce = await Image({
            image:`/upload/${req.file.filename}`
        })
        const data = await reponce.save();
        res.json({ message: "Image uploaded successfully", data });
    }
    catch(error){
        console.log("Hero Image Uploade Error:",error)
        res.json({
            status:0,
            massage:"imaged Uploade failed",
            error:error.message
        })
    }
}
module.exports={Hero}