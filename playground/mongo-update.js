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

  //Update the document.
  // db.collection('Todos').findOneAndUpdate({
  //     _id: new ObjectID('5af1950d502063fab31610a9')
  // }, {
  //     $set: {
  //       completed: false
  //     }
  // }, false).then((result) => {
  //   console.log('Result', result);
  // });

  db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5af18a551e109f59647e8c52')
  }, {
      $set: {
        Name: 'Abhinav'
      },
      $inc: {
        age: 1
      }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log('Result', result);
  });


//db.close();
});
