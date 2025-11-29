import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to home if this page is accessed accidentally
  React.useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500">Authentication is disabled. Redirecting...</p>
    </div>
  );
};