const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
var {app} = require('./../server');
var {Todo} = require('./../models/Todos');
var {User} = require('./../models/Users');
beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('Should call /todos', (done)=>{
        var text = 'Adding text from server tests scripts';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            }).end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should not enter the todos if call with empty string', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end( (err, res) => {
            if(err)
                return done(err);
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('Should send a  GET /todos request ', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .end( (err, res) => {
            if(err)
                return done(err);
            Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos/id', () => {
    it('Should send a  GET /todos/id request ', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end( (err, res) => {
            if(err)
                return done(err);
            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(todos[0].text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should return 404 if todo is empty', (done) => {
        request(app)
        .get(`/todos/${(new ObjectID()).toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if invalid id string was send', (done) => {
        request(app)
        .get('/todos/1233')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/id', () => {

    it('Should call the delete with id provided and delete the entries from db', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if(err)
                    return done(err);
                Todo.findById(hexId).then((todo) =>{
                    expect(todo).toBe(null);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should return 404 if todo is empty', (done) => {
        request(app)
        .delete(`/todos/${(new ObjectID()).toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if invalid id string was send', (done) => {
        request(app)
        .delete('/todos/1233')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/id', () => {

    it('Should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be a new text';
        var completed = true;
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
            expect(res.body.completed).toBe(completed);
            expect(typeof res.body.completedAt).toBe('number');
    })
    .end((err, res) => {
            if(err)
                return done(err);
            Todo.findById(hexId).then((todo) =>{
                expect(todo.completed).toBe(completed);
                expect(todo.completedAt).not.toBe(null);
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should clear the complete to false and CompletedAt to null', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be a new text with completedAt clears out';
        var completed = false;
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed,
                text
            })
            .expect(200)
            .expect((res) => {
            expect(res.body.text).toBe(text);
            expect(res.body.completed).toBe(completed);
            expect(res.body.completedAt).toBe(null);
        })
        .end((err, res) => {
            if(err)
            return done(err);
        Todo.findById(hexId).then((todo) =>{
            expect(todo.completed).toBe(completed);
            expect(todo.completedAt).toBe(null);
            done();
        }).catch((e) => done(e));
    });
    });

    it('Should return 404 if todo is empty', (done) => {
        request(app)
        .patch(`/todos/${(new ObjectID()).toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if invalid id string was send', (done) => {
        request(app)
        .patch('/todos/1233')
        .expect(404)
        .end(done);
    });
});


describe('GET /users/me', () => {
    it('Should return 200 and authenticate the uses', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
               expect(res.body._id).toBe(users[0]._id.toHexString());
               expect(res.body.email).toBe(users[0].email);
            }).end(done);
    });

    it('Should return 401 for un-authenticated user', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });

});


describe('POST /users/', () => {
    it('Should create a new user and return 200', (done) => {
        var email = 'abhinav.g2783@gmail.com';
        var password = '123abc!';
        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
                expect(res.body._id).toBeTruthy();
                expect(res.header['x-auth']).toBeTruthy();
            }).end((err) => {
                if(err){
                    return done(err);
                }
                User.findOne({email}).then((user) => {
                   expect(user).toBeTruthy();
                   expect(user.email).toBe(email);
                   expect(user.password).not.toBe(password);
                   done();
                });
            });
    });

    it('Should send validation error for invalid email and password lenght less than 6', (done) => {
        var email = 'abc';
        var password = 'abc';
        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);
    });

    it('Should send unique email id error', (done) => {
        var password = '123abc!';
        request(app)
            .post('/users')
            .send({
                email:users[0].email,
                password})
            .expect(400)
            .end(done);
    });
});