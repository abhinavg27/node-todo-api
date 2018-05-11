var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/Todos');
var {User} = require('./../server/models/Users');
var {ObjectID} = require('mongodb');



var id = '5af43d55b398623ae42cf55a';

if(!ObjectID.isValid(id)){
  console.log('Id provided for todos collection is not valid.');
}

//Todos Collection queries
// Todo.remove({}).then((todos) => {
//   if(!todos){
//     console.log('Unable to fetch todo');
//   }
//   console.log('Find Command on todos Collection:',todos);
// }).catch((e) => console.log(e));

Todo.findOneAndRemove({
    _id: id
}).then((todo) => {
  if(!todo){
    console.log('Unable to fetch todo');
  }
  console.log('FindOne Command on todos Collection:',todo);
}).catch((e) => console.log(e));

// Todo.findByIdAndRemove(id).then((todo) => {
//   if(!todo){
//     console.log('Unable to fetch todo');
//   }
//   console.log('Find By Id on todos Collection:',todo)
// }).catch((e) => console.log(e));