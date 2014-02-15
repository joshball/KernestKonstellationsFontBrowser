/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var k = require('./lib/konstellations');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var kConfig = {
    fontsDirectory: path.join(__dirname, '..', 'fonts'),
    fontsBaseRoute: '/fonts',
    glob: function(){
        return path.join(this.fontsDirectory, '*', 'index.html');
    }
};


// setup a route that will generate a page with all the fonts
app.get('/', function(request, response){
    // could override kConfig and make dynamic and setup a static path to serve the fonts
    //app.use(kConfig.fontsBaseRoute, express.static(kConfig.fontsDirectory));
    k.getFonts(kConfig)
        .then(function(kFonts){
            var locals = {title: 'Konstellation Fonts', kConfig: kConfig, kFonts: kFonts };
            response.render('index', locals );
        });
//      Handle this sometime.
//        .fail(function(err){
//            response.render({err});
//        });
});

// setup a static path to serve the fonts
app.use(kConfig.fontsBaseRoute, express.static(kConfig.fontsDirectory));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
