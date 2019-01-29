var alias = '/bh';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const _ = require('lodash');
const {Notice} = require(process.cwd()+'/Models/notice.js')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/files');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+"-"+file.originalname);
    }
});

var upload = multer({storage:storage});
var idcount = 0;
var validate = (req)=>{
    var data=_.pick(req.body,['title','nbody','filelink','tid','tname','validity','branch','class','batch','general','category']);
    // Notice.find().count().then((c)=>{
    //     data.Id = c + 1;
    // });
    data.Id = idcount+1;
    data.timestamp = new Date().toLocaleString();
    if(req.file == undefined)
         data.filelink = "default";
    else
         data.filelink = req.file.path;

    var now = new Date();
    var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    console.log('UTC (in ms): ' + utc_now.getTime())
    
    data.validdays = parseInt((data.validity-utc_now)/3600*1000*24);
    // Teacher.find({name:data.tid}).then((doc)=>{
    //     data.tname = doc.name;
    // },(err)=>{
    //     console.log('TID invalid')
    // });
    //console.log(data);
    
    return data;
}

module.exports = function(app){
    app.get('/test',(req,res)=>{
        res.send({test:"Done"});
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/public',express.static('public'));

    app.post(alias + '/addnotice',upload.single('noticefile'),(req,res)=>{
        //console.log(req.file);
        //console.log(req.body.validity);
        
        var validatedata = validate(req);
        // var newnotice = new Notice();
        // newnotice.save(validatedata).then((doc)=>{
        //     res.send(doc);
        // },(err)=>{
        //     res.status(400).send();
        // });
        console.log(validatedata);
        
    });
}
