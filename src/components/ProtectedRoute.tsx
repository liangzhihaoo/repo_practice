import { useAuth } from "@/contexts/AuthContext";
import LoadingPage from "@/pages/LoadingPage";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
    const {session, isAuthLoading} = useAuth();

    if (isAuthLoading) return <LoadingPage />;

    if (!session) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;