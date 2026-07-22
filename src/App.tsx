import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import type { Todo } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const str = localStorage.getItem('todos');
    if (str) {
      return JSON.parse(str)
    }
    return [
      { id: 1, title: 'nihao', completed: false },
      { id: 2, title: 'wohao', completed: true },
      { id: 3, title: 'dajiahao', completed: false },
    ]
  })
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id: number) {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    }
    setTodos(prev => [...prev, newTodo]);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} addTodo={addTodo} deleteTodo={deleteTodo} />
    </>
  )
}

export default App
