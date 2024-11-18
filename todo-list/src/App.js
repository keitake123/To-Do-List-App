import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  function addTodo(todo) {
    axios.post('http://localhost:5000/api/todos', todo)
      .then(response => setTodos([response.data, ...todos]))
      .catch(error => console.error(error));
  }

  function toggleComplete(id) {
    axios.patch(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }));
      })
      .catch(error => console.error(error));
  }

  function removeTodo(id) {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>React Todo</p>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
      </header>
    </div>
  );
}

export default App;
