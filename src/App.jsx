import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GroupDashboard from "./pages/GroupDashboard";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgetPassword";

// Admin Route
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "ADMIN"
    ? children
    : (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">
          Access Denied
        </h1>
      </div>
    );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <GroupDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

        {/* Admin Only Route */}
        <Route
          path="/chains"
          element={
            <AdminRoute>
              <h1 className="text-center text-4xl mt-20">
                Chain Module Coming Soon
              </h1>
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;