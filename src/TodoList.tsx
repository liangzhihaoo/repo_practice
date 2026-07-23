import type { Todo } from './types/todo'
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput"

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
            <h1 className="page-title">Todo List Demo</h1>
            <TodoInput addTodo={addTodo} />
            <div className="todo-list">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                ))}
            </div>
        </div>
    );
}

export default TodoList;