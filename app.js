"use strict";

var express = require('express');
var app = express();
var routes = require('./routes');

var jsonParser = require('body-parser').json;
var logger = require('morgan');

app.use(logger("dev"));
app.use(jsonParser());

app.use("/questions", routes);

//catch 404 and forward to err handler
app.use( function(req, res, next){
    var err = new Error("Not found");
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        } 
    })
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Express is running on port", port);
});
