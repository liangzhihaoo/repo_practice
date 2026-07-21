import { useState } from "react";
import type { Todo } from "./App";
import { MdDelete } from "react-icons/md";

import './styles/TodoList.css'

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
}

function TodoList({ todos, toggleTodo, addTodo, deleteTodo }: TodoListProps) {
    const [todoInput, setTodoInput] = useState('');

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodoInput(e.target.value)
    }

    function handleAddTodo() {
        if (!todoInput.trim()) return;
        addTodo(todoInput);
        setTodoInput('');
    }

    return (
        <div className="page-todo-list">
            <h1 className="page-title">Todo List Demo</h1>
            <div className="add-todo">
                <input type="text" value={todoInput} onChange={handleInputChange} />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <div className="todo-list">
                {todos.map((todo) => (
                    <div className="todo" key={todo.id}>
                        <input type="checkbox" name={todo.title} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                        <button aria-label="Delete todo" onClick={() => deleteTodo(todo.id)}>
                            <MdDelete />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;