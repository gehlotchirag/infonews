
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/newsreader');

var db = monk('mongodb://admin:developer@oceanic.mongohq.com:10020/newsreader');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.userlist(db));
app.get('/users', user.list);
app.get('/helloworld', routes.helloworld);
app.get('/userlist', routes.userlist(db));
app.get('/getUser', routes.getUser(db));
app.get('/del/:id/:txt', routes.del(db));
app.post('/high/:id/:txt', routes.high(db));
app.get('/adcom/:id/:hid/:txt', routes.adcom(db));
app.get('/findcom/:id/:hid', routes.findcom(db));
app.get('/gethigh/:id', routes.gethigh(db));



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
