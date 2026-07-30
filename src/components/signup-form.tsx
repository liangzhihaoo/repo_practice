import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    success ? (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
          <CardDescription>Check your email to confirm</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You&apos;ve successfully signed up. Please check your email to confirm your account
            before signing in.
          </p>
        </CardContent>
      </Card>
    ) : (
      <Card {...props}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email
                  with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                <FieldDescription>Please confirm your password.</FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating an account...' : 'Create Account'}</Button>
                  {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <a href="/login">Sign in</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    )
  )
}
