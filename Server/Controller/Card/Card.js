const { CardModle } = require("../../Modle/Card/Card")


const Card = async (req, res) => {
    try {
        const responce = await CardModle.find()
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

const PostCard = async (req, res) => {
    try {
        const {
            name,
            price,
            Ip_address,
            Image,
            user_id,
        } = req.body;



        const data = new CardModle({
            name,
            price,
            Ip_address,
            Image,
            user_id,
        })
        await data.save()
        res.send({
            status: 1,
            massage: "card api data post successfull",
            data,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            massage: `card api data post failed ${error.message}`,
            error,
        })
    }
}


const DeleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const responce = await CardModle.deleteOne({ _id: id })
        res.send({
            status: 1,
            massage: "card data or delete",
            data: responce,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            massage: "card data or delete failed",
            data: error.message,
        })
    }
}

module.exports = { PostCard, Card,DeleteCard }