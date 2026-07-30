import { SignupForm } from "@/components/signup-form";

function SignupPage() {
    return ( 
        <main className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </main>
     );
}

export default SignupPage;