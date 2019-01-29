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
           var tempbatch=req.body.batch;
           var tempyear=req.body.year;
           var tempclass=req.body.class;
           var tempId=req.body.Id;
         
        
        var user= new User({expoToken:tempexpoToken,sub:tempsub,batch:tempbatch,year:tempyear,class:tempclass,Id:tempId});
            user.save();
        });

    
 


    
    }



   


