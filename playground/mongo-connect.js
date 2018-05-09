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

  db.collection('Users').insertOne({
    Name: 'Abhinav',
    age: 30
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops,undefined, 2));
  });

  //db.close();
});
