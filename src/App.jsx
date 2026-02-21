import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (newTodo.trim() === '') return
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    }
    setTodos([...todos, todo])
    setNewTodo('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="app">
      <h1>Todo App</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <span>{remainingCount} items left</span>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
