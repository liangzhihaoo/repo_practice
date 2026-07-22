import type { Todo } from './types/todo'
import { MdDelete } from "react-icons/md";
import './styles/TodoList.css'

type TodoItemProps = {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}
function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
    return (
        <div className="todo">
            <input type="checkbox" name={todo.title} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <button aria-label="Delete todo" onClick={() => deleteTodo(todo.id)}>
                <MdDelete />
            </button>
        </div>
    );
}

export default TodoItem;