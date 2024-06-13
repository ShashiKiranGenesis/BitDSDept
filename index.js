//Imports from node modules
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const cors = require("cors");

// ALL Sub Routes
const authRoutes = require("./routes/authRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const userRoutes = require("./routes/userRoutes");
const designationRoutes = require("./routes/designationRoutes");
const courseRoutes = require("./routes/coursesRoutes");
const tleaRoutes = require("./routes/TLEA/TLEA");
const cepdaRoutes = require("./routes/CEPDA/CEPDA");

//Imports from server files
const { HOUR, DAY } = require("./helpers/time");
const routeNotFoundResponse = require("./helpers/response/routeNotFoundResponse");

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
app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET', 'OPTIONS'], // Allow these methods
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'], // Allow these headers
        credentials: true, // Allow credentials (cookies)
    }));

//////////////////////////////////////////////
////////////All the auth Routes///////////////
//////////////////////////////////////////////

app.use("/auth", authRoutes);

app.use("/employees", employeesRoutes);

app.use("/user", userRoutes);

app.use("/designations", designationRoutes);

app.use("/courses", courseRoutes);

app.use("/tlea", tleaRoutes);

app.use("/cepda", cepdaRoutes);

app.use("/", function (req, res) {
    res.send(routeNotFoundResponse(req, res));
});

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//Server Turns ON HERE

app.listen(port, function (req, res) {
    console.log("PASS    CODE: SERV_ST_01");
});