module.exports.init = function (app, __dirname, passport) {

    //secured routes
    var user =null;

    //authorize the routes
    app.use('/api/user', passport.authorize);
    app.use('/login', passport.authorize);

    //add the route handlers
    app.get('/api/user', profile)
    app.get('/login', login)

    //validate that the user profile is set on the authSession cookie
    function profile(req, resp){

        resp.json({session:req.user});    
    }

    function login (req, res){
        res.sendFile( __dirname + "/app/index.html");
    }

    //route handler for the post authentication from identity provider
    app.get('/onauth', passport.login(),
        function(req,res){
            login(req,res);   
        } 

    ); 

  
    // logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
 
};