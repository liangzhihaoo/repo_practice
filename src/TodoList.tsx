import type { Todo } from './types/todo'
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput"
import { ClipboardCheck } from 'lucide-react';

import './styles/TodoList.css'

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}

function TodoList({ todos, toggleTodo, addTodo, deleteTodo, updateTodo }: TodoListProps) {

    return (
        <div className="page-todo-list">
            <h1 className="page-title">Todo List</h1>
            <h3 className='page-subtitle'>Stay organized and get things done.</h3>
            <div className="todo-list-card">
                <TodoInput addTodo={addTodo} />
                {
                    todos.length
                        ? <div className="todo-list">
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                            ))}
                        </div>
                        : <div className='todo-list empty'>
                            <div className="empty-icon"><ClipboardCheck color='#94a3b8' /></div>
                            <span className='title'>No todos yet</span>
                            <span>Add your first todo above to get started</span>
                        </div>
                }

            </div>
        </div>
    );
}

export default TodoList;