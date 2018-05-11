var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todos');
var {User} = require('./models/Users');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(result)
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
    res.send({todos})
    },(e) => {
    res.status(400).send(e);
});
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    },(e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
    var user = new User({
        email: req.body.email
    });

    user.save().then((result) => {
        res.send(result)
    },(e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    console.log('id:',req);
    var id = req.params.id;
    console.log('id:',id);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.listen(port,() => {
    console.log(`Server started at ${port} port`);
});

module.exports = {app};