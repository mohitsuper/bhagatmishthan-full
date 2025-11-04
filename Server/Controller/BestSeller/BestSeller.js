import { BestSellerModel } from "../../Modle/BestSeller/BestSeller"

const PostBestSeller = async (req,res)=>{
    try{
        const {title,descrtion,weight,stock,price,ingredients} = req.body;
        const data = new BestSellerModel({title,descrtion,weight,stock,price,ingredients})
        const responce = await data.save();
        res.send({
            status:1,
            messaged:"Best Seller Product Success full add",
            responce
        })
    }
    catch(error){
        res.send({
            status:0,
            messaged:"Best Seller Product Successfull failed",
            error:error.message
        })
    }
}


const GetBestSeller = (req,res)=>{
    res.send("this")
}
module.exports={PostBestSeller}