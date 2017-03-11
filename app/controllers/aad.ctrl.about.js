(function () {
    'use strict';   

    /*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.authtoken
    * azure ad authentication - about controller
    * ozkary.com
    * ver. 1.0.0
    *
    * Created By oscar garcia 
    *
    * Update/Fix History
    *   ogarcia 10/01/2016 initial implementation
    *
    */

    var app = angular.module('aad.app');       
    app.controller('aad.ctrl.about', ['aad.svc.auth','$scope',ctrlAbout]);
    
   
    /*
    * main controller to check the user auth state
    */   
    function ctrlAbout($auth, $scope) {
        var ctrl = this;
         ctrl.identity = null; 

         ctrl.login = function (redirect){
             if (!ctrl.identity){
                //get the user context
                $auth.isAuth(redirect).then(function(res){
                    ctrl.identity = res; 
                }, function(err){
                    ctrl.err = err;
                });
             }            
         }      

         ctrl.logout = function (){
              ctrl.identity = null;
              $auth.logout();
         }

         //delay on loading the security token
         $scope.$on('adal:loginSuccess', function(event, args) {
             console.log('adal:loginSuccess', args);
             ctrl.login();    
         });

         ctrl.login();       //on initial load find any user context       
    }   
})();