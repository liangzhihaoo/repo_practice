import { useRef, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type TodoInputProps = {
    addTodo: (input: string) => Promise<boolean>;
}

function TodoInput({ addTodo }: TodoInputProps) {
    const [todoInput, setTodoInput] = useState('');
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodoInput(e.target.value);
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isAddingTodo) return;
        
        const trimmedInput = todoInput.trim();
        if (!trimmedInput) return;

        setIsAddingTodo(true);

        try {
            const success = await addTodo(trimmedInput);
            if (success) {
                setTodoInput('');
                createInputRef.current?.select();
            }
        } finally {
            setIsAddingTodo(false);
        }
    }

    const createInputRef = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={handleSubmit} className="mb-2 flex gap-2">
            <Input type="text" placeholder="Add a new todo..." ref={createInputRef} value={todoInput} onChange={handleInputChange} />
            <Button type="submit" disabled={isAddingTodo}>Add</Button>
        </form>
    );
}

export default TodoInput;  