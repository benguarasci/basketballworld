"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyparser = require("body-parser");
var indexRouter = require("./routes");
var profileRouter = require("./routes/profile");
var threadsRouter = require("./routes/threads");
var app = express();
// heroku setup
var port = process.env.PORT;
if (port === null || port === "") {
    port = "8000";
}
app.listen(port);
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
// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// catch 404 and forward to error handler
// @ts-ignore
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
// @ts-ignore
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
