var express = require('express');
var consolidate = require('consolidate');
var app  = express();

const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const cookieparser = require('cookie-parser');
const database = require('./database');
const User = require('./models').User;
const Question = require('./models').Question;
const QResponse = require('./models').QResponse;
const Problem = require('./models').Problem;
const PResponse = require('./models').PResponse;

const passport = require('./config/passport');
app.use(cookieparser('secret-cookie'));
app.use(session({ resave: false, saveUninitialized: false, secret: 'secret-cookie' }));
app.use(flash());
app.use(passport.initialize());

const routes ='./routes/auth-routes';
const google = './routes/google';

app.use(require(routes));
app.use(require(google));

app.set('views', './templates');
app.engine('html', consolidate.nunjucks);
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({extended: true}));

var user = function  retrieveSignedInUser(req, res, next){
	req.user = req.session.currentUser;
	next();
}
app.use(user);

app.get('/', function(req, res){
	res.render('index.html', {
	});
});

app.get('/home', requireSignedIn, function(req, res){
	res.render('home.html', {
	});
});

app.get('/submitQ', requireSignedIn, function(req, res){
	res.render('ask.html', {
	});
});

app.get('/submitP', requireSignedIn, function(req, res){
	res.render('problem.html', {
	});
});


app.post('/submitQ', requireSignedIn, function(req, res){
		var name = req.user;
		var content = req.body.content;
		User.findOne({ where: { name: name}}).then(function(user){
			console.log("emailll " + user.email);
			return Question.create({
			user_email: user.email,
			content: content, 
		}).then(function(){
			return res.redirect('/home');
		});
	});	
});

app.post('/submitP', requireSignedIn, function(req, res){
	var name = req.user;
	var content = req.body.content;
	var category = req.body.category;
	var publicity = req.body.publicity;
	User.findOne({where: { name: name}}).then(function(user){
		return Problem.create({
			user_email: user.email,
			content: content, 
			category: category,
			publicity: publicity
	}).then(function(){
		req.flash('statusMessage', 'Your problem has been sent to the Student Council!');
		return res.redirect('/home');
	});
	});	
});

app.post('/submitQR', requireSignedIn, function(req, res){
	var name = req.user;
	var content = req.body.content;
	User.findOne({where: { name: name}}).then(function(user){
		Question.findOne({where: {user_email: user.mail}}).then(function(userQuestion){
			return Problem.create({
			user_email: user.email,
			q_id: userQuestion.id,
			content: content
		}).then(function(){
			req.flash('statusMessage', 'Response has been sent!');
			return res.redirect('/home');
		});
		});
	});
			
});

function requireSignedIn(req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    next();
}

app.listen(3000, function(request, response){
	console.log('Server Listening on port 3000');
});
