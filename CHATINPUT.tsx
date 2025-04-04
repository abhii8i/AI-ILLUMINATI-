import React, { useState, useEffect } from 'react';
import { Send, Eye } from 'lucide-react';
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setIsEyeOpen(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
    setIsEyeOpen(false);
  }, [isLoading]);
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 pt-4">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the all-seeing eye..."
          className="cyberpunk-input w-full py-3 px-4 pr-12"
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-terminal-green/20 rounded-md p-2 text-terminal-green">
            <Eye 
              size={18} 
              className={`${isEyeOpen ? 'opacity-100' : 'opacity-50'}`} 
            />
          </div>
        ) : (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-terminal-green/20 rounded-md p-2 text-terminal-green hover:bg-terminal-green/30 disabled:opacity-50 transition-colors"
            disabled={!message.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </form>
  );
};
export default ChatInput;

