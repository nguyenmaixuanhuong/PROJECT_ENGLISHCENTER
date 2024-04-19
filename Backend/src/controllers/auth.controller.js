const { model } = require('mongoose')
const Account = require('../models/account.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');

exports.createToken = (account) => {
    return jwt.sign({ account }, `${config.token_secret}`, { expiresIn: 3 * 24 * 60 * 60 })
}

exports.login = async (req, res) => {
    const { username, password } = req.body.account
    try {
        const user = await Account.findOne({ username: username })
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            
            if (auth) {           
                const token = this.createToken(user._id)
                let userInfor;
                if (user.role === 'Student') {
                    userInfor = await Student.findOne({ account: user._id }).populate({
                        path: 'account',
                        select:'-password',
                        populate:'notifications.information'
                    })
                }
                else {
                    userInfor = await Teacher.findOne({ account: user._id }).populate({
                        path: 'account',
                        select:'-password',
                        populate:'notifications.information'
                    })
                }
                res.header('Authorization', `Bearer ${token}`);
                res.status(200).send({token:token, infor: userInfor });
            }
            else {
                res.status(400).send('Username hoặc mật khẩu không chính xác')
            }
        }
        else {
            res.status(400).send('Username hoặc mật khẩu không chính xác')

        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}

