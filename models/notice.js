const mongoose = require('mongoose');
const date1 = require('date-and-time');
//if same notice is to be sent to multiple classes or branches or batches just include array in batch,class and branch
//if facing difficuly just include options of batches for a particular branch and particular class 
var noticeSchema = new mongoose.Schema({
    Id:{
        type:String,
        unique:true
    },
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    nbody:{
        type:String,
        required:true,
    },
    timestamp:{
        type:String,
    },
    filelink:{
        type:String
    },
    tid:{
        type:String,
        required:true
    },
    tname:{
        type:String
    },
    validity:{
        type:String,
        required:true
    },
    general:{
        type:Boolean
    },
    branch:[String],
    year:{
        type:String,
    },
    div:{
        type:String
    },
    batch:{
        type:String,
    },

    category:{
        type:String
    }


});




var Notice = new mongoose.model('Notice',noticeSchema);

module.exports = { Notice };