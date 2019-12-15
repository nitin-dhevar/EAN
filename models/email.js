var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Email  = mongoose.model('Email',{
  email :{
    type:String,
    trim: true,
    default: 'null',
    unique:true,
  },
  id:{
    type:String,
    unique:true,
    trim: true    
  }

});

module.exports = {
  Email
};

