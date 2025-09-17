import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ProtectedRoute from './Components/Routes/ProtectedRoutes'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import FindBlood from './Pages/FindBlood'
import RequestBlood from './Pages/RequestBlood'
import Events from './Pages/Events'
import ManageRequests from './Pages/ManageRequests'
import History from './Pages/History'
import Notifications from './Pages/Notifications'
import Analytics from './Pages/Analytics'

function App() {
  const router = createBrowserRouter([
      { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // Protected routes
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
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
      path: "/events",
      element: (
        <ProtectedRoute>
          <Events />
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
