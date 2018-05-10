var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/Todos');
var {User} = require('./../server/models/Users');
var {ObjectID} = require('mongodb');



var id = '5af3ed9b388acb3d5cd30ad2';
var id_user ='5af2bce8ca28fa3ae0d883c5';

if(!ObjectID.isValid(id_user)){
    console.log('Id provided for user collection is not valid.');
}

if(!ObjectID.isValid(id)){
  console.log('Id provided for todos collection is not valid.');
}

//User collection queries
User.find({
    _id : id_user
}).then((users) => {
    console.log('Find Command on user Collection:',users);
}).catch((e) => console.log(e));

User.findOne({
    _id: id_user
}).then((user) => {
    console.log('FindOne Command user Collection:',user);
}).catch((e) => console.log(e));

User.findById(id_user).then((user) => console.log('Find By Id on user Collection:',user)).catch((e) => console.log(e));

//Todos Collection queries
Todo.find({
    _id : id
}).then((todos) => {
  if(!todos){
    console.log('Unable to fetch todo');
  }
  console.log('Find Command on todos Collection:',todos);
}).catch((e) => console.log(e));

Todo.findOne({
    _id: id
}).then((todo) => {
  if(!todo){
    console.log('Unable to fetch todo');
  }
  console.log('FindOne Command on todos Collection:',todo);
}).catch((e) => console.log(e));

Todo.findById(id).then((todo) => {
  if(!todo){
    console.log('Unable to fetch todo');
  }
  console.log('Find By Id on todos Collection:',todo)
}).catch((e) => console.log(e));