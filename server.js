const express = require('express');
port = process.env.PORT || 3000 ;
// var checkPost = [];
var app = express();
var cors = require('cors');
var hbs  = require('hbs');
app.use(cors());
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render('maintenance');
});
require('./CraftyClown/main')(app);
require('./Nitin/main')(app);
require('./BlazeHunter/main')(app);

var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(port);
