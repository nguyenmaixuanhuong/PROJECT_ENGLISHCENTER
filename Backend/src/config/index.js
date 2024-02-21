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
    },
    cloud:{
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        preset_name: process.env.PRESET_NAME
    }
}

module.exports = config