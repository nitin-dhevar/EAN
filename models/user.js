var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var User  = mongoose.model('User',{
  expoToken :{
    type:String,
    unique : true,
    required:true,
    minlength:20,
    trim: true
  },
  sub:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  dept:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  batch:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  year:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  class:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  Id:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  }

});

module.exports = {
  User
};

