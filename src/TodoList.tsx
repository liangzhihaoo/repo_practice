import type { Todo } from './types/todo'
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput"
import { ClipboardCheck } from 'lucide-react';

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}

function TodoList({ todos, toggleTodo, addTodo, deleteTodo, updateTodo }: TodoListProps) {

    return (
        <div className="flex-1 text-center">
            <h1 className="mt-5 text-3xl">Todo List</h1>
            <h3 className='text-muted-foreground'>Stay organized and get things done.</h3>
            <div className="mx-auto mt-5 w-130 max-w-[90vw] rounded-lg border bg-card p-2.5 shadow-lg">
                <TodoInput addTodo={addTodo} />
                {
                    todos.length
                        ? <div className="min-w-50 max-w-125 mx-auto">
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                            ))}
                        </div>
                        : <div className='min-w-50 max-w-125 mx-auto'>
                            <div className="mx-auto flex w-12.5 h-12.5 items-center justify-center rounded-full bg-muted"><ClipboardCheck /></div>
                            <span className='font-semibold block'>No todos yet</span>
                            <span className='text-muted-foreground text-sm'>Add your first todo above to get started</span>
                        </div>
                }

            </div>
        </div>
    );
}

export default TodoList;