import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import Checkout from "./pages/Checkout/Checkout";
import Reservation from "./pages/Reservation/Reservation";
import Bookings from "./pages/Bookings/Bookings";
import Onboarding from "./pages/restaurant/Onboarding/Onboarding";
import Dashboard from "./pages/restaurant/Dashboard/Dashboard";
import Menu from "./pages/restaurant/Menu/Menu";
import AddDish from "./pages/restaurant/AddDish/AddDish";
import Settings from "./pages/restaurant/Settings/Settings";
import Notifications from "./pages/restaurant/Notifications/Notifications";
import RestaurantOrders from "./pages/restaurant/Orders/Orders";
import Reservations from "./pages/restaurant/Reservations/Reservations";
import Analytics from "./pages/restaurant/Analytics/Analytics";
import Support from "./pages/restaurant/Support/Support";
import Staff from "./pages/restaurant/Staff/Staff";
import OrderDetail from "./pages/restaurant/OrderDetail/OrderDetail";

// Redirect logged-in users away from login/register
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/home" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public ───────────────────────────────────── */}
      <Route path="/"         element={<Navigate to="/home" replace />} />
      <Route path="/home"     element={<Home />} />
      <Route path="/explore"  element={<Explore />} />
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* ── Customer (any logged-in user) ────────────── */}
      <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/order"        element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
      <Route path="/checkout"     element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/reservation"  element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
      <Route path="/bookings"     element={<ProtectedRoute><Bookings /></ProtectedRoute>} />

      {/* ── Restaurant Owner only ─────────────────────── */}
      <Route path="/onboarding" element={
        <ProtectedRoute role="restaurant_owner"><Onboarding /></ProtectedRoute>
      }/>
      <Route path="/dashboard" element={
        <ProtectedRoute role="restaurant_owner"><Dashboard /></ProtectedRoute>
      }/>
      <Route path="/menu" element={
        <ProtectedRoute role="restaurant_owner"><Menu /></ProtectedRoute>
      }/>
      <Route path="/add-dish" element={
        <ProtectedRoute role="restaurant_owner"><AddDish /></ProtectedRoute>
      }/>
      <Route path="/settings" element={
        <ProtectedRoute role="restaurant_owner"><Settings /></ProtectedRoute>
      }/>
      <Route path="/notifications" element={
        <ProtectedRoute role="restaurant_owner"><Notifications /></ProtectedRoute>
      }/>
      <Route path="/restaurant-orders" element={
        <ProtectedRoute role="restaurant_owner"><RestaurantOrders /></ProtectedRoute>
      }/>
      <Route path="/reservations" element={
        <ProtectedRoute role="restaurant_owner"><Reservations /></ProtectedRoute>
      }/>
      <Route path="/analytics" element={
        <ProtectedRoute role="restaurant_owner"><Analytics /></ProtectedRoute>
      }/>
      <Route path="/staff" element={
        <ProtectedRoute role="restaurant_owner"><Staff /></ProtectedRoute>
      }/>
      <Route path="/support" element={
        <ProtectedRoute role="restaurant_owner"><Support /></ProtectedRoute>
      }/>
      <Route path="/order-details/:id" element={
        <ProtectedRoute role="restaurant_owner"><OrderDetail /></ProtectedRoute>
      }/>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;