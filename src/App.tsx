import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, title: 'nihao', completed: false},
    {id: 2, title: 'wohao', completed: true},
    {id: 3, title: 'dajiahao', completed: false},
  ])

  function toggleTodo(id: number) {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App
