import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const filteredTodos = getFilteredTodos()
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="container">
      <div className="header">
        <h1>Todo App</h1>
      </div>
      
      <form className="todo-input-container" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">
            {filter === 'all' 
              ? 'No todos yet. Add one above!'
              : filter === 'active'
                ? 'No active todos'
                : 'No completed todos'
            }
          </li>
        ) : (
          filteredTodos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      
      <div className="filter-container">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All {todos.length > 0 && `(${todos.length})`}
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active {activeCount > 0 && `(${activeCount})`}
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.length - activeCount})
        </button>
      </div>
    </div>
  )
}

export default App
