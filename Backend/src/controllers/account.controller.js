const Account = require('../models/account.model')
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');
exports.changeAvatar = async (req, res) => {
    const id = req.body.id
    const avatar = req.body.avatar
    try {
        const avatarUpdate = await Account.findByIdAndUpdate(
            id,
            { $set: { avatar: avatar } },
            {
                upsert: true,
                new: true,
            }
        )
        res.status(200).send(avatarUpdate);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

exports.changePassword = async (req, res) => {
    const id = req.body.id
    const prePassword = req.body.prePassword
    const newPassword = req.body.newPassword
    try {
        const account = await Account.findById(id).select('password')
        const auth = await bcrypt.compare(prePassword, account.password);
        if (auth) {
            account.password = newPassword
            account.save();
            res.status(200).send({ message: 'Đổi mật khẩu thành công' })
        }
        else {
            res.status(400).send({ message: 'Mật khẩu cũ không chính xác' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};

exports.changeInfor = async (req, res) => {
    const infor = req.body.infor
    const role = req.body.role
    const id = req.body.id
    try {
        if (role === 'Teacher') {
            const teacherUpdated = await Teacher.findByIdAndUpdate({ _id: id },
                { $set: infor },
                { $unset: false }
            )
            res.status(200).send(teacherUpdated)
        }
        else {
            const studentUpdated = await Student.findByIdAndUpdate({ _id: id },
                { $set: infor },
                { $unset: false }
            )
            res.status(200).send(studentUpdated)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}