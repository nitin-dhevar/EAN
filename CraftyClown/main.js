var crypto = require('crypto');
const routerAPI = require('express').Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var alias = '/cc';
var adminPass = "Amey1234";
var user = "admin";
var password = "password";
var mpg = "admin"
module.exports = function(app, router){

    
    app.use(bodyParser.json());
    app.get('/cc/notice', function (req, res) {

        res.render('notice');
    });

    app.get('/cc/checkPassword', (req,res) => {
      var hash = crypto.createHash('sha256')
        hash.update('hello', 'utf-8' ).digest('hex')
    });

    app.post(alias + '/adminCredential',(req,res) => {
        var s1 = req.body
        console.log(s1);
        console.log(user);
        
        if (user == s1.username){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(401);
        }
        
    } )

    app.post(alias + '/masterPassword', (req, res) => {
        //var mp = req.body.mastPasswd;
        //console.log(req.body);
        var s1 = req.body
        if(s1.password == mpg){
          res.sendStatus(200);
        }
        else{
            res.sendStatus(401);
        }
        
      })
    routerAPI.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/cc", routerAPI);

}
