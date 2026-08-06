import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import TodoPage from "../src/pages/TodoPage"
import type { Todo } from "../src/types/todo";

const mockOrder = vi.fn();

vi.mock('../src/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn(() => ({
                order: mockOrder
            }))
        }))
    }
}))

vi.mock('../src/contexts/AuthContext', () => ({
    useAuth: () => ({
        session: {
            user: {
                id: 'test-user-id'
            }
        }
    })
}))

vi.mock('../src/components/Header', () => ({
    default: () => <header>Header</header>
}))

vi.mock('../src/components/TodoInput', () => ({
    default: () => <div>Todo Input</div>
}))

vi.mock('../src/components/TodoList', () => ({
    default: ({ todos }: { todos: Array<Todo> }) => (
        <ul>
            {
                todos.map(todo => <li key={todo.id}>{todo.title}</li>)
            }
        </ul>
    )
}))

describe('TodoPage', () => {
    beforeEach(() => {
        mockOrder.mockReset();
    })

    test('shows incomplete todos before completed todos', async () => {
        mockOrder.mockResolvedValue({
            data: [
                {
                    id: 1,
                    title: 'Completed todo',
                    completed: true,
                },
                {
                    id: 2,
                    title: 'Active todo',
                    completed: false,
                },
                {
                    id: 3,
                    title: 'Another completed todo',
                    completed: true,
                },
            ],
            error: null
        })

        render(<TodoPage />);

        const todoItems = await screen.findAllByRole('listitem');

        expect(todoItems[0]).toHaveTextContent('Active todo');
        expect(todoItems[1]).toHaveTextContent('Completed todo');
        expect(todoItems[2]).toHaveTextContent('Another completed todo');
    })
})

