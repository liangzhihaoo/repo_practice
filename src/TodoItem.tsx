import type { Todo } from './types/todo'
import { SquarePen, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import './styles/TodoList.css'
import { useEffect, useRef, useState } from 'react';
import { cn } from "./lib/utils"

type TodoItemProps = {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}
function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }: TodoItemProps) {
    const [editingText, setEditingText] = useState(todo.title);
    const [editing, setEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) {
            inputRef.current?.select();
        }
    }, [editing]);

    function handleEditTodo() {
        setEditingText(todo.title);
        setEditing(true);
    }

    function handleSaveEditing() {
        if (!editingText.trim()) return;
        updateTodo(todo.id, editingText);
        setEditing(false);
    }

    function handleCancelEditing() {
        setEditing(false);
        setEditingText(todo.title);
    }

    const displayTodo =
        <>
            <div className="left">
                <Checkbox name={todo.title} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                <span className={cn('todo-title', todo.completed && 'completed')}>{todo.title}</span>
            </div>
            <div className="right">
                <Button size="icon" aria-label="Edit Todo" variant="outline" onClick={() => handleEditTodo()}>
                    <SquarePen />
                </Button>
                <Button size="icon" aria-label="Delete Todo" variant="outline" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 />
                </Button>
            </div>
        </>

    const editingTodo =
        <>
            <div className="left">
                <Checkbox name={todo.title} checked={todo.completed} disabled />
                <Input className='todo-title todo-title-input' ref={inputRef} type='text' value={editingText} onChange={(e) => setEditingText(e.target.value)} />
            </div>
            <div className="right">
                <Button variant="outline" onClick={() => handleSaveEditing()}>
                    Save
                </Button>
                <Button variant="outline" onClick={() => handleCancelEditing()}>
                    Cancel
                </Button>
            </div>
        </>

    return (
        <div className="todo">
            {
                editing ? editingTodo : displayTodo
            }
        </div>
    );
}

export default TodoItem;