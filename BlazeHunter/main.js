var alias = '/bh';
const express = require('express');
const {mongoose} = require('./mongooseconnect');
const bodyParser = require('body-parser');
const multer = require('multer');
const _ = require('lodash');
const fs = require('fs');
const expoN = require(process.cwd() + '/notify.js');
const wc = require('which-country');
process.env.TZ = 'Asia/Calcutta';
//****************************************************************************************************************************************** */
const {Notice} = require(process.cwd()+'/models/notice');
//****************************************************************************************************************************************** */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/files');
    },
    filename:function(req,file,cb){
        let n1 = file.originalname.split('.');
        var tt = req.body.tname.split(" ").join('_');
        newname = tt + "."+n1[n1.length-1];
        cb(null,new Date().toISOString()+"-"+newname);

    }
});

var upload = multer({storage:storage});
//****************************************************************************************************************************************** */
function validate(req){
    var data=_.pick(req.body,['title','nbody','tname','tid','validity','scope','category']);

    data.category = data.category.toLowerCase();

    if(req.file == undefined)
        data.filelink = "public/files/sample.webp";
    else
        data.filelink = req.file.path;

    return data;
}
//****************************************************************************************************************************************** */
//API's
//scheduling remove notice after every 24 hours
module.exports = function(app, router){
    const admin = require('./admin')(app,mongoose);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/public',express.static('public'));

    app.get('/test',(req,res)=>{
        res.send({test:"Done"});
    });

    
    app.post(alias + '/addnotice',upload.single('noticefile'),(req,res)=>{
        console.log(req.body);

        var validdata = validate(req);
        var newnotice = new Notice(validdata);
    
        var s1 = JSON.parse(req.body.batches);
        for(let i of s1){
            newnotice.batches.push(i);
        }
        // newnotice.date1  = new Date().toLocaleDateString('en-Us',{
        //     timeZone:'Asia/Calcutta'
        // })
        newnotice.date1 = new Date();
        newnotice.timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
        
      

        newnotice.save().then((doc)=>{
            res.send(doc);
            notice = {
                title:doc.title,
                tname:doc.tname,
                tbody:doc.tbody,
                date1:doc.date1
            }
            sendNoticeToUser(notice);
            console.log(validdata);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });        
    });

    app.post(alias + '/getnotices', (req,res)=>{
        console.log(req.body);
        
        Notice.find({batches:req.body.batch,category:req.body.category},{batches:0}).sort({date1:-1}).then(async (docs)=>{
            res.send(docs);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });



    });
    app.post(alias + '/getassignments',(req,res)=>{
        console.log(req.body);
        
        Notice.find({batches:req.body.batch,category:req.body.category},{batches:0}).then((docs)=>{
            var rev = [];
            var i = docs.length-1;
            while(i>-1){
                rev.push(docs[i]);
                i--;
            }
            console.log(docs);
            res.send(rev);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });



    });
    app.post(alias + '/getexams',(req,res)=>{
        console.log(req.body);
        
        Notice.find({batches:req.body.batch,category:req.body.category},{batches:0}).then((docs)=>{
            var rev = [];
            var i = docs.length-1;
            while(i>-1){
                rev.push(docs[i]);
                i--;
            }
            console.log(docs);
            res.send(rev);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });



    });

    app.get(alias+'/test',(req,res)=>{
        var d = {
            time:new Date().toLocaleTimeString(),
            date:new Date().toLocaleDateString(),
        }
        res.send(d);
    });

    function sendNoticeToUser(notice){
        (async () => {
          tokens = []
          User.find({},(error, users) => {
                for (let user of users) {
                   notice.batches.forEach((b)=>{
                        if(user.batch==b){
                            if(user.expoToken!=="null")
                                tokens.push(user.expoToken.substring());
                        }
                    })
                  }
                  console.log(tokens);
                  expoN.sendNotifiaction(tokens,notice);
            })
        //tokens = ["Xgt987G-tFWDcWjftr5yWv"];
            expoN.sendNotifiaction(tokens,notice);
        })();
      }
}


//https://stackoverflow.com/questions/51301301/how-would-i-get-a-function-to-run-every-24-hours-on-a-server

