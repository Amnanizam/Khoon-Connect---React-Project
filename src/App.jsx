import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './Components/Routes/ProtectedRoutes'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import FindBlood from './Pages/FindBlood'
import RequestBlood from './Pages/RequestBlood'
import ManageRequests from './Pages/ManageRequests'
import History from './Pages/History'
import Notifications from './Pages/Notifications'
import Analytics from './Pages/Analytics'
import Home from './Pages/Home'

function App() {
  const router = createBrowserRouter([
      { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // Protected routes
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
    { path: "request", element: <RequestBlood /> }, 
    { path: "history", element: <History /> }, 
    { path: "notifications", element: <Notifications /> }, 
    { path: "requests", element: <FindBlood /> }, 
    { path: "donations", element: <History /> }, 
    { path: "manage-requests", element: <ManageRequests /> }, 
    { path: "inventory", element: <Inventory /> }, 
    { path: "users", element: <ManageUsers /> }, 
    { path: "analytics", element: <Analytics /> },
  ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/findblood",
      element: (
        <ProtectedRoute>
          <FindBlood />
        </ProtectedRoute>
      ),
    },
    {
      path: "/requestblood",
      element: (
        <ProtectedRoute>
          <RequestBlood />
        </ProtectedRoute>
      ),
    },
    {
      path: "/managerequests",
      element: (
        <ProtectedRoute>
          <ManageRequests />
        </ProtectedRoute>
      ),
    },
    {
      path: "/history",
      element: (
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      ),
    },
    {
      path: "/notifications",
      element: (
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      ),
    },
    {
      path: "/analytics",
      element: (
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router}/>
}

export default App
