const dotenv = require('dotenv');
dotenv.config();
const config = {
    app: {
        port: process.env.PORT
    },

    db: {
        uri: process.env.MONGODB_URI
    },
    account_admin:{
        username: process.env.U_ADMIN,
        password:  process.env.P_ADMIN
    }
}

module.exports = config