import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/storage';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      storage.setToken(token);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login?error=' + (error || 'OAuth2 login failed'), { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Authenticating...</h2>
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandler;
