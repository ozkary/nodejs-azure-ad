module.exports.init = function (app) {
    
    var user = null;
    
    //add the route handlers
    app.get('/api/user', profile)  

    //returns the user profile currently on the session
    function profile(req, resp){
        var authSession = req.cookies['AppServiceAuthSession'];
        if (authSession != null) {
            user = "authenticated";
        }
        resp.json({ session: user });   
    }
 
};