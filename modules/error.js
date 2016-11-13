module.exports.init = function (app) {

  //set the global error handler
  app.use(function (err, req, res, next) {
        
    if (res.headersSent) {
      return next(err);
    }
    
    if (err){
      console.log('error handler',err)
      res.status(500);
      res.send( { error: err });
    }

    next();
    
  });

}
