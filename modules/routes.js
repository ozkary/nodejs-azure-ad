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
    
    //authorize the routes  using passport
    if (passport){

        app.use('/login', passport.authorize);

        //route handler for the post authentication from identity provider
        app.get('/onauth', passport.login(),
            function(req,res){
                login(req,res);   
            } 
        ); 
    
      
    }
    
    //add the route for login/out handlers    
    app.get('/login', login)
    app.get('/logout', logout)

    //login
    function login (req, res){
        res.sendFile( __dirname + "/app/index.html");
    }  
    
    // logout
    function logout (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/');                
    }
 
};