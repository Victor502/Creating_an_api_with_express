"use strict";
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
    console.error("Connection error:", err);
});

db.once("open", function(){
    console.log("DB connected");
    // All DB communication goes here
    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: String,
        size: String,
        color: String,
        mass: Number,
        name: String
    });
    
    var Animal = mongoose.model("Animal", AnimalSchema);
    
    
    var elephant = new Animal({
        type: "elepant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawerance"
    });
    
    elephant.save(function(err){
        if(err) console.log("Save failed error:", err);
        else console.log("Saved");
        db.close(function(){
            console.log("Conection closed");
        });
    });
    
});