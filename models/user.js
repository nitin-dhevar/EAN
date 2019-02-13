var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var User  = mongoose.model('User',{
  expoToken :{
    type:String,
    minlength:1,
    trim: true,
    default: 'null'
  },
  sub:{
    type:String,
    required:true, //text is required
    minlength:1,
    unique:true,
    trim: true    //removes whitespaces from start and end
  },
  branch:{
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
  division:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  regId:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  fName:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true  
  },
   lName:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true  
  }, 
  email:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true  
  }
  

});

module.exports = {
  User
};

