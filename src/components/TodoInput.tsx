import { useRef, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        addTodo(todoInput.trim());
        setTodoInput('');
    }

    const createInputRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            handleAddTodo();
            createInputRef.current?.select();
        }
    }

    return (
        <div className="w-full mb-0 sm:mb-2 flex flex-col sm:flex-row">
            <Input type="text" placeholder="Add a new todo..." ref={createInputRef} value={todoInput} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <Button className="my-2 sm:my-0 sm:ml-2.5" onClick={handleAddTodo}>Add</Button>
        </div>
    );
}

export default TodoInput;  