(function () {
    'use strict';   

    /*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.aad
    * azure ad authentication - service implementation
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
    app.factory('aad.svc.auth', ['$q', 'adalAuthenticationService',svcAuth]);    
    
    function svcAuth($q, adalService) {

        //simple claims container for demo purposes
        var claims = { };
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
        
        //using ad service to login or return user context       
        function isAuth(redirect){
             var deferred = $q.defer();

             var user = adalService.userInfo;

             if (!user || !user.isAuthenticated){
                 
                 if (redirect){
                    adalService.login();
                 }
                 
             }else{
                  var profile  = user.profile;
                  profile.email = profile.upn;
                  profile.displayname = profile.name;
                  deferred.resolve(user.profile);
             }

            return deferred.promise;
        }

        //logout the current session
        function logout(){
            adalService.logOut();
        }

        return {
            hasClaim: hasClaim,
            auth: auth,
            isAuth:isAuth,
            logout:logout
        };
    }      
})();