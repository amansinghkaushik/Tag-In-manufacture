import { useState } from "react";
import { Routes, Route, Navigate, NavLink, useNavigate, Link } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Registerproduct from "./pages/Registerproduct";
import TransferOwnership from "./pages/TransferOwnership";
import taginLogo from "./assets/tagin-logo-white.svg";
import { HiMenu, HiX } from "react-icons/hi";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("Manufacturer Portal");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setUserAddress("");
    navigate("/");
  };

  const navItems = [
    { name: "Register Product", path: "/Registerproduct" },
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Transfer Ownership", path: "/transfer" },
    { name: "Reports", path: "/reports" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />

        {/* Since login is removed, the rest of the app is directly accessible under different routes or nested. However, to keep the top nav bar, we'll wrap the protected routes. */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-black">
                {/* Navbar */}
                <nav className="fixed z-[9999] max-w-full top-0 left-0 right-0 bg-black pointer-events-auto">
                  <div className="max-w-full mx-14 px-12">
                    <div className="flex items-center justify-between h-20">
                      <div className="flex items-center gap-4">
                        <Link to="/">
                          <img src={taginLogo} alt="TagIn Logo" className="h-6 w-auto hover:opacity-80 transition-opacity" />
                        </Link>
                      </div>

                      {/* Desktop Navigation links */}
                      <div className="hidden md:flex items-center gap-3">
                        <ul className="flex items-center gap-2">
                          {navItems.map((item, index) => (
                            <li key={index}>
                              <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                  `block px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${isActive
                                    ? "bg-[#5282E1] text-white shadow-lg shadow-[#5282E1]/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                  }`
                                }
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>

                      </div>

                      {/* Mobile menu button */}
                      <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
                      >
                        {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                      </button>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {mobileMenuOpen && (
                      <div className="md:hidden py-4 border-t border-white/10">
                        <ul className="space-y-2">
                          {navItems.map((item, index) => (
                            <li key={index}>
                              <NavLink
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  `block px-6 py-3 rounded-2xl text-base font-medium transition-all ${isActive
                                    ? "bg-[#5282E1] text-white shadow-lg shadow-[#5282E1]/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                  }`
                                }
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>

                      </div>
                    )}
                  </div>
                </nav>

                {/* Main Content */}
                <div className="min-h-[calc(100vh-5rem)] relative pt-20">
                  <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route
                      path="/Registerproduct"
                      element={<Registerproduct />}
                    />
                    <Route path="/transfer" element={<TransferOwnership />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/analytics" element={<Analytics />} />{" "}
                    {/* 👈 NEW */}
                    <Route path="*" element={<Navigate to="/Dashboard" />} />
                  </Routes>
                </div>
              </div>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
