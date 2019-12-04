const createError = require("http-errors");
import express = require("express");
import path = require("path");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import bodyparser = require("body-parser");
const indexRouter = require("./routes");
const profileRouter = require("./routes/profile");
const threadsRouter = require("./routes/threads");
const shoesRouter = require("./routes/shoes");
const adminRouter = require("./routes/admin");
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Database connection exports
export let database: any, threadsCol: any, usersCol: any, shoesCol: any, postsCol: any;
// URI for our database connection
const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test";

// Connects to the database once at app startup
app.listen(8001, () => {
    MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (error: any, client: any) => {
        if(error) {
            throw error;
        }
        database = client.db("bbworld");
        threadsCol = database.collection("threads");
        postsCol = database.collection("posts");
        usersCol = database.collection("users");
        shoesCol = database.collection("shoes");
        console.log("Connected to `" + "bbworld" + "`!");
    });
});

// view engine setup
app.set("../views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("SECRET_GOES_HERE"));
app.use(express.static(path.join(__dirname, "../public")));

// router setup
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/threads", threadsRouter);
app.use("/shoes", shoesRouter);
app.use("/admin", adminRouter);

// bodyparser setup
app.use(bodyparser.urlencoded( {extended: true} ));
app.use(bodyparser.json());

// catch 404 and forward to error handler
// @ts-ignore
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// @ts-ignore
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
