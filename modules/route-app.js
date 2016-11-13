module.exports.init = function (app,express,__dirname) {
    
     //set the static routes
    app.use('/app',express.static('app'));
    app.use('/views',express.static('views'));
    
    
    //default entry point
    app.get('/', index)

    function index(req, res){
        res.sendFile( __dirname + "/app/");
    }
 
};