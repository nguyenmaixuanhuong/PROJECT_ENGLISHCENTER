const Information = require("../models/information.model")
const Class = require("../models/class.model")
const Account = require("../models/account.model")
const Teacher = require("../models/teacher.model")
const Student = require("../models/student.model")
const { deleteFile } = require("../Service/removeFileInCloud.js")

const addnotification = async function (idclass, action, role, idinfor, iduser) {
    try {
        const classCurrent = await Class.findById(idclass).populate('students').populate('teachers')
        if (classCurrent) {
            if (action === 'Nhận xét') {
                if (role === 'Student') {
                    const orthers = classCurrent.students.filter(student => student._id != iduser)
                    orthers.forEach(async (student) => {
                        const notification = {
                            information: idinfor,
                            action: action,
                            role: role,
                            user: iduser
                        }
                        const account = await Account.findOneAndUpdate(
                            { _id: student.account },
                            { $push: { notifications: notification } },
                            { new: true }
                        );
                        return account;
                    })

                    classCurrent.teachers.forEach(async (teacher) => {
                        const notification = {
                            information: idinfor,
                            action: action,
                            role: role,
                            user: iduser
                        }
                        const account = await Account.findOneAndUpdate(
                            { _id: teacher.account },
                            { $push: { notifications: notification } },
                            { new: true }
                        );
                        return account;
                    })

                }
                else {
                    const orthers = classCurrent.teachers.filter(teacher => teacher._id != iduser)
                    orthers.forEach(async (teacher) => {
                        const notification = {
                            information: idinfor,
                            action: action,
                            role: role,
                            user: iduser
                        }
                        const account = await Account.findOneAndUpdate(
                            { _id: teacher.account },
                            { $push: { notifications: notification } },
                            { new: true }
                        );
                        return account;
                    })

                    classCurrent.students.forEach(async (student) => {
                        const notification = {
                            information: idinfor,
                            action: action,
                            role: role,
                            user: iduser
                        }
                        const account = await Account.findOneAndUpdate(
                            { _id: student.account },
                            { $push: { notifications: notification } },
                            { new: true }
                        );
                        return account;
                    })
                }
            }
            else {
                classCurrent.students.forEach(async (student) => {
                    const notification = {
                        information: idinfor,
                        action: action,
                        role: role,
                        user: iduser
                    }
                    const account = await Account.findOneAndUpdate(
                        { _id: student.account },
                        { $push: { notifications: notification } },
                        { new: true }
                    );
                    return account;
                })
            }
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create = async (req, res) => {
    const infor = req.body
    try {
        const information = await new Information(infor)
        await information.save();
        const classCurrent = await Class.findById(infor.class)
        classCurrent.informations.push(information._id)
        await classCurrent.save();
        addnotification(infor.class, "Đăng tin", 'Teacher', information._id, infor.teacher);
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
        const listInformation = await Information.find({ class: id })
            .populate({
                path: 'teacher',
                populate: {
                    path: 'account',
                    select: '-password'
                },
            })
            .populate({
                path: 'comments.account',
                select: '-password',
            })
            .populate({
                path: 'comments.user',
                select: 'fullName',
            })
            .sort({ _id: -1 });
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
        classCurrent.informations = classCurrent.informations.filter((item) => item != id)
        await classCurrent.save();
        if (news.documents != []) {
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
    if (news.documents != []) {
        news.documents.forEach(async document => {
            await deleteFile(document.publicId)
        });
    }
    try {
        const inforUpdated = await Information.findOneAndUpdate(
            { _id: id },
            { $set: inforUpdate },
            {
                upsert: false,
                new: true,
            },
        )
        addnotification(inforUpdated.class, "Chỉnh sửa", 'Teacher', inforUpdated._id, inforUpdated.teacher);
        res.status(200).send(inforUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.addComment = async (req, res) => {
    const comment = req.body.comment
    const idInfor = req.body.id
    try {
        const information = await Information.findById(idInfor)
        information.comments.push(comment)
        addnotification(information.class, "Nhận xét", comment.userType, idInfor, comment.user);

        await information.save().then((result) => {
            res.status(200).send(result);
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.deleteComment = async (req, res) => {
    const id = req.query.id
    try {
        const result = await Information.findOneAndUpdate(
            { 'comments._id': id },
            { $pull: { comments: { _id: id } } },
            { new: true }
        );

        if (!result) {
            console.log('Không tìm thấy document hoặc comment để xóa');
            return;
        }
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.listNotifications = async (req, res) => {
    const idAccount = req.query.id;
    try {
        const notifications = await Account.findById(idAccount).select('notifications').populate({
            path: 'notifications.information',
            populate: 'class',
            select: 'className',
        })
            .populate({
                path: 'notifications.user',
                populate: {
                    path: 'account',
                    select: 'avatar',
                },
                select: 'fullName',
            })
            .sort({ 'notifications.time': 1 });
        const listNotification = notifications.notifications.sort((a, b) => b.time - a.time);
        res.status(200).send(listNotification);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.checkedNotify = async (req, res) => {
    const idAccount = req.query.idAccount;
    const idNotify = req.query.idNotify;
    try {
        const account = await Account.findOneAndUpdate(
            { _id: idAccount, 'notifications._id': idNotify }, // Điều kiện tìm kiếm
            { $set: { 'notifications.$.isChecked': true } }, // Dữ liệu cần cập nhật
            { new: true } // Trả về  bản ghi đã cập nhật
        );
        res.status(200).send(account);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}