var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var spreadSheet = require('edit-google-spreadsheet');
var sheetConfig = require('./config/sheet-config.js');

require('./config/model');

var routes = require('./routes/index');
var users = require('./routes/users');

mongoose = require('mongoose');
User = mongoose.model('User');

var cors = require('cors');
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // not 
app.use(cookieParser());
app.use(cookieSession({keys: ['ntucep10th-sercet']}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(allowCrossDomain);
app.use(cors());

app.use(function(req, res, next) {
  spreadSheet.load(sheetConfig, function(err, _sheet) {
    if(err) return console.error(err);
    routes.sheet = _sheet;
    next();
  });
});

app.use('/', routes);
app.use('/users', users);

// start passport

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), 'localhost', function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
