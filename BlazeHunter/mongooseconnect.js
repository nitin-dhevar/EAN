const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//var url = "mongodb://dbuser:dbuser1@ds161245.mlab.com:61245/assignment_db";
var url = "mongodb://localhost/ean"
mongoose.connect(url).then((res)=>{
    console.log("Connected to db Ayush");
    
},(err)=>{
    console.log("Error occured while connecting to db");
    
});

module.export = { mongoose };
