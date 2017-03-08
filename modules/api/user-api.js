module.exports.init = function (app) {
    
    //secured api routes with no redirect
    function authorizeApi (req, res, next) {
        var auth = req.isAuthenticated();
      
        if (req.isAuthenticated()) {
            return next();
        }else{
            res.status(401).send('Not authorized');
        }
    }
   
    //authorize the routes
    app.use('/api/user', authorizeApi);
  
    //add the route handlers
    app.get('/api/user', profile)  

    //returns the user profile currently on the session
    function profile(req, resp){
        resp.json({session:req.user});    
    }
 
};