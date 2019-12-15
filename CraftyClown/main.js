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
const {Email} = require(process.cwd()+'/models/email');

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

    app.post(alias + '/addEmail', (req, res) => {
        var email = req.body.email
        var id = req.body.id
        var password = req.body.password
        if(password == mpg){
            Email.create({email: email, id : id}, function(err, doc){
                if(!err){
                    res.status(200).send("Email Added")
                }
                else{
                    res.sendStatus(500).send("Internal Server Error")
                }
            })
        }
        else{
            res.status(401).send("Password is wrong")
        }
    })
    app.post(alias + '/getEmail', (req, res) => {
        var id = req.body.id
        Email.findOne({id: id}, function(err, doc){
            if(err){
                res.status(500).send("Internal Server Error")
            }
            else{
                if(doc == null){
                    res.status(400).send({code :1 , msg : "Id not found", email : "none"})
                }
                else{
                    res.status(400).send({code :2 , msg : "Email Found", email : doc.email})
                }
            }
        })
    })
    routerAPI.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/cc", routerAPI);

   

}
