var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todos');
var {User} = require('./models/Users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(result)
    },(e) => {
        res.send(e);
    });
});

app.post('/users', (req, res) => {
    var user = new User({
        email: req.body.email
    });

    user.save().then((result) => {
        res.send(result)
    },(e) => {
        res.send(e);
    });
});


app.listen(3000,() => {
    console.log('Server started at 3000 port');
})