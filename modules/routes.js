/*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.passport
    * azure ad authentication - server app routes
    * ozkary.com
    * ver. 1.0.0
    *
    * Created By oscar garcia 
    *
    * Update/Fix History
    *   ogarcia 10/01/2016 initial implementation
    *
    */
module.exports.init = function (app, __dirname, passport) {
    
    //authorize the routes   
    app.use('/login', passport.authorize);

    //add the route handlers    
    app.get('/login', login)

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