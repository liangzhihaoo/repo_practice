import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/vitest'

import TodoList from '../src/components/TodoList'

describe('TodoList', () => {
    test('shows the empty state when there are no todos', () => {
        const deleteTodo = vi.fn();
        const updateTodo = vi.fn();

        render(<TodoList todos={[]} deleteTodo={deleteTodo} updateTodo={updateTodo} />);

        expect(screen.getByText('No todos yet')).toBeInTheDocument();
        expect(screen.getByText('Add your first todo above to get started')).toBeInTheDocument();
    })
})