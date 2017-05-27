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

app.set('views', './templates');
app.engine('html', consolidate.nunjucks);
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(request, response){	
	response.render('index.html', {
	});
});


app.listen(3000, function(request, response){
	console.log('Server Listening');
});