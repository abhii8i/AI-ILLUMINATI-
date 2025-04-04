import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { supabase } from '../lib/supabase';
interface NavbarProps {
  isAuthenticated: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

   return (
    <nav className="bg-dark-surface/80 backdrop-blur-md border-b border-terminal-green/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo animate={true} />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/chat" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg">
                  Chat
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg"
                >
                  Sign Out
                </button>
              </>
            ) : (
<>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg">
                  Login
                </Link>
                <Link to="/signup" className="cyberpunk-button px-4 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-terminal-green hover:bg-dark-bg focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg"
              onClick={() => setIsMenuOpen(false)}
            >
Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/chat" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-terminal-green hover:bg-dark-bg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-terminal-green border border-terminal-green/50"
                 
onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
