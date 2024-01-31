const crypto = require('crypto');
const Account = require('../models/account.model')
exports.generateCode = (number) => {
    // Sinh 3 byte ngẫu nhiên
    const randomBytes = crypto.randomBytes(number / 2);
    // Chuyển đổi thành một số nguyên
    const randomSixDigitNumber = parseInt(randomBytes.toString('hex'), 16);
    // Lấy 6 số cuối cùng và thêm các số 0 đằng trước nếu cần
    const formattedNumber = String(randomSixDigitNumber).slice(-number).padStart(number, '0');
    return formattedNumber;
}

exports.deactivateAccount = async (id) => {
    try {
        const account = await Account.findOneAndUpdate(
            { _id: id },
            { isActive: false },
            {
                upsert: true,
                new: true,
            },
        )
        return account;
    } 
    catch (error) {
        console.log(error);
        return null;
    }

}
exports.activateAccount = async (id) => {
    try {
        const account = await Account.findOneAndUpdate(
            { _id: id },
            { isActive: true },
            {
                upsert: false,
                new: true,
            },
        )
        return account;
    } 
    catch (error) {
        console.log(error);
        return null;
    }

}