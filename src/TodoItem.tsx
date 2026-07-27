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
        updateTodo(todo.id, editingText.trim());
        setEditing(false);
    }

    function handleCancelEditing() {
        setEditing(false);
        setEditingText(todo.title);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            handleSaveEditing();
        } else if (e.code === 'Escape') {
            handleCancelEditing();
        }
    }

    function handleDoubleClickTodoTitle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        handleEditTodo();
    }

    const displayTodo =
        <>
            <div className="flex flex-1 items-center">
                <Checkbox name={todo.title} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                <span className={cn('ml-2', todo.completed && 'text-muted-foreground line-through')} onDoubleClick={handleDoubleClickTodoTitle}>{todo.title}</span>
            </div>
            <div className="ml-4">
                <Button size="icon" aria-label="Edit Todo" variant="outline" onClick={() => handleEditTodo()}>
                    <SquarePen />
                </Button>
                <Button className="ml-1.5" size="icon" aria-label="Delete Todo" variant="outline" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 />
                </Button>
            </div>
        </>

    const editingTodo =
        <>
            <div className="flex flex-1 items-center">
                <Checkbox name={todo.title} checked={todo.completed} disabled />
                <Input className='ml-2' ref={inputRef} type='text' value={editingText} onChange={(e) => setEditingText(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <div className="ml-4">
                <Button variant="outline" onClick={() => handleSaveEditing()}>
                    Save
                </Button>
                <Button className="ml-1.5" variant="outline" onClick={() => handleCancelEditing()}>
                    Cancel
                </Button>
            </div>
        </>

    return (
        <div className="w-full mb-2.5 flex justify-between p-1.5 border rounded-md transition-all duration-150 hover:bg-muted">
            {
                editing ? editingTodo : displayTodo
            }
        </div>
    );
}

export default TodoItem;