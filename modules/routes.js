"" 
module.exports.init = function (app, __dirname, passport) {
    
      var azureOAuth = 'azure_ad_oauth2';
    
    //secured routes
    var user = {};
    app.get('/api/user', home)

    function home(req, resp){
        resp.json(user);        
    }
 
};