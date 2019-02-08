var alias = '/bh';
const express = require('express');
const {mongoose} = require('./mongooseconnect');
const bodyParser = require('body-parser');
const multer = require('multer');
const _ = require('lodash');
var time1 = require('time');

//****************************************************************************************************************************************** */
const {Notice} = require(process.cwd()+'/models/notice');
//****************************************************************************************************************************************** */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/files');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+"-"+file.originalname);
    }
});

var upload = multer({storage:storage});
//****************************************************************************************************************************************** */
async function validate(req){
    var data=_.pick(req.body,['title','nbody','tname','tid','validity','branch','year','div','batch','general','category']);
    // var sample= JSON.parse(req.body.branch);
    // for(let i of sample){
    //     data.branch.push(i);
    // }
    await Notice.count({}, function( err, count){
        console.log( "Number of notices:", count );
        data.Id = (count + 1).toString();
    });

    data.timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });

    if(req.file == undefined)
        data.filelink = "default";
    else
        data.filelink = req.file.path;
    console.log("in function"+data);
    //fetching teacher name form database is left
    return data;
}
//****************************************************************************************************************************************** */
//API's
//scheduling remove notice after every 24 hours
module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/public',express.static('public'));

    app.get('/test',(req,res)=>{
        res.send({test:"Done"});
    });

    
    app.post(alias + '/addnotice',upload.single('noticefile'),async (req,res)=>{
        console.log("addnotice called");

        var validdata = await validate(req);
        
        var newnotice = new Notice(validdata);
        newnotice.save().then((doc)=>{
            res.send(doc);
            notice = {
                title:doc.title,
                tname:doc.tname,
                tbody:doc.tbody
            }
            sendNoticeToUser(notice);
            console.log(validdata);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });        
    });

    app.post(alias + '/getnotices',(req,res)=>{
        console.log(req);
        
        Notice.find({"branch":req.body.branch,"year":req.body.year}).then((docs)=>{
            console.log(docs);
            res.send(docs);
        },(err)=>{
            console.log(err);
            res.status(400).send();
        });



    });

    //for sending push notification hierarchy is general,branch,class,batch
    // function sendNoticeToUser(notice){
    //     (async () => {
    //       tokens = []
    //       User.find({},(error, users) => {
    //           if(notice.general==true){
    //             for (let user of users) {
    //                 tokens.push(user.expoToken);
    //               }
    //               console.log(tokens);
    //               expoN.sendNotifiaction(tokens,notice);
    //             }

    //             else if(notice.batch!=='N'){
    //                 for (let user of users) {
    //                     if(user.batch===notice.batch&&user.year===notice.year&&user.branch===notice.branch&&user.div===notice.div)
    //                         tokens.push(user.expoToken);
    //                   }
    //                   console.log(tokens);
    //                   expoN.sendNotifiaction(tokens,notice);
    //             }
    //             else if(notice.div!=='N'){
    //                 for (let user of users) {
    //                     if(user.year===notice.year&&user.branch===notice.branch&&user.div===notice.div)
    //                         tokens.push(user.expoToken);
    //                   }
    //                   console.log(tokens);
    //                   expoN.sendNotifiaction(tokens,notice);
    //             }
    //             else if(notice.year!=='N'){
    //                 for (let user of users) {
    //                     if(user.year===notice.year&&user.branch===notice.branch)
    //                         tokens.push(user.expoToken);
    //                   }
    //                   console.log(tokens);
    //                   expoN.sendNotifiaction(tokens,notice);
    //             }
    //             else{
    //                 for (let user of users) {
    //                     if(user.branch===notice.branch)
    //                         tokens.push(user.expoToken);
    //                   }
    //                   console.log(tokens);
    //                   expoN.sendNotifiaction(tokens,notice);
    //             }

    //         })
          
    //     })();
    //   }
}


//https://stackoverflow.com/questions/51301301/how-would-i-get-a-function-to-run-every-24-hours-on-a-server

/*
Comp
TE
Comp TE 2
Comp TE 2 2
All
*/