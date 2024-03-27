const Register = require("../models/register.model");

exports.addRegister = async (req, res) => {
    try {
        const register = req.body.infor
        const newRegister = new Register(register)
        await newRegister.save();
        res.status(200).send(newRegister)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.listRegister = async (req, res) => {
    try {
        const listRegister = await Register.find().populate('course');
        res.status(200).send(listRegister);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


exports.confirmContact = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await Register.findByIdAndUpdate(id,
            { isContacted: true }
        );
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}