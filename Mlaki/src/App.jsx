import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import CompliancePage from './pages/CompliancePage';
import ContactPage from './pages/ContactPage';

// Helper to scroll to top whenever navigation occurs
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#f5f6f7] text-[#131b33] selection:bg-[#165cfd] selection:text-white">
        {/* Signature Floating Navbar Island */}
        <Navbar />

        {/* Dynamic Multi-Page Router View */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback for any other path */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Deep Dark Footer */}
        <Footer />
      </div>
    </Router>
  );
}
