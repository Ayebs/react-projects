// install dependencies- npm init y

const express = require('express');
const http = require('node:http');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 3700;

// middleware
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.json())

let todos = [
    {id: 1, chore: 'Learn React', completed: false},
    {id: 2, chore: 'Buy groceries', completed: false},
    {id: 3, chore: 'Visit a friend', completed: false},
]

// get all todos
app.get('/todos', (req, res) => {
    res.send(todos);
});

// add (post) a new todo
app.post('/todos', (req, res) => {
    const { id, chore, completed } = req.body;

    // const newTodo = {
    //     id,
    //     chore,
    //     completed
    // }

    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.send(newTodo);
})

// update a todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });