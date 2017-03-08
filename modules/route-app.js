/*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.passport
    * azure ad authentication - client app routes for static content
    * ozkary.com
    * ver. 1.0.0
    *
    * Created By oscar garcia 
    *
    * Update/Fix History
    *   ogarcia 10/01/2016 initial implementation
    *
    */
/*
 * required modules
 * use npm init to download all the dependencies
 */
module.exports.init = function (app,express,__dirname) {
    
     //set the static routes
    app.use('/app',express.static('app'));
    app.use('/views',express.static('views'));
    
    
    //default entry point
    app.get('/', index)

    //returns the default page
    function index(req, res){
        res.sendFile( __dirname + "/app/");
    }
 
};