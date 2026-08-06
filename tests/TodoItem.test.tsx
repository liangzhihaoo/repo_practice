import TodoItem from "@/components/TodoItem";
import type { Todo } from "@/types/todo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

describe('TodoItem', () => {
    test('saves the updated todo title', async () => {
        const user = userEvent.setup();

        const todo = {
            id: 1,
            title: 'Original title',
            completed: false
        } as Todo;

        const deleteTodo = vi.fn();
        const updateTodo = vi.fn();

        render(<TodoItem todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />);

        await user.click(screen.getByRole('button', { name: /edit todo/i}));
        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'Updated title');
        await user.click(screen.getByRole('button', { name: /save/i}))

        expect(updateTodo).toHaveBeenCalledTimes(1);

        expect(updateTodo).toHaveBeenCalledWith({
            ...todo,
            title: 'Updated title'
        })
    })
})