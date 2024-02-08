require("dotenv").config();

const app = require("./src/app.js");
app(process.env.PORT, process.env.HOST);
