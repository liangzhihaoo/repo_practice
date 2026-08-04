import { Route, Routes } from "react-router";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={
          <ProtectedRoute />
        }>
          <Route path="/" element={<TodoPage />} />
        </Route>
      </Routes>
      
      <Toaster />
    </>
  );
}

export default App
