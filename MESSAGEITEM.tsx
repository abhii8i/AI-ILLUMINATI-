import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { User, Eye } from 'lucide-react';interface MessageItemProps {
  message: Message;
}
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-terminal-green/20 flex items-center justify-center flex-shrink-0 border border-terminal-green/30">
          <Eye size={18} className="text-terminal-green" />
        </div>
      )}
      
      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                 
);
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-dark-surface border border-gray-700 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-gray-300" />
        </div>
      )}
    </div>
  );
};
export default MessageItem;
