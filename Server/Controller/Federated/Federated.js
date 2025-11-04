const { FavouriteModle } = require("../../Modle/Federated/Federated")


const Favourite = async (req, res) => {
    try {
        const responce = await FavouriteModle.find()
        res.json({
            status: 1,
            massage: "data Recived",
            data: responce,
        })
    }
    catch (error) {
        res.json({
            status: 0,
            message: error.message,
            error,
        })
    }
}

const PostFavourite = async (req, res) => {
    try {
        const {
            name,
            price,
            Ip_address,
            Image,
            user_id,
        } = req.body;



        const data = new FavouriteModle({
            name,
            price,
            Ip_address,
            Image,
            user_id,
        })
        await data.save()
        res.send({
            status: 1,
            massage: "favourite api data post successfull",
            data,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            massage: `favourite api data post failed ${error.message}`,
            error,
        })
    }
}


module.exports = { Favourite, PostFavourite }