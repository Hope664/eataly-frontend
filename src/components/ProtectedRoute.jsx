import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute
 * 
 * Usage:
 *   <ProtectedRoute>                          → just requires login
 *   <ProtectedRoute role="restaurant_owner">  → requires login + role
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth()

  // Still checking localStorage token — show nothing
  if (loading) return null

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />

  // Wrong role → redirect appropriately
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'restaurant_owner' ? '/dashboard' : '/home'} replace />
  }

  return children
}

export default ProtectedRoute