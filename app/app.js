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

    var app = angular.module('app', ['ngRoute']);   
    app.factory('app.svc.auth', ['$q', '$http',svcAuth]);
    app.controller('app.ctrl.app', ['app.svc.auth',ctrlApp]);
    
    function svcAuth($q, $http) {

        //simple claims container for demo purposes
        var claims = { 'name': 'Demo', 'app': true };
        var context = null;

        function hasClaim(key) {
            var result = false;
            if (context){
                result = context.claims[key] === true;
            }
             
            return result;
        }

        function auth(user) {
            user.error = null;
            context = null;
            try {
                var key = window.btoa(user.email + user.password);

                if (key === $appSettings.token) {
                    context = user;
                    context.claims = claims;
                    return true;
                }
            }
            catch (e) {
            }
            user.error = true;
            return false;
        }
        
        //simple validation of the user context
        //calling api/user
        function isAuth(){
             var deferred = $q.defer();
             var url = 'api/user';
            
            $http.get(url).then(function(res){
                var user = res.data['session'];            
                   
                deferred.resolve(user);
            },function(err){
                deferred.reject(err);        
            })

            return deferred.promise;
        }

        return {
            hasClaim: hasClaim,
            auth: auth,
            isAuth:isAuth
        };
    }
    
    /*
    * main controller to check the user auth state
    */   
    function ctrlApp($auth) {
        var ctrl = this;
         ctrl.identity = null; 

         ctrl.login = function (){
            //get the user context
            $auth.isAuth().then(function(res){
                ctrl.identity = res; 
            }, function(err){
                ctrl.err = err;
            });
         }
        
        //loadContext();
         
    }   
})();