var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Teacher  = mongoose.model('Teacher',{
  sub:{
    type:String,
    unique:true,
    trim: true    //removes whitespaces from start and end
  },
  branch:{
    type:String,
     //text is required
    trim: true    //removes whitespaces from start and end
  },
  join_year:{
    type:String,
    //required:true, //text is required
    //minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  TeacherId:{
    type:String,
    //required:true, //text is required
    //minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  fName:{
    type:String,
    //required:true, //text is required
    //minlength:1,
    trim: true  
  },
   lName:{
    type:String,
    //required:true, //text is required
    //minlength:1,
    trim: true  
  }, 
  email:{
    type:String,
    //required:true, //text is required
    //minlength:1,
    trim: true  
  }
  

});

module.exports = {
  Teacher
};

