import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );    // Check current session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
checkSession();
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terminal-green"></div>
      </div>
    );
  }
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg flex flex-col">
        <div className="scanline"></div>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar isAuthenticated={isAuthenticated} />
              <div className="pt-16">
                <LandingPage />
              </div>
            </>
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/chat" /> : <LoginPage />
          } />
          <Route path="/signup" element={
           isAuthenticated ? <Navigate to="/chat" /> : <SignupPage />
          } />
          <Route path="/chat" element={
            isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
          } />
          <Route path="/settings" element={
            isAuthenticated ? (
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <div className="pt-16">
                  <SettingsPage />
                </div>
              </>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
