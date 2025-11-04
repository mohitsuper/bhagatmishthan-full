const { SingupModel } = require("../../Modle/User/Singup.modle")


const singup = async (req, res) => {
    try {
        const singupdata = await SingupModel.find()
        res.json({
            status: 1,
            massage: "data Recived",
            data: singupdata,
        })
    }
    catch (error) {
        res.json({
            status: 0,
            massage: "data Failed",
            data: error.message,
        })
    }
}
const singupPost = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = new SingupModel({ username, email, password })
        const responce = await data.save();
        res.send({
            status: 1,
            massage: "User SingUp post successfull",
            data: data,
        })
    }
    catch (error) {
        res.send({
            status: 0,
            massage: `User SingUp post Failled ${error.message}`,
            error: error.message
        })
    }
}

module.exports = { singupPost,singup }