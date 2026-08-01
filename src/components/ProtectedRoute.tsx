import LoadingPage from "@/pages/LoadingPage";
import type { Session } from "@supabase/supabase-js";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
    session: Session | null;
    isAuthLoading: boolean;
}

function ProtectedRoute({
    session,
    isAuthLoading
}: ProtectedRouteProps) {
    if (isAuthLoading) return <LoadingPage />;

    if (!session) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;