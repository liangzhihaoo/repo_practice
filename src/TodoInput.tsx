import { useState } from "react";

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
            <input type="text" value={todoInput} onChange={handleInputChange} />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
}

export default TodoInput;  