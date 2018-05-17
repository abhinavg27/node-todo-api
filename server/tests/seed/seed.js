const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/Todos');
const {User} = require('./../../models/Users');
const jwt = require('jsonwebtoken');
require('./../../../config/config');
var userOne = new ObjectID();
var userTwo = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'My first test data',
    _creator: userOne
},{
    _id: new ObjectID(),
    text: 'My Second test data',
    completed: true,
    completedAt: 3432432,
    _creator: userTwo
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const users = [{
    _id: userOne,
    email: 'abhinav.g27@gmail.com',
    password: 'userPass1!',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userOne , access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwo,
    email: 'abhinav.g2787@gmail.com',
    password: 'userPass2!',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userTwo , access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1,user2]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};