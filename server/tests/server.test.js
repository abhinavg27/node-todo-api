const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/Todos');

var id = '5af3ed9b388acb3d5cd30ad2';

const todos = [{
    _id: new ObjectID(),
    text: 'My first test data'
},{
    _id: new ObjectID(),
    text: 'My Second test data'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
});

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
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body.todo.text);
                console.log(todos[0].text);
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end( (err, res) => {
            if(err)
                return done(err);
            Todo.findById(todos[0]._id).then((todo) => {
                expect(todo.length).toBe(1);
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
