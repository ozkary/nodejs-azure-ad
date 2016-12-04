var passport = require('passport');
var oauthStrategy = require('passport-azure-ad-oauth2').Strategy;

module.exports.init = function (app, $users) {
    var azureOAuth = 'azure_ad_oauth2';
    //var appServiceAuth = 'appServiceAuthSession';

    var strategy = new oauthStrategy({
                        clientID: '2fead93d-50c3-4efa-8136-fcaf6ebfa813',               //app id
                        clientSecret: 'adKZqN9It5z4OpOi9/ycsvH5NcdN7BQgD3dlO4mvoS0=',   //your app key                     
                        callbackURL: 'https://nodeaad.azurewebsites.net/onauth',        //add the return url with a route to handle                                         
                    },function (accessToken, refresh_token, params, profile, done) {
                        //decodes the token and sends the information to the user profile handler                        
                        var context = profile;                                              
                        done(null,context);
                    });

    //Azure resource you're requesting access
    //prevents the Resource identifier is not provided error
    strategy.tokenParams = function(options) {
        return { resource: 'https://graph.windows.net' };
    };
    
    //user profile handler to parse the data and create the user profile
    strategy.userProfile = function(accessToken, done) {       
        var profile = {};
        try {
            var tokenBase64 = accessToken.split('.')[1];
            var tokenBinary = new Buffer(tokenBase64, 'base64');
            var tokenAscii = tokenBinary.toString('ascii');
            var tokenObj = JSON.parse(tokenAscii);     

            //custom user profile      
            profile.id=tokenObj.upn;
            profile.email = tokenObj.upn;     //upn is the email on AD
            profile.displayname = tokenObj.given_name + ' ' + tokenObj.family_name;                    
            console.log('user profile',profile);
            done(null, profile);
        } catch (ex) {
            console.log("Unable to parse oauth2 token from WAAD.");
            done(ex, null);
        }
    };

    //writes to local session
    passport.serializeUser(function (user, done) {          
        $users[user.id] = user;  
        done(null, user.id);
    });

    //gets from local session
    passport.deserializeUser(function (id, done) {   
        var user = $users[id];  
        done(null, user);        
    });

    //passport authorization filter
    passport.authorize = function authorize (req, res, next) {
        var auth = req.isAuthenticated();
        
        if (req.isAuthenticated() || req.user) {
            return next();
        }

         //authenticate the user
         passport.login()(req, res, next);         
    }

    //login extension method to validate the login state
    passport.login = function(){
        return passport.authenticate(azureOAuth,{failureRedirect:'/',failureFlash:true});
    }
    
    //initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    //set the passport strategy to use
    passport.use(strategy);
    
    return passport;
}