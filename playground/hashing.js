var {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '1234abc!'

// bcrypt.genSalt(10, (err, salt) =>{
//     bcrypt.hash(password, salt, (err, hash) =>{
//         console.log(hash);
//     });
// });

var hashedPasword = '$2a$10$iSOIDyBzBfGf6EiMNnhuAeH.GscMcUNByCE1aYNtRch4VQMN5XreK';

bcrypt.compare(password, hashedPasword, (err, result) => {
    console.log(result);
});

// var data = {
//     id: 5
// }
//
// var token = jwt.sign(data, '1234abc');
//
// var decode = jwt.verify(token, '1234abc');
// console.log('Decoded Data:', decode);

// var message = 'I am user number 3';
//
// var hashData = SHA256(message).toString();
//
// var data = {
//     id: 4
// }
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'Somesecret').toString()
// }
//
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var rehash = SHA256(JSON.stringify(token.data) + 'Somesecret').toString();
//
// if(token.hash === rehash){
//     console.log('User is autheticated');
// }else{
//     console.log('User is not authenticated');
// }