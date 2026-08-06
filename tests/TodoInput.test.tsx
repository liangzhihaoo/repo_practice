import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import TodoInput from "../src/components/TodoInput"

describe('TodoInput', () => {
    test("does not add a todo when the input only contains spaces", async () => {
        const user = userEvent.setup();
        const addTodo = vi.fn();

        render(<TodoInput addTodo={addTodo} />)

        const input = screen.getByRole('textbox');
        const addBtn = screen.getByRole('button');

        await user.type(input, '   ');
        await user.click(addBtn);

        expect(addTodo).not.toHaveBeenCalled();
    })
})