var crypto = require('crypto');
var alias = '/cc';
var adminPass = "Amey1234";
module.exports = function(app, router){

    app.get('/cc/notice', function (req, res) {

        res.render('notice');
    });

    app.get('/cc/checkPassword', (req,res) => {
      var hash = crypto.createHash('sha256')
        hash.update('hello', 'utf-8' ).digest('hex'))
    });

}
