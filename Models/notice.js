const mongoose = require('mongoose');
const date1 = require('date-and-time');
var noticeSchema = new mongoose.Schema({
    Id:{
        type:Number,
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
        type:Number,
        required:true
    },
    tname:{
        type:String
    },
    validity:{
        type:Date,
        required:true
    },
    validdays:{
        type:Number
    },
    branch:{
        type:String,
    },
    class:{
        type:String,
    },
    batch:{
        type:Number,
    },
    general:{
        type:Boolean
    },
    category:{
        type:String
    }


});




var notice = new mongoose.model('Notice',noticeSchema);

module.exports = { notice };