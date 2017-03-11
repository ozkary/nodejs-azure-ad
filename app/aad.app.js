(function () {
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

    var app = angular.module('aad.app', ['ngRoute','AdalAngular']);   

    app.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    //initialize client side access
    var config = {cliendId:"59cf67aa-c3d6-429a-8551-52eb106d895c",tenant:'ozkarylive.onmicrosoft.com'};

    //initialize the app access
    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/', 
            tenant: config.tenant,
            clientId: config.cliendId,
            //extraQueryParameter: 'nux=1',                   
        },$httpProvider);
   
    }]);
         
})();
