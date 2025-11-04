const TopBarModel = require("../../Modle/Home/Topbar.modle");

const TopBar =async (req,res)=>{
    try{
        const topbar = await TopBarModel.find({}) 
        res.json({
            status:1,
            massage:"data Recived",
            data:topbar,
        })   
    }
    catch(error){
        res.json({
            status:0,
            message:error.message,
            error,
        })
    }
}

const TopBarGetWeb =async (req,res)=>{
    try{
        const topbar = await TopBarModel.find({isActive:true}) 
        res.json({
            status:1,
            massage:"data Recived",
            data:topbar,
        })   
    }
    catch(error){
        res.json({
            status:0,
            message:error.message,
            error,
        })
    }
}
const TopbarPost = async (req,res)=>{
    const {title} = req.body;
    try{
        const TopbarData = new TopBarModel({title})
        await TopbarData.save()
        res.send({
            status:1,
            massage:"topbar data post successfull",
            data:TopbarData,
        })
    }
    catch(error){
        res.send({
            status:0,
            massage:`topbar data post failed ${error.massage}`,
            data:TopbarData,
        })
    }
}

const TopbarDelete = async (req,res)=>{
    try{
        const {id} = req.params;
        const responce = await TopBarModel.deleteOne({_id:id})
        res.send({
            states:1,
            massage:"topbar data delete successfull",
            data:responce
        })
    }
    catch(error){
        res.send({
            states:0,
            massage:"topbar data delete failed",
            data:error.message
        })
    }
}

const TopbarUpdate = async (req,res)=>{
    const {_id,title,isActive} = req.body;
    try{
        const TopbarDataupdate = await TopBarModel.findByIdAndUpdate(
            {_id},
            {$set:{title,isActive}}
        )
        res.send({
            status:1,
            massage:"topbar data update successfull",
            data:TopbarDataupdate,
        })
    }
    catch(error){
        res.send({
            status:0,
            massage:`topbar data update failed ${error.message}`,
            data:error.message,
        })
    }
}

module.exports={TopBar,TopbarPost,TopbarDelete,TopbarUpdate,TopBarGetWeb}