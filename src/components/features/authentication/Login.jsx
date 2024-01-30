import LoginForm from './LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableLogInScreen from './ReusableLogInScreen';

function Login() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  useEffect(
    function () {
      if (user) navigate('/home');
    },
    [user, navigate]
  );

  return (
    <ReusableLogInScreen
      message="Please log in to continue"
      element={<LoginForm />}
    />
  );
}

export default Login;
