"use strict";

var express = require('express');
var router = express.Router();

// GET /questions
// Route for questions collection
router.get("/", function(req, res){
    res.json({response: "You sent me a GET response"});
});

// POST /questions
// Route for creating questions
router.post("/", function(req, res){
    res.json({
        response: "You sent me a POST response",
        body: req.body
    });
});


// GET /questions/:qID
// Route for specific questions
router.get("/:qID", function(req, res){
    res.json({
        response: "You sent me a GET response for ID" + req.params.qID
             });
});


// POST /questions/:qID/answers
// Route for creating an answer
router.post("/:qID/answers", function(req, res){
    res.json({
        response: "You sent me a POST response to /answers",
        questionId: req.params.qID,
        body: req.body
    });
});

// PUT /questions/:id/answers/:aID
// Edit a specific answer
router.put("/:qID/answers/:aID",  function(req, res){
    res.json({
        response: "You sent me a PUT response to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

// DELETE /questions/:id/answers/:aID
// Delete a specific answer
router.delete("/:qID/answers/:aID",  function(req, res){
    res.json({
        response: "You sent me a DELETED response to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});


// POST /questions/:id/answers/:aID/vote-up
// POST /questions/:id/answers/:aID/vote-down
// Vote a specific answer
router.post("/:qID/answers/:aID/vote-:dir",function(req, res, next){
        if(req.params.dir.search(/^(up|down)$/) === -1) {
            var err = new Error("NOt found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    }, function(req, res){
        res.json({
        response: "You sent me a POST response to /vote-" + req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});



module.exports = router;