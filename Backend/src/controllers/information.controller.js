const Information = require("../models/information.model")
const Class = require("../models/class.model")
const { deleteFile } = require("../Service/removeFileInCloud.js")
exports.create = async (req, res) => {
    const infor = req.body
    try {
        const information = await new Information(infor)
        await information.save();
        const classCurrent = await Class.findById(infor.class)
        classCurrent.informations.push(information._id)
        await classCurrent.save();
        res.status(200).send(information);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

exports.removeFileInCloud = async (req, res) => {
    const publicId = req.query.publicId
    try {
        const result = await deleteFile(publicId);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};

exports.listInformation = async (req, res) => {
    const id = req.query.id
    try {
        const listInformation = await Information.find({ class: id }).populate({
            path: 'teacher',
            populate: {
                path: 'account',
                select: '-password'
            },
        }).sort({ _id: -1 }); 
        ;
        res.status(200).send(listInformation)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.deleteInformation = async (req, res) => {
    const id = req.query.id
    const classId = req.query.classid
    try {
        const news = await Information.findById(id).select('documents');
        const classCurrent = await Class.findById(classId)
        await Information.findByIdAndDelete(id);
        classCurrent.informations =  classCurrent.informations.filter((item)=> item!= id)
        await classCurrent.save();
        if(news.documents != []) {
            news.documents.forEach(async document => {
                await deleteFile(document.publicId)
            });
        }
        res.status(200).send('Successfully deleted')
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
};

exports.updateInformation = async (req, res) => {
    const id = req.body.id;
    const inforUpdate = req.body.inforUpdate;
    const news = await Information.findById(id).select('documents');
    if(news.documents != []) {
        news.documents.forEach(async document => {
            await deleteFile(document.publicId)
        });
    }
    try {
        const inforUpdated = await Information.findOneAndUpdate(
            { _id:id },
            { $set: inforUpdate },
            {
                upsert: false,
                new: true,
            },
        )
        res.status(200).send(inforUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};