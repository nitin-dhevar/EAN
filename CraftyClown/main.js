var alias = '/cc';

module.exports = function(app, router){

    app.get('/cc/notice', function (req, res) {
        
        res.render('notice');
    });
    
}
