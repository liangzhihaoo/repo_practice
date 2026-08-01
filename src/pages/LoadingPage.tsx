import { LoaderCircle } from 'lucide-react';

function LoadingPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <LoaderCircle className='size-8 animate-spin' />
        </main>
    );
}

export default LoadingPage;