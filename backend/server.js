const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({
    origin: true,
    credentials: true,
}));

//logging middleware
let demoLogger = (req, res, next) => { 
    let method = req.method;
    let url = req.url;
    
    let log = `${method}:${url}`;
    console.log(log);
    next();
};

app.use(demoLogger);

//Links
app.use(`/api/${process.env.VERSION}/admin`, require("./AdminService/admin.router.js"));
app.use(`/api/${process.env.VERSION}/center`, require("./CenterService/center.router.js"));
app.use(`/api/${process.env.VERSION}/service`, require("./OpenService/openservice.router.js"));
app.use(`/api/${process.env.VERSION}/student`, require("./StudentService/student.router.js"));

app.use("*", (req, res) => res.status(404).json({ message: "link not found" }));

module.exports = app;