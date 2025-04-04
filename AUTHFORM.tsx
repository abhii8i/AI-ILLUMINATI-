import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
interface AuthFormProps {
  type: 'login' | 'signup';
}
const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        navigate('/chat');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        navigate('/chat');
      }
} catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
} finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 cyberpunk-card p-8">
        <div className="flex flex-col items-center">
          <Logo size="lg" animate={true} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-terminal-green">
            {type === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyberpunk-input appearance-none rounded-t-md relative block w-full px-3 py-3 placeholder-gray-500 focus:z-10"
                placeholder="Email address"
              />
</div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyberpunk-input appearance-none rounded-b-md relative block w-full px-3 py-3 placeholder-gray-500 focus:z-10"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="cyberpunk-button w-full py-3 px-4 flex justify-center items-center"
            >
 {loading ? 'Processing...' : type === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </div>
          
          <div className="text-center">
            {type === 'login' ? (
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-terminal-green hover:text-white">
                  Sign up
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-400">
Already have an account?{' '}
                <a href="/login" className="font-medium text-terminal-green hover:text-white">
                  Sign in
                </a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
