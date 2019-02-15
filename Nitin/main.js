const mongoose =require('mongoose');
var mongodb = require('mongodb');
const { User}  = require(process.cwd() + '/models/user');
const bodyParser = require('body-parser');
var request = require('request');
var alias = '/nd';
module.exports = function(app){

var url="mongodb://dbuser:dbuser1@ds161245.mlab.com:61245/assignment_db";

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



   

}
