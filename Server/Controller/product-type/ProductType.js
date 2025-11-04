const { ProductTypeModle } = require("../../Modle/product-type/ProductType");

const ProductType = async (req,res)=>{
     try{
        const responce = await ProductTypeModle.find()
        console.log(responce)
        res.send({
            status:1, 
            message:"product type get successfull",
            data:responce
        })
    }
    catch(error){
        res.send({
            status:0,
            message:"product type get failed",
            error:error.message
        })
    }
}

const GetProductType = async (req,res)=>{
     try{
        const responce = await ProductTypeModle.find({isActive:true})
        console.log(responce)
        res.send({
            status:1, 
            message:"product type get successfull",
            data:responce
        })
    }
    catch(error){
        res.send({
            status:0,
            message:"product type get failed",
            error:error.message
        })
    }
}

const PostProductType = async(req,res)=>{
    const {name} = req.body;
    try{
        const responce = new ProductTypeModle({name})
        res.send({
            status:1,
            message:"product type post successfull",
            data:responce
        })
        await responce.save()
    }
    catch(error){
        res.send({
            status:0,
            message:"product type post failed",
            error:error.message
        })
    }
}

const DeleteProductType = async(req,res)=>{
    const {id} = req.params;
    try{
        const responce = await ProductTypeModle.deleteOne({_id:id})
        res.send({
            status:1,
            message:"product type row deleted successfull",
            data:responce
        })
    }
    catch(error){
        res.send({
            status:0,
            message:"product type row deleted failed",
            error:error.message
        })
    }
}

const UpdateProductType = async (req,res)=>{
    const {id,name,isActive} = req.body;
    try{
        const ProductTypeDataupdate = await ProductTypeModle.updateOne(
            {_id:id},
            {$set:{name,isActive}}
        )
        res.send({
            status:1,
            massage:"ProductType data update successfull",
            data:ProductTypeDataupdate,
        })
    }
    catch(error){
        res.send({
            status:0,
            massage:`ProductType data update failed ${error.message}`,
            data:error.message,
        })
    }
}
module.exports={PostProductType,ProductType,DeleteProductType,UpdateProductType,GetProductType}