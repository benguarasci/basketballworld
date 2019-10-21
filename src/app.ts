const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const accountRouter = require('./routes/account');
const threadsRouter = require('./routes/threads');


const app = express();

// heroku setup
let port = process.env.PORT;
if (port == null || port == "") {
    port = '8000';
}
app.listen(port);

// view engine setup
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/threads', threadsRouter)

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
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// setup database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
app.locals.db = client.db;

module.exports = app;