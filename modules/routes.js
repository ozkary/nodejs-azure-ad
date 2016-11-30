module.exports.init = function (app, __dirname, passport) {

    //secured routes
    var user =null;

    //authorize the routes
    app.use('/api/user', passport.authorize);

    //add the route handlers
    app.get('/api/user', profile)

    //validate that the user profile is set on the authSession cookie
    function profile(req, resp){

        resp.json({session:req.user});    

/*
        var authSession = req.cookies['AppServiceAuthSession'];
        if (authSession != null){
            user = authSession;
        }
        resp.json({session:user});       
        */ 
    }

    //route handler for the post authentication from identity provider
    app.post('/onauth', passport.login(),
        function(req, res){
            res.sendFile( __dirname + "/app/index.html");
        }
    ); 

  
    // logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
 
};