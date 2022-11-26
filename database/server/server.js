const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require('../sqlbuild')
dotenv.config();

app.use(
    cors({ origin: "http://localhost:3000", credentials: true }),
    function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    }
);
app.use(express.json());

const data = require('./route/route')


app.use('/', data)

app.listen(5000, (res, req) => {
    console.log("connecting.....");
});
