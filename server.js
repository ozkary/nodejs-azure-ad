'use strict';
/*
 * require modules
 */
var express = require('express')
var app = express();
var bodyParser = require('body-parser');

//parse json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//$app implementation
var $routes = require('./modules/routes.js');
var $client = require('./modules/route-app.js');
var $error = require('./modules/error.js');
var $auth = require('./modules/auth.js');

//enable the app modules
$routes.init(app, __dirname); //routes
$client.init(app,express,  __dirname); //client app routes
$error.init(app);  //enable error handling

var APP_PORT = process.env.PORT || 8080;
var server = app.listen(APP_PORT, function () {
  var host = server.address().address
  console.log(server.address());
  var port = server.address().port

  console.log("Node.js Azure AD demo by ozkary.com listening at http://%s:%s", host, port);
  console.log("Open a browser and type the server address including the port");
})