// const MongoClient = require('mongodb').MongoClient
var {MongoClient, ObjectID} = require('mongodb');
// var user = {name: 'abhinav', age: 25};
// var {name} = user;
// console.log(name);

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

  if(err){
    return console.log('Error while connecting to MongoDb',err);
  }

  console.log('Connected to MongoDb Server');

  //Delete Many
  db.collection('Todos').deleteMany({text: 'walk the dog'}).then((result) => {
    console.log('Todos detelemany', result);
  });

  //Delete Many
  db.collection('Todos').deleteOne({text: 'walk the dog'}).then((result) => {
    console.log('Todos detelemany', result);
  });

  //Delete Many
  db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    console.log('Todos detelemany', result);
  });

  db.close();
});
