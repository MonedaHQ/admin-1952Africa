import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function ProtectedRoutes({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let user = null;

  user =
    JSON.parse(localStorage.getItem('1952adminUser')) ||
    queryClient.getQueriesData('user').length;

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, [user, navigate]);

  if (user) return children;
}

export default ProtectedRoutes;
