const mongoose =require('mongoose');
var mongodb = require('mongodb');
const { User}  = require(process.cwd() + '/models/user');
const bodyParser = require('body-parser');
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
          
         
         var user= new User({expoToken:tempexpoToken,sub:tempsub,batch:tempbatch,year:tempyear,class:tempclass,Id:tempId});
         var upsertData = user.toObject();   
         delete upsertData._id;
         User.update({sub:tempsub}, upsertData, {upsert: true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });

    });



   

}
