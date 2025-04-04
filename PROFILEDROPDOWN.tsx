import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
interface ProfileDropdownProps {
  userEmail: string;
  avatarUrl?: string;
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userEmail, avatarUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {setIsOpen(false);
      }
    };
document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-surface border border-gray-700 hover:border-terminal-green/50 focus:outline-none"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
        ) : (
          <User size={20} className="text-gray-300" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 cyberpunk-card z-10">
          <div className="p-3 border-b border-gray-800">
            <p className="text-sm font-medium text-gray-300 truncate">{userEmail}</p>
          </div>
          <div className="py-1">
            <Link
to="/chat"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-bg hover:text-terminal-green"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={16} className="mr-2" />
Chats
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-bg hover:text-terminal-green"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-bg hover:text-terminal-green"
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown
