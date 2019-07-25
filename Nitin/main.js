const mongoose =require('mongoose');
var mongodb = require('mongodb');
const { User}  = require(process.cwd() + '/models/user');
const { vUser}  = require(process.cwd() + '/models/upload');
const { Teacher } =require(process.cwd()+'/models/teacher');
const bodyParser = require('body-parser');
var request = require('request');
var alias = '/nd';
module.exports = function(app, router){

//var url="mongodb://dbuser:dbuser1@ds161245.mlab.com:61245/assignment_db";
var url = "mongodb://localhost/ean"
mongoose.connect(url)
    .then((result)=>console.log(`Connected to db `))
    .catch((err)=>console.log(err));
       app.use(bodyParser.json());
       app.use(bodyParser.urlencoded({ extended: true }));
       app.post(alias + '/addUser',(req,res)=>{
           var tempexpoToken=req.body.expoToken;
           var tempsub=req.body.sub;
           var tempbranch=req.body.branch;
           var tempbatch=req.body.batch;
           var tempyear=req.body.year;
           var tempdivision=req.body.division;
           var tempregId=req.body.regId;
           var tempfName=req.body.fName;
           var templName=req.body.lName;
           var tempemail=req.body.email;
           let status="Success";
         
        
        var user= new User({expoToken:tempexpoToken,branch:tempbranch,sub:tempsub,batch:tempbatch,year:tempyear,division:tempdivision,fName:tempfName,email:tempemail,lName:templName,regId:tempregId});
            user.save();
            res.send(status);
        });

        app.post(alias + '/updateUser',(req,res)=>{
            var tempexpoToken=req.body.expoToken;
            var tempsub=req.body.sub;
            var tempbranch=req.body.branch;
            var tempbatch=req.body.batch;
            var tempyear=req.body.year;
            var tempdivision=req.body.division;
            var tempregId=req.body.regId;
            var tempfName=req.body.fName;
            var templName=req.body.lName;
            var tempemail=req.body.email;
            
            if(tempbranch=== ""||tempbatch=== ""||tempyear=== ""||tempdivision=== "")
                return res.send("Error: Fields cannot be Empty!");
          
     
            User.update({sub:tempsub}, {$set: { expoToken:tempexpoToken,branch:tempbranch,sub:tempsub,batch:tempbatch,year:tempyear,division:tempdivision,fName:tempfName,email:tempemail,lName:templName,regId:tempregId }}, {upsert: true}, function(err){res.send("succesfully saved");})
        });
    
    app.post(alias + '/getDetails', (req, res) => {
           var tempsub=req.body.sub;
            async function getUsers(tempsub){
                const user=await User.find({ sub: tempsub }, function (err, data) {});
               console.log(user[0]);
                res.json(user[0]);
            }
            getUsers(tempsub);
        
        });
    
    app.post(alias + '/verifyUser', (req, res) => {
            var tempRegId=req.body.regId;
             async function verifyUser(tempRegId){
                 const user=await vUser.find({ enrollmentNo: tempRegId }, function (err, data) {});
                 console.log(user);
                 if(user.length===0)
                 res.status(404).end();
                 else{
                     res.json(user);
                 }
             }
             async function getUsers(tempRegId){
                const user=await User.find({ regId: tempRegId }, function (err, data) {});
                console.log(user);
                res.json(user);
            }
             
             var dataVerifySource=verifyUser(tempRegId);
             //console.log(dataVerifySource);
            // var dataToverify=getUsers(tempRegId);
         
         });

    
    
   app.post(alias + '/getUsers', (req, res) => {
            var tempregId=req.body.regId;
             async function getUsers(tempregId){
                 const user=await User.find({regId: tempregId }, function (err, data) {});
                console.log(user);
                 res.json(user);
             }
             getUsers(tempregId);
         
         });
     
     
      app.post(alias + '/addUser',(req,res)=>{
            var tempexpoToken=req.body.expoToken;
            var tempsub=req.body.sub;
            var tempbranch=req.body.branch;
            var tempbatch=req.body.batch;
            var tempyear=req.body.year;
            var tempdivision=req.body.division;
            var tempregId=req.body.regId;
            var tempfName=req.body.fName;
            var templName=req.body.lName;
            var tempemail=req.body.email;
            let status="Success";
          
         
         var user= new User({expoToken:tempexpoToken,branch:tempbranch,sub:tempsub,batch:tempbatch,year:tempyear,division:tempdivision,fName:tempfName,email:tempemail,lName:templName,regId:tempregId});
             user.save();
             res.send(status);
         });
     
      app.put(alias + '/updateUser',(req,res)=>{
             var tempexpoToken=req.body.expoToken;
             var tempsub=req.body.sub;
             var tempbranch=req.body.branch;
             var tempbatch=req.body.batch;
             var tempyear=req.body.year;
             var tempdivision=req.body.division;
             var tempregId=req.body.regId;
             var tempfName=req.body.fName;
             var templName=req.body.lName;
             var tempemail=req.body.email;
             
             if(tempbranch=== ""||tempbatch=== ""||tempyear=== ""||tempdivision=== "")
                 return res.json("Error: Fields cannot be Empty!");
           
      
             User.update({regId:tempregId}, {$set: { expoToken:tempexpoToken,branch:tempbranch,sub:tempsub,batch:tempbatch,year:tempyear,division:tempdivision,fName:tempfName,email:tempemail,lName:templName,regId:tempregId }}, {upsert: true}, function(err){res.json("succesfully saved");})
         });
     
              app.delete(alias + '/deleteUser', (req, res) => {
           var tempregId=req.body.regId;
            async function getUsers(tempregId){
               await User.deleteOne({regId: tempregId }, function (err, data) {})
            } 
            getUsers(tempregId);
            res.json("Deleted!");
});
    
     app.post(alias + '/getTeacher', (req, res) => {
            var tempTeacherId=req.body.TeacherId;
             async function getUsers(tempTeacherId){
                 const user=await Teacher.find({TeacherId: tempTeacherId }, function (err, data) {});
                console.log(user);
                 res.json(user);
             }
             getUsers(tempTeacherId);
         
         });
    
    app.delete(alias + '/deleteTeacher', (req, res) => {
            var tempTeacherId=req.body.TeacherId;
            async function getUsers(tempTeacherId){
               await Teacher.deleteOne({TeacherId: tempTeacherId }, function (err, data) {})
            } 
            getUsers(tempTeacherId);
            res.json("Deleted!");
});
     app.get(alias + '/getAllTeachers', (req, res) => {
            
             async function getUsers(){
                 const user=await Teacher.find();
                console.log(user);
                 res.json(user);
             }
             getUsers();
         
         });
    
     app.get(alias + '/getAllStudents', (req, res) => {
         
            async function getUsers(){
                const user=await User.find();
               console.log(user);
                res.json(user);
            }
            getUsers();
        
        });
    
}
