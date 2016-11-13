module.exports.init = function (app, __dirname, passport) {

    //secured routes
    var user = {};
    app.get('/api/user', profile)

    function profile(req, resp){

        var authSession = req.cookies['AppServiceAuthSession'];
        resp.json({session:authSession});        
    }
 
};