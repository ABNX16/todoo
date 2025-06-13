
import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    axios.get('http://localhost:2002/items')
      .then(response => setTodos(response.data.data))
      .catch(error => console.error('Error:', error));
  }

  const handlAdd = () => {
    if (todo.trim() === '') return;
    axios.post('http://localhost:2002/item', { items: todo })
      .then(response => {
        setTodo('');
        fetchTodos(); 
      })
      .catch(error => console.error('Error:', error));
  }


  const handlDelete = (id) => {
    axios.delete('http://localhost:2002/item/' + id)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(item => item._id !== id))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  const handlUpdate = (id,itemName) => {
    axios.put('http://localhost:2002/item/' + id, { items: `Task Completed: ${itemName} ✅` })
      .then(() => {
        fetchTodos(); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1 id='h11'>TODO LIST</h1>
      <div>
        <input
          type='text'
          id='inp'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button id='bb1' onClick={handlAdd}>+</button>
      </div>

      {todos.map((todo) => (
        <div id='out' key={todo._id}>
          <button id='bb2'  onClick={() => {
    if (window.confirm(`Are you sure you completed the task: ${todo.items}?`)) {
      handlUpdate(todo._id, todo.items) ;
    }
  }}>✔️</button>
          <p>{todo.items}</p>
          <button 
  id='bb3' 
  onClick={() => {
    if (window.confirm(`Are you sure you want to delete: ${todo.items}?`)) {
      handlDelete(todo._id);
    }
  }}
>
  🗑️
</button>

        </div>
      ))}
    </div>
  )
}

export default App
