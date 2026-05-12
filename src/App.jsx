import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

// ProtectedRoute — redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', height: '100vh',
      color: 'var(--primary)', fontSize: '1.2rem'
    }}>
      Loading...
    </div>
  )

  // If not logged in, send to login page
  return user ? children : <Navigate to="/login" replace />
}

// PublicRoute — redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes — only for guests */}
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected routes will be added here later */}
      {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App