//Imports from node modules
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");

//Imports from server files
const authRoutes = require("./routes/authRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const userRoutes = require("./routes/userRoutes");

const { HOUR, DAY } = require("./helpers/time");

//Configuring the Backend middlewares and dependencies
const sessionOpts = {
    secret: process.env.SERV_SIGN,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: HOUR
    }
};

dotenv.config();

const app = express();
const port = process.env.SERV_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOpts));

//////////////////////////////////////////////
////////////All the auth Routes///////////////
//////////////////////////////////////////////

app.use("/auth", authRoutes);

app.use("/employees", employeesRoutes);

app.use("/user", userRoutes);

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//Server Turns ON HERE

app.listen(port, function (req, res) {
    console.log("PASS    CODE: SERV_ST_01");
});