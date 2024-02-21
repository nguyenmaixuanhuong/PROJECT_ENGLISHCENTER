const express = require('express');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const config = require('./src/config/index');
const connectDatabase = require('./src/config/database')
const route = require('./src/routes');
const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: false,
}))
app.use(fileUpload());

route(app);

async function startServer() {
    await connectDatabase();
    const PORT = config.app.port;
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}

startServer();