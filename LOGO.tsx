import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  animate?: boolean;
}
const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true, animate = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };
  useEffect(() => {
    if (animate) {
      // Random blinking effect
      const blinkInterval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }, Math.random() * 5000 + 3000);
      
      return () => clearInterval(blinkInterval);
      }
  }, [animate]);
  useEffect(() => {
    if (isSearching) {
      const searchTimeout = setTimeout(() => {
        setIsSearching(false);
      }, 2000);
      
      return () => clearTimeout(searchTimeout);
    }
  }, [isSearching]);
  // Trigger searching animation when needed
  useEffect(() => {
    if (animate) {
      const searchInterval = setInterval(() => {
        setIsSearching(true);
      }, 10000);
      
      return () => clearInterval(searchInterval);
    }
  }, [animate]);
  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizes[size]}`}>
        <div className={`absolute inset-0 bg-terminal-green rounded-full opacity-30 ${isSearching ? 'animate-pulse' : ''}`}></div>
        <div className="relative bg-gradient-to-br from-terminal-green to-terminal-green rounded-full flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 bg-dark-bg ${isBlinking ? 'scale-y-[0.1] translate-y-[45%]' : 'scale-y-0'} transition-transform duration-200 origin-center`}></div>
          <Eye 
            className="text-white" 
           size={size === 'lg' ? 28 : size === 'md' ? 20 : 16} 
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg/80 ${isSearching ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
        </div>
        {isSearching && (
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-terminal-green rounded-full animate-ping"></div>
        )}
      </div>
      {withText && (
        <div className={`font-bold ${textSizes[size]}`}>
          <span className="gradient-text">AI-ILLUMINATI</span>
        </div>
      )}
    </div>
  );
};
export default Logo;
