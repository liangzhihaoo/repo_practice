import type { Todo } from '../types/todo'
import TodoItem from "./TodoItem";
import { ClipboardCheck } from 'lucide-react';

type TodoListProps = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    updateTodo: (todo: Todo) => void;
}

function TodoList({ todos, deleteTodo, updateTodo }: TodoListProps) {
    if (!todos.length) {
        return <TodoEmptyState />
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            ))}
        </div>
    );
}

function TodoEmptyState() {
    return (
        <div className='w-full max-w-xl mx-auto'>
            <div className="mx-auto flex size-12.5 items-center justify-center rounded-full bg-muted"><ClipboardCheck /></div>
            <span className='font-semibold block'>No todos yet</span>
            <span className='text-muted-foreground text-sm'>Add your first todo above to get started</span>
        </div>
    );
}

export default TodoList;