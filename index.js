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
const multer = require('multer');
const moment = require('moment');
app.use('/pictures', express.static('./uploads'));
var upload = multer({dest: './uploads'});

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

app.get('/answerQ', function(req, res){
	Question.findAll({
		where: {resolved:'f'}
	}).then(function(question) {
		res.render('answerQ.html', {
			question:question
		});
	});
});

app.get('/answerP', requireSignedIn, function(req, res){
	const email = req.session.currentUser;
	User.findOne( {where: {email:email}}).then(function(user) {
		console.log("role : "+user.role);
		if(user.role === 'admin') {
			res.render('answerP.html', {
				user:user
			});
		}
	});
});

app.get('/home', requireSignedIn, function(req, res){
	const email = req.session.currentUser;
	var name = req.user;
	User.findOne( {where: {email:email}}).then(function(user) {
		if(user.role === 'admin') {
			console.log("admin");
			res.render('sc.html', {
				user:user
			});
		} else {
			console.log("not admin");
			res.render('home.html', {
				user:user
			});
		}
	});
});

app.get('/submitQ', requireSignedIn, function(req, res){
	const email = req.session.currentUser;
	User.findOne({ where: { email: email } }).then(function(user) {
		console.log("name is: "+user.name);
		res.render('ask.html', {
			user: user
		});
	});
});

app.get('/submitP', requireSignedIn, function(req, res){
	const email = req.session.currentUser;
	User.findOne({ where: { email: email } }).then(function(user) {
		console.log("name is: "+user.name);
		res.render('problem.html', {
			user: user
		});
	});
});

app.post('/submitQ', requireSignedIn, function(req, res){
	const email = req.session.currentUser;
	var content = req.body.content;

	if(content) {
		Question.create({
				user_email: email,
				content: content,
		}).then(function(){
			req.flash('statusMessage', 'Question was submitted!');
			return res.redirect('/submitQ');
		});
	}
});

app.post('/submitP', requireSignedIn, function(req, res){
	var email = req.user;
	var content = req.body.content;
	var category = req.body.category;
	var publicity = req.body.publicity;
	if(publicity != undefined){
		publicity = true;
	}
	else{
		publicity = false;
	}
	return Problem.create({
		user_email: email,
		content: content,
		category: category,
		publicity: publicity
	}).then(function(){
		req.flash('statusMessage', 'Your problem has been sent to the Student Council!');
		return res.redirect('/submitP');
	});
});


app.post('/replyQ', requireSignedIn, upload.array('photos', 10), function(req, res) {
	var email = req.user;
	var content = req.body.content;
	var resolved = req.body.resolved;
	Question.findOne({where: {user_email: email}}).then(function(userQuestion){
		return userQuestion.update({
			resolved: resolved
		}).then(function(){
			return QResponse.create({
				user_email: email,
				q_id: userQuestion.id,
				content: content,
				image: req.files
			}).then(function(){
				req.flash('statusMessage', 'Response has been sent!');
				return res.redirect('/home');
			});
		});
	});
});


app.post('/replyP', requireSignedIn, upload.array('photos', 10), function(req, res) {
	var email = req.user;
	var content = req.body.content;
	Problem.findOne({where: {user_email: email}}).then(function(userProblem){
		return userProblem.update({
			resolved: resolved
		}).then(function(){
			return PResponse.create({
				user_email: email,
				p_id: userProblem.id,
				content: content,
				image: req.files
			}).then(function(){
				req.flash('statusMessage', 'Response has been sent!');
				return res.redirect('/home');
			});
		});
	});
});
//get for questions
//get for problems
	//filter by category
//get questions and qresponses with same email and q_id
//get problems and presponses qith sane email and p_id

app.get('/getQ', function(req, res) {
	var time1, time2;
	Question.findOne({where: {user_email:req.user}}).then(function(user) {
		console.log(user.timestamp);
		time1 = user.timestamp;
	}).then(function() {
		console.log(moment().format());
		time2 = moment().format();
	}).then(function() {
		if(time1<time2) {
			console.log("time1 < time2");
		} else {
			console.log("time2 > time1");
		}
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
