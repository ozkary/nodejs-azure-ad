module.exports.init = function (app, __dirname, passport) {

    //secured routes
    var user =null;
    app.get('/api/user', profile)

    //validate that the user profile is set on the authSession cookie
    function profile(req, resp){

        var authSession = req.cookies['AppServiceAuthSession'];
        if (authSession != null){
            user = authSession;
        }
        resp.json({session:user});        
    }
 
};