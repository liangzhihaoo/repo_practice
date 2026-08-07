import { LoginForm } from "@/components/login-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

const { mockSignWithPassword } = vi.hoisted(() => ({
    mockSignWithPassword: vi.fn().mockResolvedValue({
        error: new Error('Invalid login credentials')
    })
}))

vi.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: mockSignWithPassword
        }
    }
}))

describe('LoginForm', () => {
    test('shows an error message when the API returns invalid credentials', async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const pwdInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'random@gmail.com');
        await user.type(pwdInput, 'wrong password');

        await user.click(screen.getByRole('button', { name: /login/i }));

        expect(mockSignWithPassword).toHaveBeenCalledWith({
            email: 'random@gmail.com',
            password: 'wrong password'
        });
        expect(await screen.findByText(/Invalid login credentials/i)).toBeInTheDocument();
    })
})