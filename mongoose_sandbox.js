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
        type:  {type: String, default: "goldfish"},
        size:  String,
        color: {type: String, default: "golden"},
        mass:  {type: Number, default: 0.007},
        name:  {type: String, default: "Angela"}
    });
    
    AnimalSchema.pre("save", function(next){
        if(this.mass >= 100) {
            this.size = "Big";
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = "Medium";
        } else {
            this.size = "Small";
        }
        next();
    });
    
    AnimalSchema.statics.findSize = function(size, callback){
        //This == animal
        return his.find({size: size}, callback);
    };
    
    AnimalSchema.methods.findSameColor = function(callback) {
        //this == document
        return this.model("Animal").find({color: this.color}, callback);
    };
    
    var Animal = mongoose.model("Animal", AnimalSchema);
    
    
    var elephant = new Animal({
        type: "elepant",
        color: "gray",
        mass: 6000,
        name: "Lawerance"
    });
    
    var animal = new Animal({}); //Goldfish
    
    var whale = new Animal({
        type: "whale",
        mass: 190500,
        name: "Fig"
    });
    
    var animalData = [
      {
          type: "mouse",
          color: "gray",
          mass: 0.035,
          name: "Marvin"
      },
        {
            type: "nutria",
            color: "brown",
            mass: 6.35,
            name: "Gretchen"
        },
        {
            type: "wolf",
            color: "gray",
            mass: 45,
            name: "Iris"
        },
        {
            type: "nutria",
            color: "brown",
            mass: 6.35,
            name: "Gretchen"
        },
        elephant,
        animal,
        whale
        
    ];
    
    Animal.remove({}, function(err){
        if (err) console.error(err);
       Animal.create(animalData, function(err, animals){
            if (err) console.error(err);
            Animal.findOne({type: "elephant"},function(err, elephant){
                elephant.findSameColor(function(err, aniamls){
                    if (err) console.error(err);
                    animals.forEach(function(animal){
                    console.log(aniaml.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.");
                    });
                db.close(function(){
                    console.log("DB Conection closed");
                    });
                });
           });
       }); 
    });
});