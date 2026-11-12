import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('1952adminUser') || 'null');

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoutes;
