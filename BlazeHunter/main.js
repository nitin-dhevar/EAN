var alias = '/bh';

module.exports = function(app){
    app.get('/test',(req,res)=>{
        res.send({test:"Done"});
    });
}
