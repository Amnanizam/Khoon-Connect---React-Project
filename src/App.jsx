import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/Routes/ProtectedRoutes";

// ✅ Import all pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import FindBlood from "./Pages/FindBlood";
import RequestBlood from "./Pages/RequestBlood";
import ManageRequests from "./Pages/ManageRequests";
import ManageUsers from "./Pages/ManageUsers";
import ManageBloodBanks from "./Pages/ManageBloodBanks"; // acts as ManageBloodbanks
import History from "./Pages/History";
import Notifications from "./Pages/Notifications";
import Analytics from "./Pages/Analytics";
import Unauthorized from "./Pages/Unauthorized"; // for 403 restricted pages

function App() {
  const router = createBrowserRouter([
    // 🌐 Public Routes
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // 🔒 Protected Routes (Dashboard + all internal pages)
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        // 🩸 Donor
        { path: "find-blood", element: <FindBlood /> },

        // 🧍 Patient
        { path: "request-blood", element: <RequestBlood /> },

        // 🧾 Shared Pages
        { path: "history", element: <History /> },
        { path: "notifications", element: <Notifications /> },
        { path: "profile", element: <Profile /> },

        // 🏥 Admin / Bloodbank
        { path: "manage-requests", element: <ManageRequests /> },
        { path: "manage-users", element: <ManageUsers /> },
        { path: "manage-bloodbanks", element: <ManageBloodBanks /> },
        { path: "analytics", element: <Analytics /> },
      ],
    },

    // 🚫 Unauthorized (403)
    { path: "/unauthorized", element: <Unauthorized /> },

    // ⚠️ 404 Fallback
    {
      path: "*",
      element: (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <h1 className="text-3xl text-red-600 font-semibold">
            404 - Page Not Found
          </h1>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
