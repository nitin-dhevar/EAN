var crypto = require('crypto');
var alias = '/cc';
var adminPass = "Amey1234";
module.exports = function(app, router){
    app.use(bodyParser.json());
    app.get('/cc/notice', function (req, res) {

        res.render('notice');
    });

    app.get('/cc/checkPassword', (req,res) => {
      var hash = crypto.createHash('sha256')
        hash.update('hello', 'utf-8' ).digest('hex')
    });

    app.post(alias + '/admin',(req,res) => {
        var s1 = req.body
        if (user == s1.username && password == s1.password){
            res.send(400);
        }
        res.send(401);
    } )
}
