import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import { useNavigate } from "react-router-dom";
import { ChevronDown, User, Calendar, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser } = useAuth();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/v1/auth/logout");
    toast.success("Logout successful");
    setUser(null);
    navigate("/login");
  };
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "PPPPPPPP", href: "/doctor/appointment" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    ...(user ? [{ name: "Appointments", href: "/my-appointment" }] : []),
    {
      ...(user?.role === "admin" && { name: "Create Doctor", href: "/create" }),
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Glass Background */}
      <div className="absolute inset-0  backdrop-blur-xl  shadow-sm" />

      <div className="relative max-w-7xl mx-auto h-20 px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
            M
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              MedBook
            </h1>
            <p className="text-xs text-slate-500">Healthcare Platform</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.name}

                  {/* Active indicator */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : "bg-transparent"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Dashboard
              </Link>

              {/* Profile Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-white/60 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500">{user.role}</span>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform duration-300 ${
                      showMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 mt-3 w-72 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <h3 className="font-semibold">{user.name}</h3>

                      <p className="text-sm text-blue-100">{user.email}</p>
                    </div>

                    {/* Items */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-5 py-3 hover:bg-slate-50 transition"
                    >
                      <User size={18} />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/my-appointment");
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-5 py-3 hover:bg-slate-50 transition"
                    >
                      <Calendar size={18} />
                      My Appointments
                    </button>

                    <div className="border-t border-slate-100" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-slate-700"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/90 backdrop-blur-xl border-t border-white/40 ${
          isOpen ? "max-h-screen py-6" : "max-h-0"
        }`}
      >
        <div className="px-6 space-y-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-slate-700 font-medium hover:text-blue-600 transition"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-slate-200 space-y-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded-2xl border border-slate-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded-2xl border border-slate-200"
                >
                  My Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
