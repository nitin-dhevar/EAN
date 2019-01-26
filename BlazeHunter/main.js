var alias = '/bh';
const express = require('express');

module.exports = function(app){
    app.get('/test',(req,res)=>{
        res.send({test:"Done"});
    });
}
