import type { Todo } from "./App";

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: number) => void
}

function TodoList({ todos, toggleTodo }: TodoListProps) {
    return (
        <>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.title}</span>
                    <input type="checkbox" name={todo.title} checked={todo.completed} onClick={() => toggleTodo(todo.id)} />
                </div>
            ))}
        </>
    );
}

export default TodoList;