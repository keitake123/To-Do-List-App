const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome');
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { task, completed } = req.body;
  const newTodo = { id: Date.now(), task, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle todo completion
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id == id ? { ...todo, completed: !todo.completed } : todo
  );
  res.status(200).send();
});

// Remove a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
