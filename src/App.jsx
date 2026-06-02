import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import Checkout from "./pages/Checkout/Checkout";
import Reservation from "./pages/Reservation/Reservation";
import Onboarding from "./pages/restaurant/Onboarding/Onboarding";
import Dashboard from "./pages/restaurant/Dashboard/Dashboard";
import Menu from "./pages/restaurant/Menu/Menu";
import AddDish from "./pages/restaurant/AddDish/AddDish";
import Settings from "./pages/restaurant/Settings/Settings";
import Notifications from "./pages/restaurant/Notifications/Notifications";


const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/home" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"        element={<Navigate to="/home" replace />} />
      <Route path="/home"    element={<Home />} />
      <Route path="/login"   element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/explore"  element={<Explore/>} />
      <Route path="/Profile" element={<Profile />}/>
      <Route path="/edit-profile" element={<EditProfile/>} />
      <Route path="/orders" element={<OrderTracking />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/reservations" element={<Reservation />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/add-dish" element={<AddDish />} /> 
      <Route path="/settings" element={<Settings />} />  
      <Route path="/notifications" element={<Notifications />} />      
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