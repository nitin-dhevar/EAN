var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var vUser  = mongoose.model('vUser',{
  srNo: String,
  enrollmentNo: String,
  rollNo: String,
  Name: String,
  BirthDate: String,
  phoneNo: String,
  studentMobile: String,
  Class: String,
  fatherName: String,
  fatherMobile: String,
  fatherEmail: String,
  studentEmail: String,

});

module.exports = {
  vUser
};
