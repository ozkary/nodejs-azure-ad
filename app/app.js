(function () {
    'use strict';   

    var app = angular.module('app', ['ngRoute','ngCookies']);   
    app.factory('app.svc.auth', [ svcAuth]);
    app.controller('app.ctrl.app', ['$cookies',ctrlApp]);
    
    function svcAuth() {

        //simple claims container for demo purposes
        var claims = { 'name': 'Demo', 'app': true };
        var context = null;

        function hasClaim(key) {
            var result = false;
            if (context){
                result = context.claims[key] === true;//todo  handle multiple claims
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

        return {
            hasClaim: hasClaim,
            auth: auth
        };
    }
    
    /*
    *  controller area
    */   

    function ctrlApp($cookies) {
        var ctrl = this;
         ctrl.identity = null; 
         var auth = $cookies.get('AppServiceAuthSession');
         if(auth !== null){
            ctrl.identity = auth;
         }
         console.log(auth); 
    }   
})();