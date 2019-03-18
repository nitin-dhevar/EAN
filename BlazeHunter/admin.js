const bodyParser = require('body-parser');
const {Notice} = require(process.cwd()+'/models/notice');
const alias = '/bh';

module.exports = function(app,mongoose,upload){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get(alias+'/teacher',(req,res)=>{
        res.status(200).send({key:"okay"});
    });

    app.post(alias+'/teacher',(req,res)=>{
       var id = req.body.tid;
        Notice.find({tid:id}).sort({date:-1}).then((docs)=>{
            res.send(docs);
        },(err)=>{
            console.log(err);
            res.status(404).send();            
        });
    });

    app.delete(alias+'/teacher',(req,res)=>{
        console.log(req.body);
        
        var idd = req.body.id1;
        console.log(idd);
        
        Notice.findOneAndDelete({_id:idd}).then((doc)=>{
            console.log(doc);
            res.status(200).send();
            
        }).catch((err)=>{
            console.log("Error Delete");
            console.log(err);
            
            res.status(400).send();
            
        });
    });


    app.post(alias+'/uploadcsv',upload.single('csvfile'),(req,res)=>{
        console.log(req.body);
        res.status(200).send();
    });



//************************************************************************************************************************************************ */
    app.get(alias+'/teachernotice',(req,res)=>{
        Notice.find().then((docs)=>{
            res.send(docs);
        });
    });
}
