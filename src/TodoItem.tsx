import type { Todo } from './types/todo'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './styles/TodoList.css'
import { useEffect, useRef, useState } from 'react';

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
            <input className='todo-checkbox' type="checkbox" name={todo.title} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span className={'todo-title' + (todo.completed ? ' completed' : '')}>{todo.title}</span>
            <button className='todo-btn' aria-label='Edit todo' onClick={() => handleEditTodo()}>
                <FaEdit />
            </button>
            <button className='todo-btn' aria-label="Delete todo" onClick={() => deleteTodo(todo.id)}>
                <MdDelete />
            </button>
        </>

    const editingTodo =
        <>
            <input className='todo-checkbox' type="checkbox" name={todo.title} checked={todo.completed} disabled />
            <input className='todo-title todo-title-editing' ref={inputRef} type='text' value={editingText} onChange={(e) => setEditingText(e.target.value)} />
            <button className='todo-btn' aria-label='Edit todo' onClick={() => handleSaveEditing()}>
                Save
            </button>
            <button className='todo-btn' aria-label="Delete todo" onClick={() => handleCancelEditing()}>
                Cancel
            </button>
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