'use strict';
/*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.authtoken
    * azure ad authentication
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
 * require modules
 */
var express = require('express')
var app = express();
var session = require('express-session'); //manage the session state
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//parse json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'ozkay.com-nodejsazuread',resave:true, saveUninitialized:true,
  cookie: {
    maxAge: 1800000, 
    httpOnly: true
  }
}));


//$app implementation
var $routes = require('./modules/routes.js');
var $client = require('./modules/route-app.js');
var $error = require('./modules/error.js');
var $auth = require('./modules/auth.js');

//enable the app modules
var $users = {};                          //in-process user storage replace with redis or other storage
var $passport = $auth.init(app, $users);  //enable authorization
$routes.init(app, __dirname, $passport);  //routes
$client.init(app,express,  __dirname);    //client app routes
$error.init(app);                         //enable error handling

var APP_PORT = process.env.PORT || 8080;
var server = app.listen(APP_PORT, function () {
  var host = server.address().address
  console.log(server.address());
  var port = server.address().port

  console.log("Node.js Azure AD demo by ozkary.com listening at http://%s:%s", host, port);
  console.log("Open a browser and type the server address including the port");
  console.log("Client front end routes app/ should be anonymous");
  console.log("Server APIs routes api/ should be protected");  
})