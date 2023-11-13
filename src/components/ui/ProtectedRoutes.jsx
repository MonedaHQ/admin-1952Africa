import { useNavigate } from 'react-router-dom';
import { usersData } from '../../data/programsData';
import { useEffect } from 'react';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const currentUser =
    usersData?.find((user) => user?.authenticated === true) || null;

  useEffect(() => {
    if (!currentUser && !currentUser?.authenticated) {
      return navigate('/');
    }
  }, [currentUser, navigate]);

  if (currentUser?.authenticated) return children;
}

export default ProtectedRoutes;
