const mongoose = require('mongoose');
const validator = require('validator')
// const mondodb = require('mongodb');

const { MongoClient, ObjectID } = require('mongodb');

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'todo-app';

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect ot the database');
//     }

//     const db = client.db(databaseName);

//     db.collection('users').findOne({_id: ObjectID("5f3c6fd6f6692185f4d3b345")}, (error, user) => {
//         if (error) {
//             return console.log('Unable to find the user')
//         }
        
//         console.log(user);
//         return db;
//     })

// })
// console.log(db)

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const userSchema = new Schema(    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (validator.isEmail(value)) {
                console.log('success')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    todos: [todoSchema]
})

const userModel = mongoose.model('user', userSchema)
const todoModel = mongoose.model('todo', todoSchema)



// const user = new userModel({
//     name: 'Sam',
//     email: 'sam@gmail.com',
//     password: 'asdsfsedfs',
// })

// user.todos.push({description: 'adding todo with user'})

// user.save().then(() => {
    
//         console.log(user)
    
// }).catch((error) => {
//     console.log(error)
// })

module.exports = {
    userModel,
    todoModel
};

