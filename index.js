var express = require('express');
var consolidate = require('consolidate');
var app  = express();

const bodyparser = require('body-parser');
const database = require('./database');
const User = require('./models').User;
const Question = require('./models').Question;
const QResponse = require('./models').QResponse;
const Problem = require('./models').Problem;
const PResponse = require('./models').PResponse;

const routes = './routes/auth-routes'; 
const google = './routes/google';

// app.use(require(routes));
// app.use(require(google));

app.set('views', './templates');
app.engine('html', consolidate.nunjucks);
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({extended: true}));

var user = function retrieveSignedInUser(req, res, next) {
	// req.user = req.session.currentUser;
	next();
}

app.use(user);

app.get('/', function(request, response){	
	response.render('index.html', {
	});
});

function requireSignedIn(req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    next();
}

app.listen(3000, function(request, response){
	console.log('Server Listening');
});