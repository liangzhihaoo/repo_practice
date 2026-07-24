import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import './styles/TodoList.css'

type TodoInputProps = {
    addTodo: (input: string) => void;
}

function TodoInput({ addTodo }: TodoInputProps) {
    const [todoInput, setTodoInput] = useState('');

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodoInput(e.target.value);
    }

    function handleAddTodo() {
        if (!todoInput.trim()) return;
        addTodo(todoInput);
        setTodoInput('');
    }

    return (
        <div className="add-todo">
            <Input type="text" placeholder="Add a new todo..." value={todoInput} onChange={handleInputChange} />
            <Button onClick={handleAddTodo}>Add</Button>
        </div>
    );
}

export default TodoInput;  