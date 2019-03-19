const express = require('express');
const jwt = require('./Auth');
port = process.env.PORT || 3000 ;
// var checkPost = [];
const bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var mpg = "asdlkj"
var cors = require('cors');
var hbs  = require('hbs');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());
app.use(express.static('public'))
router.use(function (req, res, next) {
    jwt.verifyJWT(req.header('x-auth-token'))
      .then((decodedToken) =>
      {
        var dateNow = new Date();

        // if(decodedToken.exp < dateNow.getTime()/1000)
        //   {
        //     res.status(401)
        //       .json({message: "Token Expired" })
        //   }
        //   else{
        //       res.locals.userid = decodedToken.data;
        //     next()
        //   }
          res.locals.userid = decodedToken.data;
          next()

      })
      .catch((err) =>
      {
        res.status(400)
          .json({message: "Invalid auth token provided."})
      })

  })
app.set('view engine', 'hbs');
app.get('/main', function (req, res) {
    res.render('maintenance');
});
app.get('/', function (req, res) {
  res.render('notice2');
});
app.get('/notice', function (req, res) {
  res.render('login');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getToken" , (req,res) => {
    var data = "amey"
    var token = jwt.createJWT(data)
    res.send(token)

  });
require('./CraftyClown/main')(app, router);
require('./Nitin/main')(app, router);
require('./BlazeHunter/main')(app, router);
router.get("/check", (req,res) => {
    res.send("hello , " + res.locals.userid)

  });


app.use('/', router);
server.listen(port);
