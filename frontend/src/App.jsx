import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorsList from "./pages/DoctorsList";

import LoginPage from "./auth/Login";
import SignupPage from "./auth/SignUp";
// import Dashboard from "./pages/Dashboard";
import MyAppointments from "./pages/MyAppointments";
import PatientDashboard from "./pages/PatientDashboard";
import UpdateProfile from "./components/UpdateProfile";
import CreateDoctor from "../admin/CreateDoctor";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import Profile from "./pages/Profile";
import ForgetPassword from "./auth/ChangePassword";
import ChangePassword from "./auth/ChangePassword";
import AdminDashboard from "../admin/AdminDashboard";
import ADashboard from "./doctor/ADashboard";
import Services from "./pages/Services";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-900">
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/doctor/details/:id" element={<DoctorDetails />} />
            <Route path="/services" element={<Services />} />

            <Route
              path="/doctors"
              element={<DoctorsList showSearch={false} />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />

            <Route path="/my-appointment" element={<MyAppointments />} />

            <Route element={<RoleProtectedRoute allowedRoles={["patient"]} />}>
              <Route path="/dashboard" element={<PatientDashboard />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
            <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/create" element={<CreateDoctor />} />

              <Route path="/admin" element={<ADashboard />} />

           
            </Route>

            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </div>
    </Router>
  );
}

export default App;
